<?php
// ============================================================
// api/users/index.php — Perfil y Seguridad del Usuario
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';
require_once __DIR__ . '/../../middleware/auth.php'; // ACTIVADO
require_once __DIR__ . '/../../helpers/mailer.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = getDB();

// 1. LISTAR USUARIOS (Solo Admin - Opcional para paneles)
if ($method === 'GET' && $action === 'listar') {
    requireAdmin(); // Protegemos esta ruta
    
    $stmt = $db->prepare("
        SELECT u.id, u.nombre_completo, u.correo, u.telefono, u.estado, r.nombre as rol_nombre
        FROM usuarios u INNER JOIN roles_sistema r ON u.rol_id = r.id
        ORDER BY u.fecha_registro DESC
    ");
    $stmt->execute();
    respond(true, $stmt->fetchAll());
}

// ─── DESDE AQUÍ, TODAS LAS RUTAS REQUIEREN QUE EL USUARIO ESTÉ LOGUEADO ───
$user = requireAuth();
$userId = $user['id'];

// 2. ACTUALIZAR PERFIL Y SUBIR CV
if ($method === 'POST' && $action === 'update_profile') {
    $nombre = $_POST['nombre_completo'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $presentacion = $_POST['texto_presentacion'] ?? null;
    
    $fields = [];
    $params = [];

    if ($nombre) {
        $fields[] = 'nombre_completo = ?';
        $params[] = sanitizarTexto($nombre);
    }
    if ($telefono) {
        $fields[] = 'telefono = ?';
        $params[] = sanitizarTexto($telefono);
    }
    if ($presentacion !== null) {
        $fields[] = 'texto_presentacion = ?';
        $params[] = sanitizarTexto($presentacion);
    }

    // Procesar la subida del CV
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['cv']['tmp_name'];
        $fileName = $_FILES['cv']['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        if ($fileExtension !== 'pdf') respondError('El CV debe ser un archivo PDF.');

        // Crear carpeta si no existe
        $uploadDir = __DIR__ . '/../../uploads/cvs/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

        // Nombre único para el archivo
        $newFileName = $userId . '_' . time() . '.pdf';
        $destPath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $fields[] = 'cv_url = ?';
            $params[] = 'uploads/cvs/' . $newFileName;
        } else {
            respondError('Error interno al guardar el CV.');
        }
    }

    if (empty($fields)) respondError('No hay datos para actualizar.');

    $params[] = $userId;
    $stmt = $db->prepare("UPDATE usuarios SET " . implode(', ', $fields) . " WHERE id = ?");
    $stmt->execute($params);

    respond(true, null, 'Perfil actualizado correctamente.');
}

// 3. SOLICITAR CÓDIGO PARA CAMBIO DE CONTRASEÑA
if ($method === 'POST' && $action === 'request_password_change') {
    // Validar restricción de 3 días
    $stmt = $db->prepare("SELECT ultimo_cambio_password FROM usuarios WHERE id = ?");
    $stmt->execute([$userId]);
    $data = $stmt->fetch();

    if ($data['ultimo_cambio_password']) {
        $fechaUltimoCambio = new DateTime($data['ultimo_cambio_password']);
        $ahora = new DateTime();
        $diferencia = $ahora->diff($fechaUltimoCambio)->days;

        if ($diferencia < 3) {
            respondError("Por seguridad, solo puedes cambiar tu contraseña una vez cada 3 días. (Faltan " . (3 - $diferencia) . " días).");
        }
    }

    // Generar código de 6 dígitos
    $codigo = sprintf("%06d", mt_rand(1, 999999));
    $expiracion = date('Y-m-d H:i:s', strtotime('+15 minutes'));

    $stmt = $db->prepare("UPDATE usuarios SET codigo_recuperacion = ?, expiracion_codigo = ? WHERE id = ?");
    $stmt->execute([$codigo, $expiracion, $userId]);

    // Enviar correo
    $asunto = "Código de seguridad - Cambio de contraseña";
    $cuerpoHTML = "
        <div style='font-family: Arial; text-align: center; padding: 20px;'>
            <h2>Solicitud de cambio de contraseña</h2>
            <p>Has solicitado cambiar tu contraseña. Usa el siguiente código para autorizar el cambio (válido por 15 minutos):</p>
            <h1 style='background: #f4f4f4; padding: 15px; letter-spacing: 5px; color: #ff6600;'>$codigo</h1>
            <p>Si no fuiste tú, ignora este correo y tu contraseña seguirá siendo la misma.</p>
        </div>
    ";
    
    enviarCorreo($user['correo'], $asunto, $cuerpoHTML);

    respond(true, null, 'Se ha enviado un código de seguridad a tu correo.');
}

// 4. VERIFICAR CÓDIGO Y ACTUALIZAR CONTRASEÑA
if ($method === 'POST' && $action === 'verify_password_change') {
    $body = getBody();
    $codigoIngresado = $body['codigo'] ?? '';
    $nuevaPassword = $body['nueva_password'] ?? '';

    if (!$codigoIngresado || !$nuevaPassword) respondError('El código y la nueva contraseña son requeridos.');
    if (!validarPassword($nuevaPassword)) respondError('La nueva contraseña no cumple con los requisitos mínimos de seguridad.');

    // Verificar si el código coincide y no ha expirado
    $stmt = $db->prepare("SELECT codigo_recuperacion, expiracion_codigo FROM usuarios WHERE id = ?");
    $stmt->execute([$userId]);
    $data = $stmt->fetch();

    if ($data['codigo_recuperacion'] !== $codigoIngresado) respondError('El código de verificación es incorrecto.', 401);
    
    if (new DateTime() > new DateTime($data['expiracion_codigo'])) {
        // Limpiar código expirado
        $db->prepare("UPDATE usuarios SET codigo_recuperacion = NULL, expiracion_codigo = NULL WHERE id = ?")->execute([$userId]);
        respondError('El código ha expirado. Solicita uno nuevo.', 401);
    }

    // Actualizar contraseña y limpiar códigos
    $hash = password_hash($nuevaPassword, PASSWORD_BCRYPT, ['cost' => 12]);
    $ahora = date('Y-m-d H:i:s');

    $stmt = $db->prepare("
        UPDATE usuarios 
        SET password_hash = ?, 
            ultimo_cambio_password = ?, 
            codigo_recuperacion = NULL, 
            expiracion_codigo = NULL 
        WHERE id = ?
    ");
    $stmt->execute([$hash, $ahora, $userId]);

    respond(true, null, 'Tu contraseña ha sido actualizada con éxito.');
}

// 5. DARSE DE BAJA (ELIMINACIÓN LÓGICA)
if ($method === 'POST' && $action === 'delete_account') {
    $stmt = $db->prepare("UPDATE usuarios SET estado = 'inactivo' WHERE id = ?");
    $stmt->execute([$userId]);

    respond(true, null, 'Tu cuenta ha sido desactivada correctamente. Te extrañaremos.');
}

respondError('Endpoint o método no válido.', 404);