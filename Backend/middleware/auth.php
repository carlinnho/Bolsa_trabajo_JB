<?php
// ============================================================
// middleware/auth.php
// ============================================================

require_once __DIR__ . '/../helpers/functions.php';

function getAuthToken(): string
{
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['HTTP_AUTHORIZATION']);
    }
    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    }
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (!empty($headers['Authorization'])) {
            return trim($headers['Authorization']);
        }
        if (!empty($headers['authorization'])) {
            return trim($headers['authorization']);
        }
    }
    return '';
}

function requireAuth(): array
{
    $header = getAuthToken();

    if (!$header || !str_starts_with($header, 'Bearer ')) {
        respondError('Token no proporcionado.', 401);
    }

    $token = substr($header, 7);

    $payload = jwtDecode($token);

    if (!$payload || empty($payload['id'])) {
        respondError('Token inválido o expirado.', 401);
    }

    $db = getDB();
    // Consulta actualizada para la base de datos BolsaTrabajo_JB
    $stmt = $db->prepare("
        SELECT u.id, u.nombre_completo, u.correo, u.telefono, u.estado, u.correo_verificado, r.nombre as rol_nombre
        FROM usuarios u
        INNER JOIN roles_sistema r ON u.rol_id = r.id
        WHERE u.id = ? AND u.estado = 'activo'
    ");
    $stmt->execute([$payload['id']]);
    $user = $stmt->fetch();

    if (!$user) {
        respondError('Usuario no encontrado o cuenta desactivada.', 401);
    }

    return $user;
}

function requireAdmin(): array
{
    $user = requireAuth();
    if ($user['rol_nombre'] !== 'admin') {
        respondError('Acceso denegado. Se requiere rol de administrador.', 403);
    }
    return $user;
}