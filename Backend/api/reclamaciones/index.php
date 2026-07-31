<?php
require_once __DIR__ . '/../../helpers/functions.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = getDB();

// ─── CREAR RECLAMACIÓN (público, no requiere auth) ────────
if ($method === 'POST' && $action === 'crear') {
    $body = json_decode(file_get_contents('php://input'), true);

    $campos_requeridos = [
        'nombre', 'primer_apellido', 'segundo_apellido',
        'tipo_documento', 'numero_documento', 'celular', 'correo',
        'departamento', 'provincia', 'distrito', 'direccion',
        'tipo_reclamo', 'tipo_consumo',
        'descripcion_producto', 'detalle_reclamacion', 'pedido_cliente'
    ];

    foreach ($campos_requeridos as $campo) {
        if (empty($body[$campo])) {
            respondError("El campo '$campo' es obligatorio.");
        }
    }

    $stmt = $db->prepare("
        INSERT INTO reclamaciones (
            nombre, primer_apellido, segundo_apellido,
            tipo_documento, numero_documento, celular, correo,
            departamento, provincia, distrito, direccion, referencia,
            es_menor_edad, tipo_reclamo, tipo_consumo, numero_pedido,
            fecha_reclamacion, proveedor, monto_reclamado,
            fecha_compra, fecha_consumo, fecha_caducidad,
            descripcion_producto, detalle_reclamacion, pedido_cliente
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    ");

    $stmt->execute([
        sanitizarTexto($body['nombre']),
        sanitizarTexto($body['primer_apellido']),
        sanitizarTexto($body['segundo_apellido']),
        $body['tipo_documento'],
        sanitizarTexto($body['numero_documento']),
        sanitizarTexto($body['celular']),
        sanitizarTexto($body['correo']),
        sanitizarTexto($body['departamento']),
        sanitizarTexto($body['provincia']),
        sanitizarTexto($body['distrito']),
        sanitizarTexto($body['direccion']),
        sanitizarTexto($body['referencia'] ?? ''),
        isset($body['es_menor_edad']) && $body['es_menor_edad'] ? 1 : 0,
        $body['tipo_reclamo'],
        sanitizarTexto($body['tipo_consumo']),
        sanitizarTexto($body['numero_pedido'] ?? ''),
        !empty($body['fecha_reclamacion']) ? $body['fecha_reclamacion'] : null,
        sanitizarTexto($body['proveedor'] ?? ''),
        !empty($body['monto_reclamado']) ? (float)$body['monto_reclamado'] : null,
        !empty($body['fecha_compra'])    ? $body['fecha_compra']    : null,
        !empty($body['fecha_consumo'])   ? $body['fecha_consumo']   : null,
        !empty($body['fecha_caducidad']) ? $body['fecha_caducidad'] : null,
        sanitizarTexto($body['descripcion_producto']),
        sanitizarTexto($body['detalle_reclamacion']),
        sanitizarTexto($body['pedido_cliente']),
    ]);

    $id = $db->lastInsertId();
    respond(true, ['id' => $id, 'numero' => str_pad($id, 6, '0', STR_PAD_LEFT)],
        'Reclamo enviado correctamente. Tu número de reclamo es: ' . str_pad($id, 6, '0', STR_PAD_LEFT));
}

// ─── ADMIN: LISTAR ───────────────────────────────────────
if ($method === 'GET' && $action === 'admin_listar') {
    $user = requireAuth();
    if (($user['rol_nombre'] ?? '') !== 'admin') respondError('Sin permisos.', 403);

    $stmt = $db->query("
        SELECT id, nombre, primer_apellido, segundo_apellido,
               correo, celular, tipo_reclamo, estado,
               fecha_creacion
        FROM reclamaciones
        ORDER BY fecha_creacion DESC
    ");
    respond(true, $stmt->fetchAll());
}

// ─── ADMIN: VER DETALLE ──────────────────────────────────
if ($method === 'GET' && $action === 'admin_detalle') {
    $user = requireAuth();
    if (($user['rol_nombre'] ?? '') !== 'admin') respondError('Sin permisos.', 403);

    $id = $_GET['id'] ?? null;
    if (!$id) respondError('ID requerido.');

    $stmt = $db->prepare("SELECT * FROM reclamaciones WHERE id = ?");
    $stmt->execute([$id]);
    $reclamo = $stmt->fetch();
    if (!$reclamo) respondError('Reclamo no encontrado.', 404);

    respond(true, $reclamo);
}

// ─── ADMIN: ACTUALIZAR ESTADO Y RESPUESTA ────────────────
if ($method === 'POST' && $action === 'admin_actualizar') {
    $user = requireAuth();
    if (($user['rol_nombre'] ?? '') !== 'admin') respondError('Sin permisos.', 403);

    $body            = json_decode(file_get_contents('php://input'), true);
    $id              = $body['id']              ?? null;
    $estado          = $body['estado']          ?? null;
    $respuesta_admin = $body['respuesta_admin'] ?? null;

    if (!$id) respondError('ID requerido.');
    if (!in_array($estado, ['pendiente', 'en_proceso', 'resuelto', 'cerrado'])) {
        respondError('Estado inválido.');
    }

    // Obtener datos del reclamo para el correo
    $stmtGet = $db->prepare("
        SELECT id, nombre, primer_apellido, correo, tipo_reclamo
        FROM reclamaciones WHERE id = ?
    ");
    $stmtGet->execute([$id]);
    $reclamo = $stmtGet->fetch();
    if (!$reclamo) respondError('Reclamo no encontrado.', 404);

    // Actualizar en BD
    $stmt = $db->prepare("
        UPDATE reclamaciones
        SET estado = ?, respuesta_admin = ?
        WHERE id = ?
    ");
    $stmt->execute([$estado, $respuesta_admin, $id]);

    // Enviar correo solo si hay respuesta
    if (!empty(trim($respuesta_admin ?? ''))) {
        require_once __DIR__ . '/../../templates/reclamo_respuesta_email.php';
        require_once __DIR__ . '/../../helpers/mailer.php';

        $numero   = str_pad($reclamo['id'], 6, '0', STR_PAD_LEFT);
        $nombre   = $reclamo['nombre'] . ' ' . $reclamo['primer_apellido'];
        $asunto   = "Respuesta a tu reclamo #{$numero} - Consultora JB";
        $cuerpo   = getReclamoRespuestaEmailTemplate(
            $nombre,
            $numero,
            $estado,
            $reclamo['tipo_reclamo'],
            $respuesta_admin
        );

        enviarCorreo($reclamo['correo'], $asunto, $cuerpo);
    }

    respond(true, null, 'Reclamo actualizado correctamente.');
}

respondError('Acción no válida.', 404);