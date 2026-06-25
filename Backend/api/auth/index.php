<?php
// ============================================================
// api/auth/index.php — Registro y Autenticación
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = getDB();

if ($method === 'POST' && $action === 'register') {
    $body = getBody();

    $nombre_completo = sanitizarTexto($body['nombre_completo'] ?? '');
    $correo = strtolower(trim($body['correo'] ?? ''));
    $password = trim($body['password'] ?? '');
    $telefono = sanitizarTexto($body['telefono'] ?? '');

    if (!$nombre_completo || !$correo || !$password || !$telefono)
        respondError('Todos los campos son obligatorios.');
    if (!validarEmail($correo))
        respondError('Formato de correo inválido.');
    if (!validarPassword($password))
        respondError('La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo.');

    $stmt = $db->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    if ($stmt->fetch())
        respondError('Este correo ya está registrado.');

    // Asignar rol 'usuario' por defecto
    $stmtRol = $db->prepare("SELECT id FROM roles_sistema WHERE nombre = 'usuario'");
    $stmtRol->execute();
    $rol = $stmtRol->fetch();

    $id = generateUUID();
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    $fecha_registro = date('Y-m-d H:i:s');

    $stmt = $db->prepare("
        INSERT INTO usuarios (id, rol_id, nombre_completo, correo, password_hash, telefono, estado, correo_verificado, fecha_registro)
        VALUES (?, ?, ?, ?, ?, ?, 'activo', 0, ?)
    ");
    $stmt->execute([$id, $rol['id'], $nombre_completo, $correo, $hash, $telefono, $fecha_registro]);
    require_once __DIR__ . '/../../templates/welcome_email.php';
    require_once __DIR__ . '/../../helpers/mailer.php';

    // 1. Generamos un token especial que contiene el ID del usuario
    $tokenVerificacion = jwtEncode(['verify_id' => $id]);
    
    // 2. Creamos la URL apuntando temporalmente directo al backend
    // Nota: Ajusta 'backend-bolsajb' si el nombre de tu carpeta en htdocs es distinto
    $urlVerificacion = "http://localhost/backend-bolsajb/api/auth/?action=verify_email&token=" . $tokenVerificacion;

    $asunto = "¡Valida tu cuenta en Bolsa de Trabajo JB!";
    $cuerpoHTML = getWelcomeEmailTemplate($nombre_completo, $urlVerificacion);
    
    $estadoCorreo = enviarCorreo($correo, $asunto, $cuerpoHTML);
    // -----------------------------------------------------------

    respond(true, [
        'id' => $id, 
        'correo' => $correo,
        'debug_correo' => $estadoCorreo === true ? 'Enviado correctamente' : $estadoCorreo
    ], 'Cuenta creada exitosamente.', 201);
}

if ($method === 'POST' && $action === 'login') {
    $body = getBody();
    $correo = strtolower(trim($body['correo'] ?? ''));
    $password = trim($body['password'] ?? '');

    if (!$correo || !$password)
        respondError('Correo y contraseña requeridos.');

    $stmt = $db->prepare("
        SELECT u.id, u.nombre_completo, u.correo, u.telefono, u.estado, u.password_hash, r.nombre as rol_nombre 
        FROM usuarios u
        INNER JOIN roles_sistema r ON u.rol_id = r.id
        WHERE u.correo = ?
    ");
    $stmt->execute([$correo]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash']))
        respondError('Credenciales incorrectas.', 401);
    if ($user['estado'] === 'inactivo')
        respondError('Esta cuenta ha sido desactivada.', 403);

    $token = jwtEncode([
        'id' => $user['id'],
        'role' => $user['rol_nombre']
    ]);

    unset($user['password_hash']); // No devolver el hash al frontend

    respond(true, ['user' => $user, 'token' => $token], 'Inicio de sesión exitoso.');
}

// ─── VALIDACIÓN DE CORREO (GET) ───────────────────────────────
if ($method === 'GET' && $action === 'verify_email') {
    $token = $_GET['token'] ?? '';
    if (!$token) respondError('Token no proporcionado.');

    // Decodificar el token para sacar el ID del usuario
    $payload = jwtDecode($token);
    if (!$payload || !isset($payload['verify_id'])) {
        // En lugar de JSON, mandamos HTML para que el navegador lo muestre bien
        echo "<h2 style='color: red; text-align: center; margin-top: 50px; font-family: Arial;'>Enlace de validación inválido o expirado.</h2>";
        exit;
    }

    $userId = $payload['verify_id'];

    // Actualizar el estado en la base de datos
    $stmt = $db->prepare("UPDATE usuarios SET correo_verificado = 1 WHERE id = ?");
    $stmt->execute([$userId]);

    // Mostrar mensaje de éxito en el navegador
    echo "<div style='text-align: center; margin-top: 50px; font-family: Arial;'>
            <h2 style='color: #003366;'>¡Cuenta validada con éxito!</h2>
            <p style='color: #333;'>Tu correo ha sido verificado. Ya puedes volver a la aplicación e iniciar sesión.</p>
          </div>";
    exit;
}

respondError('Acción no válida.', 404);