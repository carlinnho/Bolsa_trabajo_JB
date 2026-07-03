<?php
// ============================================================
// api/admin/index.php — Gestión exclusiva para Administradores
// ============================================================

require_once __DIR__ . '/../../helpers/functions.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
setSecurityHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$resource = $_GET['resource'] ?? ''; // Ej: categorias, empresas, ofertas
$action = $_GET['action'] ?? '';     // Ej: listar, crear, editar
$db = getDB();

// ─── PROTECCIÓN DE RUTA (SOLO ADMIN) ─────────────────────────
// requireAdmin() debe verificar el token JWT y asegurarse de que el rol_id sea 1.
$admin = requireAdmin(); 

// ============================================================
// MÓDULO: CATEGORÍAS
// ============================================================
if ($resource === 'categorias') {
    
    // LISTAR CATEGORÍAS
    if ($method === 'GET' && $action === 'listar') {
        $stmt = $db->query("SELECT * FROM categorias ORDER BY nombre ASC");
        respond(true, $stmt->fetchAll());
    }

    // CREAR CATEGORÍA
    if ($method === 'POST' && $action === 'crear') {
        $body = getBody();
        $nombre = sanitizarTexto($body['nombre'] ?? '');
        
        if (!$nombre) respondError('El nombre de la categoría es requerido.');

        // Crear un slug básico a partir del nombre (ej: "Desarrollo Web" -> "desarrollo-web")
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $nombre)));

        try {
            $stmt = $db->prepare("INSERT INTO categorias (nombre, slug) VALUES (?, ?)");
            $stmt->execute([$nombre, $slug]);
            respond(true, ['id' => $db->lastInsertId(), 'nombre' => $nombre, 'slug' => $slug], 'Categoría creada con éxito.');
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                respondError('Ya existe una categoría con ese nombre.');
            }
            respondError('Error de base de datos al crear categoría.');
        }
    }
}

// ============================================================
// MÓDULO: EMPRESAS CLIENTES
// ============================================================
if ($resource === 'empresas') {

    // LISTAR EMPRESAS
    if ($method === 'GET' && $action === 'listar') {
        $stmt = $db->query("SELECT id, nombre, ruc, sector, logo_url, descripcion, estado, fecha_registro FROM empresas_clientes ORDER BY fecha_registro DESC");
        respond(true, $stmt->fetchAll());
    }

    // CREAR EMPRESA
    if ($method === 'POST' && $action === 'crear') {
        // Usamos $_POST en lugar de getBody() por si a futuro subes el logo_url directamente como archivo
        $nombre = sanitizarTexto($_POST['nombre'] ?? '');
        $ruc = sanitizarTexto($_POST['ruc'] ?? '');
        $sector = sanitizarTexto($_POST['sector'] ?? '');
        $descripcion = sanitizarTexto($_POST['descripcion'] ?? '');
        $logo_url = sanitizarTexto($_POST['logo_url'] ?? ''); // Puede ser URL externa o ruta local

        if (!$nombre || !$ruc || !$sector) {
            respondError('Los campos nombre, ruc y sector son obligatorios.');
        }

        try {
            $stmt = $db->prepare("
                INSERT INTO empresas_clientes (nombre, ruc, sector, logo_url, descripcion, estado) 
                VALUES (?, ?, ?, ?, ?, 'activo')
            ");
            $stmt->execute([$nombre, $ruc, $sector, $logo_url, $descripcion]);
            respond(true, ['id' => $db->lastInsertId()], 'Empresa cliente registrada correctamente.');
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                respondError('Ya existe una empresa registrada con ese RUC o Nombre.');
            }
            respondError('Error de base de datos al registrar empresa.');
        }
    }
}

// ============================================================
// MÓDULO: OFERTAS DE TRABAJO (Próximo paso)
// ============================================================
if ($resource === 'ofertas') {
    if ($method === 'GET' && $action === 'listar') {
        // Aquí armaremos el JOIN complejo con empresas y categorías más adelante
        respond(true, [], 'Módulo de ofertas en construcción.');
    }
}

// ============================================================
// MÓDULO: OFERTAS DE TRABAJO
// ============================================================
if ($resource === 'ofertas') {

    // LISTAR OFERTAS
    if ($method === 'GET' && $action === 'listar') {
        // Hacemos JOIN para traer el nombre de la empresa y la categoría
        $stmt = $db->query("
            SELECT o.*, e.nombre as empresa_nombre, c.nombre as categoria_nombre 
            FROM ofertas_trabajo o 
            LEFT JOIN empresas_clientes e ON o.empresa_id = e.id 
            LEFT JOIN categorias c ON o.categoria_id = c.id 
            ORDER BY o.fecha_creacion DESC
        ");
        respond(true, $stmt->fetchAll());
    }

    // CREAR OFERTA
    if ($method === 'POST' && $action === 'crear') {
        $body = getBody();

        // 1. Campos obligatorios principales
        $empresa_id = $body['empresa_id'] ?? null;
        $titulo = sanitizarTexto($body['titulo'] ?? '');
        $descripcion = sanitizarTexto($body['descripcion'] ?? '');

        if (!$empresa_id || !$titulo || !$descripcion) {
            respondError('La empresa (empresa_id), el título y la descripción son obligatorios.');
        }

        // 2. Generar slug único (título + timestamp corto para asegurar que no se repita)
        $slugBase = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $titulo)));
        $slug = $slugBase . '-' . substr(time(), -5);

        // 3. Campos opcionales y Enums con valores por defecto seguros
        $requisitos = isset($body['requisitos']) ? sanitizarTexto($body['requisitos']) : null;
        $salario_min = isset($body['salario_min']) && is_numeric($body['salario_min']) ? $body['salario_min'] : null;
        $salario_max = isset($body['salario_max']) && is_numeric($body['salario_max']) ? $body['salario_max'] : null;
        $ubicacion = isset($body['ubicacion']) ? sanitizarTexto($body['ubicacion']) : null;
        $categoria_id = $body['categoria_id'] ?? null;
        
        // Validaciones estrictas para los ENUM según la BD
        $modalidad = isset($body['modalidad']) && in_array($body['modalidad'], ['presencial', 'remoto', 'híbrido']) ? $body['modalidad'] : 'presencial';
        $tipo_contrato = isset($body['tipo_contrato']) && in_array($body['tipo_contrato'], ['indefinido', 'temporal', 'freelance', 'prácticas', 'por_horas']) ? $body['tipo_contrato'] : 'indefinido';
        $nivel_experiencia = isset($body['nivel_experiencia']) && in_array($body['nivel_experiencia'], ['junior', 'semisenior', 'senior', 'gerente']) ? $body['nivel_experiencia'] : null;
        $estado = isset($body['estado']) && in_array($body['estado'], ['activa', 'pausada', 'eliminada']) ? $body['estado'] : 'activa';

        try {
            // Nota: vistas_count, fecha_creacion y fecha_expiracion se calculan solos por defecto en la BD
            $stmt = $db->prepare("
                INSERT INTO ofertas_trabajo (
                    empresa_id, titulo, slug, descripcion, requisitos, 
                    salario_min, salario_max, ubicacion, modalidad, 
                    tipo_contrato, nivel_experiencia, categoria_id, estado
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $empresa_id, $titulo, $slug, $descripcion, $requisitos,
                $salario_min, $salario_max, $ubicacion, $modalidad,
                $tipo_contrato, $nivel_experiencia, $categoria_id, $estado
            ]);
            
            respond(true, [
                'id' => $db->lastInsertId(), 
                'slug' => $slug
            ], 'Oferta de trabajo creada exitosamente.');

        } catch (PDOException $e) {
            // Controlar errores de llaves foráneas (si mandan un ID de empresa o categoría que no existe)
            if (strpos($e->getMessage(), 'a foreign key constraint fails') !== false) {
                respondError('Error: El ID de la empresa o la categoría no existe en la base de datos.');
            }
            respondError('Error interno en la base de datos al crear la oferta.');
        }
    }
}

respondError('Recurso o acción no válida para el panel de administración.', 404);