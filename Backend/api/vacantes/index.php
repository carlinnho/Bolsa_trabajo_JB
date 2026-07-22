<?php
// ============================================================
// api/vacantes/index.php — Endpoints públicos de vacantes
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$db = getDB();

// ─── LISTAR VACANTES ACTIVAS ──────────────────────────────
if ($method === 'GET' && $action === 'listar') {
    $where = "o.estado = 'activa' AND o.fecha_expiracion > NOW() AND (o.fecha_publicacion IS NULL OR o.fecha_publicacion <= NOW())";
    $params = [];

    if (!empty($_GET['cargo'])) {
        $cargo = $_GET['cargo'];
        $stem = raizEspanol($cargo);
        $terms = $stem !== $cargo ? [$cargo, $stem] : [$cargo];
        $clausulas = [];
        foreach ($terms as $term) {
            $clausulas[] = "(o.titulo LIKE ? OR c.nombre LIKE ? OR e.nombre LIKE ?)";
            $params[] = '%' . $term . '%';
            $params[] = '%' . $term . '%';
            $params[] = '%' . $term . '%';
        }
        $where .= ' AND (' . implode(' OR ', $clausulas) . ')';
    }
    if (!empty($_GET['ubicacion'])) {
        $where .= " AND o.ubicacion LIKE ?";
        $params[] = '%' . $_GET['ubicacion'] . '%';
    }
    if (!empty($_GET['modalidad'])) {
        $where .= " AND o.modalidad = ?";
        $params[] = $_GET['modalidad'];
    }
    if (!empty($_GET['tipo_contrato'])) {
        $where .= " AND o.tipo_contrato = ?";
        $params[] = $_GET['tipo_contrato'];
    }
    if (!empty($_GET['fecha_rango'])) {
        $dias = match ($_GET['fecha_rango']) {
            '24h' => 1,
            '3d' => 3,
            '7d' => 7,
            default => 0
        };
        if ($dias > 0) {
            $where .= " AND o.fecha_creacion >= DATE_SUB(NOW(), INTERVAL $dias DAY)";
        }
    }

    $stmt = $db->prepare("
        SELECT o.id, o.titulo, o.ubicacion, o.salario_min, o.salario_max,
               o.modalidad, o.tipo_contrato, o.fecha_creacion,
               e.nombre as empresa_nombre, e.logo_url,
               c.nombre as categoria_nombre
        FROM ofertas_trabajo o
        LEFT JOIN empresas_clientes e ON o.empresa_id = e.id
        LEFT JOIN categorias c ON o.categoria_id = c.id
        WHERE $where
        ORDER BY o.fecha_creacion DESC
    ");
    $stmt->execute($params);
    respond(true, $stmt->fetchAll());
}

// ─── SUGERENCIAS (AUTOCOMPLETE) ───────────────────────────
if ($method === 'GET' && $action === 'sugerencias') {
    $q = $_GET['q'] ?? '';
    if (strlen($q) < 1) respond(true, []);

    $term = '%' . $q . '%';
    $stmt = $db->prepare("
        (SELECT DISTINCT o.titulo COLLATE utf8mb4_unicode_ci AS texto, 'cargo' AS tipo
         FROM ofertas_trabajo o
         WHERE o.estado = 'activa' AND o.titulo LIKE ? LIMIT 4)
        UNION
        (SELECT DISTINCT c.nombre COLLATE utf8mb4_unicode_ci, 'categoria'
         FROM categorias c
         WHERE c.nombre LIKE ? LIMIT 3)
        UNION
        (SELECT DISTINCT e.nombre COLLATE utf8mb4_unicode_ci, 'empresa'
         FROM empresas_clientes e
         WHERE e.nombre LIKE ? LIMIT 3)
        LIMIT 8
    ");
    $stmt->execute([$term, $term, $term]);
    respond(true, $stmt->fetchAll());
}

// ─── LISTAR CATEGORÍAS ────────────────────────────────────
if ($method === 'GET' && $action === 'categorias') {
    $stmt = $db->query("SELECT id, nombre, slug FROM categorias ORDER BY nombre ASC");
    respond(true, $stmt->fetchAll());
}

// ─── DETALLE DE VACANTE ───────────────────────────────────
if ($method === 'GET' && $action === 'detalle') {
    $id = $_GET['id'] ?? null;
    if (!$id) respondError('ID de vacante requerido.');

    $stmt = $db->prepare("
        SELECT o.*, e.nombre as empresa_nombre, e.logo_url, e.sector,
               e.descripcion as empresa_descripcion,
               c.nombre as categoria_nombre
        FROM ofertas_trabajo o
        LEFT JOIN empresas_clientes e ON o.empresa_id = e.id
        LEFT JOIN categorias c ON o.categoria_id = c.id
        WHERE o.id = ? AND o.estado = 'activa'
    ");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) respondError('Vacante no encontrada.', 404);

    $stmtP = $db->prepare("SELECT * FROM preguntas_oferta WHERE oferta_id = ? ORDER BY orden ASC");
    $stmtP->execute([$id]);
    $preguntas = $stmtP->fetchAll();
    foreach ($preguntas as &$p) {
        if (isset($p['opciones']) && is_string($p['opciones'])) {
            $p['opciones'] = json_decode($p['opciones'], true);
        }
    }
    unset($p);
    $row['preguntas_filtro'] = $preguntas;

    respond(true, $row);
}

// ─── MIS POSTULACIONES ────────────────────────────────────
if ($method === 'GET' && $action === 'mis_postulaciones') {
    $user = requireAuth();
    $stmt = $db->prepare("SELECT oferta_id FROM postulaciones_candidatos WHERE usuario_id = ?");
    $stmt->execute([$user['id']]);
    respond(true, $stmt->fetchAll(PDO::FETCH_COLUMN));
}

// ─── POSTULARSE ───────────────────────────────────────────
if ($method === 'POST' && $action === 'postular') {
    $user = requireAuth();

    $vacante_id = $_POST['vacante_id'] ?? null;
    $respuestas = isset($_POST['respuestas']) ? json_decode($_POST['respuestas'], true) : [];

    if (!$vacante_id) respondError('ID de vacante requerido.');

    $stmt = $db->prepare("SELECT id FROM ofertas_trabajo WHERE id = ? AND estado = 'activa' AND fecha_expiracion > NOW()");
    $stmt->execute([$vacante_id]);
    if (!$stmt->fetch()) respondError('Vacante no encontrada, no disponible o ya expiró.', 404);

    $stmt = $db->prepare("SELECT id FROM postulaciones_candidatos WHERE usuario_id = ? AND oferta_id = ?");
    $stmt->execute([$user['id'], $vacante_id]);
    if ($stmt->fetch()) respondError('Ya te has postulado a esta vacante.');

    $cv_url = null;
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION);
        $filename = 'cv_' . $user['id'] . '_' . time() . '.' . $ext;
        $destino = __DIR__ . '/../../uploads/cvs/' . $filename;
        move_uploaded_file($_FILES['cv']['tmp_name'], $destino);
        $cv_url = 'uploads/cvs/' . $filename;
    }

    $stmt = $db->prepare("
        INSERT INTO postulaciones_candidatos (usuario_id, oferta_id, cv_enviado_url, estado)
        VALUES (?, ?, ?, 'recibido')
    ");
    $stmt->execute([$user['id'], $vacante_id, $cv_url]);
    $postulacion_id = $db->lastInsertId();

    if (!empty($respuestas)) {
        $stmtR = $db->prepare("
            INSERT INTO respuestas_postulacion (postulacion_id, pregunta_id, respuesta_texto) VALUES (?, ?, ?)
        ");
        foreach ($respuestas as $pregunta_id => $valor) {
            $stmtR->execute([$postulacion_id, $pregunta_id, $valor]);
        }
    }

    respond(true, ['id' => $postulacion_id], 'Te has postulado exitosamente.');
}

respondError('Acción no válida.', 404);
