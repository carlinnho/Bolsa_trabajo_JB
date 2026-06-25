<?php
// Habilitar la visualización de errores para esta prueba
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Requerir el archivo de configuración
require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json; charset=utf-8');

try {
    // Intentar obtener la instancia de PDO
    $db = getDB();

    // Si llegamos a esta línea, la conexión fue exitosa
    echo json_encode([
        'success' => true,
        'message' => '¡Conexión a la base de datos exitosa!',
        'database' => DB_NAME,
        'host' => DB_HOST
    ]);

} catch (Exception $e) {
    // Si hay un error, lo capturamos y mostramos
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Fallo al conectar a la base de datos.',
        'error' => $e->getMessage()
    ]);
}