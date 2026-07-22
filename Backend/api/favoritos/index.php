<?php
// ============================================================
// api/favoritos/index.php — CRUD de favoritos del usuario
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = getDB();

// ─── LISTAR FAVORITOS DEL USUARIO ─────────────────────────
if ($method === 'GET' && $action === 'listar') {
    $user = requireAuth();

    $stmt = $db->prepare("
        SELECT f.id, f.oferta_id, f.fecha_guardado,
               o.id AS id, o.titulo, o.descripcion, o.salario_min, o.salario_max,
               o.ubicacion, o.modalidad, o.tipo_contrato, o.fecha_creacion,
               o.fecha_expiracion,
               e.nombre AS empresa_nombre, e.logo_url,
               c.nombre AS categoria_nombre
        FROM favoritos f
        INNER JOIN ofertas_trabajo o ON f.oferta_id = o.id
        LEFT JOIN empresas_clientes e ON o.empresa_id = e.id
        LEFT JOIN categorias c ON o.categoria_id = c.id
        WHERE f.usuario_id = ? AND o.estado = 'activa'
        ORDER BY f.fecha_guardado DESC
    ");
    $stmt->execute([$user['id']]);
    respond(true, $stmt->fetchAll());
}

// ─── TOGGLE FAVORITO (agregar/quitar) ─────────────────────
if ($method === 'POST' && $action === 'toggle') {
    $user = requireAuth();
    $body = getBody();
    $ofertaId = $body['oferta_id'] ?? null;

    if (!$ofertaId) respondError('ID de oferta requerido.');

    $stmt = $db->prepare("SELECT id FROM ofertas_trabajo WHERE id = ? AND estado = 'activa'");
    $stmt->execute([$ofertaId]);
    if (!$stmt->fetch()) respondError('Oferta no encontrada.', 404);

    $stmt = $db->prepare("SELECT id FROM favoritos WHERE usuario_id = ? AND oferta_id = ?");
    $stmt->execute([$user['id'], $ofertaId]);
    $existente = $stmt->fetch();

    if ($existente) {
        $stmt = $db->prepare("DELETE FROM favoritos WHERE id = ?");
        $stmt->execute([$existente['id']]);
        respond(true, ['accion' => 'eliminado', 'es_favorito' => false], 'Favorito eliminado.');
    } else {
        $stmt = $db->prepare("INSERT INTO favoritos (usuario_id, oferta_id) VALUES (?, ?)");
        $stmt->execute([$user['id'], $ofertaId]);
        respond(true, ['accion' => 'agregado', 'es_favorito' => true], 'Favorito agregado.');
    }
}

// ─── VERIFICAR SI UNA OFERTA ES FAVORITA ──────────────────
if ($method === 'GET' && $action === 'verificar') {
    $user = requireAuth();
    $ofertaId = $_GET['oferta_id'] ?? null;

    if (!$ofertaId) respondError('ID de oferta requerido.');

    $stmt = $db->prepare("SELECT id FROM favoritos WHERE usuario_id = ? AND oferta_id = ?");
    $stmt->execute([$user['id'], $ofertaId]);
    $esFavorito = (bool) $stmt->fetch();

    respond(true, ['es_favorito' => $esFavorito]);
}

// ─── VERIFICAR MÚLTIPLES OFERTAS ──────────────────────────
if ($method === 'POST' && $action === 'verificar_multiples') {
    $user = requireAuth();
    $body = getBody();
    $ofertaIds = $body['oferta_ids'] ?? [];

    if (empty($ofertaIds)) respond(true, []);

    $placeholders = implode(',', array_fill(0, count($ofertaIds), '?'));
    $params = array_merge([$user['id']], $ofertaIds);
    $stmt = $db->prepare("SELECT oferta_id FROM favoritos WHERE usuario_id = ? AND oferta_id IN ($placeholders)");
    $stmt->execute($params);
    $favoritos = $stmt->fetchAll(PDO::FETCH_COLUMN);

    respond(true, $favoritos);
}

respondError('Acción no válida.', 404);
