<?php
// ============================================================
// api/users/index.php — CRUD de Usuarios y Perfiles
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';
// require_once __DIR__ . '/../../middleware/auth.php'; // Descomentar cuando tengas el middleware listo

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$targetId = $_GET['id'] ?? null;
$db = getDB();

// ─── LISTAR (GET) ────────────────────────────────────────────
if ($method === 'GET') {
    $status = $_GET['status'] ?? null;
    $where = ['1=1'];
    $params = [];

    if ($status && in_array($status, ['activo', 'inactivo'], true)) {
        $where[] = 'u.estado = ?';
        $params[] = $status;
    }

    $stmt = $db->prepare("
        SELECT u.id, u.nombre_completo, u.correo, u.telefono, u.cv_url, u.texto_presentacion, u.estado, u.fecha_registro, r.nombre as rol_nombre
        FROM usuarios u
        INNER JOIN roles_sistema r ON u.rol_id = r.id
        WHERE " . implode(' AND ', $where) . "
        ORDER BY u.fecha_registro DESC
    ");
    $stmt->execute($params);
    $users = $stmt->fetchAll();

    respond(true, $users);
}

// ─── EDITAR (PUT) ────────────────────────────────────────────
if ($method === 'PUT' && $targetId) {
    $body = getBody();
    $fields = [];
    $params = [];

    if (!empty($body['nombre_completo'])) {
        $fields[] = 'nombre_completo = ?';
        $params[] = sanitizarTexto($body['nombre_completo']);
    }
    if (!empty($body['telefono'])) {
        $fields[] = 'telefono = ?';
        $params[] = sanitizarTexto($body['telefono']);
    }
    if (isset($body['texto_presentacion'])) { // Usamos isset para permitir vaciar el texto
        $fields[] = 'texto_presentacion = ?';
        $params[] = sanitizarTexto($body['texto_presentacion']);
    }
    if (!empty($body['cv_url'])) {
        $fields[] = 'cv_url = ?';
        $params[] = trim($body['cv_url']);
    }
    if (!empty($body['password'])) {
        if (!validarPassword($body['password']))
            respondError('La contraseña no cumple con los requisitos de seguridad.');
        $fields[] = 'password_hash = ?';
        $params[] = password_hash($body['password'], PASSWORD_BCRYPT, ['cost' => 12]);
    }

    if (empty($fields))
        respondError('No hay campos para actualizar.');

    $params[] = $targetId;
    $stmt = $db->prepare("UPDATE usuarios SET " . implode(', ', $fields) . " WHERE id = ?");
    $stmt->execute($params);

    respond(true, null, 'Perfil actualizado correctamente.');
}

// ─── ELIMINAR (DELETE LÓGICO) ────────────────────────────────
if ($method === 'DELETE' && $targetId) {
    $stmt = $db->prepare("SELECT id FROM usuarios WHERE id = ?");
    $stmt->execute([$targetId]);
    if (!$stmt->fetch())
        respondError('Usuario no encontrado.', 404);

    $stmt = $db->prepare("UPDATE usuarios SET estado = 'inactivo' WHERE id = ?");
    $stmt->execute([$targetId]);

    respond(true, null, 'Usuario desactivado correctamente.');
}

respondError('Método no permitido.', 405);