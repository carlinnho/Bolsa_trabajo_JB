<?php
// config/database.php

date_default_timezone_set('America/Lima');

// Credenciales de la BD
define('DB_HOST', 'localhost');
define('DB_NAME', 'bolsa_trabajo_jb');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Seguridad para JWT
define('JWT_SECRET', 'bolsajb-clave-super-secreta-2026');
define('JWT_EXPIRY', 86400); // 1 día

// URL del Frontend
define('FRONTEND_URL', 'http://localhost:5173'); 

function getDB(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['success' => false, 'message' => 'Error crítico: No se pudo conectar a la base de datos.']));
        }
    }
    return $pdo;
}