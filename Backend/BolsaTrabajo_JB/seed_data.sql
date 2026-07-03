-- ============================================================
-- seed_data.sql — 3 ofertas + preguntas
-- ============================================================
-- Ejecutar DESPUÉS de bdanaliss.sql (que ya tiene 1 categoria,
-- 1 empresa, 1 oferta, 3 usuarios, 2 roles)
-- ============================================================

-- 1. CATEGORÍAS QUE FALTAN
INSERT INTO categorias (id, nombre, slug) VALUES
(2, 'Diseño y Multimedia', 'diseno-y-multimedia'),
(3, 'Administración y Finanzas', 'administracion-y-finanzas');

-- 2. EMPRESAS QUE FALTAN
INSERT INTO empresas_clientes (id, nombre, ruc, sector, estado) VALUES
(2, 'TechCorp', '20123456789', 'Tecnología', 'activo'),
(3, 'GlobalCorp', '20123456790', 'Consultoría', 'activo'),
(4, 'AppDev', '20123456791', 'Tecnología', 'activo');

-- 3. OFERTAS DE TRABAJO
INSERT INTO ofertas_trabajo (id, empresa_id, titulo, slug, descripcion, requisitos, salario_min, salario_max, ubicacion, modalidad, tipo_contrato, nivel_experiencia, categoria_id, estado, vistas_count, fecha_creacion, fecha_expiracion) VALUES
(2, 2, 'Diseñador UI/UX Senior', 'diseniador-ui-ux-senior-2',
 'Buscamos un Diseñador UI/UX Senior para liderar el diseño de interfaces y experiencias de usuario en nuestros productos digitales.',
 '• 4+ años en diseño UI/UX\n• Figma avanzado\n• Experiencia en design systems\n• Conocimiento de accesibilidad\n• Portfolio demostrable',
 4000.00, 6000.00, 'Remoto', 'remoto', 'indefinido', 'senior', 2, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(3, 3, 'Project Manager', 'project-manager-3',
 'Project Manager para planificar, ejecutar y cerrar proyectos de transformación digital, coordinando equipos multidisciplinarios.',
 '• 5+ años como PM\n• Certificación Scrum Master\n• Conocimiento de Jira\n• Liderazgo de equipos\n• Inglés avanzado',
 5000.00, 7000.00, 'Cusco, Perú', 'híbrido', 'indefinido', 'senior', 3, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(4, 4, 'Desarrollador Mobile Flutter', 'desarrollador-mobile-flutter-4',
 'Desarrollador mobile con Flutter para crear aplicaciones multiplataforma nativas para iOS y Android.',
 '• 2+ años con Flutter/Dart\n• Conocimiento de Firebase\n• Experiencia con APIs REST\n• Publicación en App Store y Play Store\n• Git',
 3500.00, 5000.00, 'Lima, Perú', 'híbrido', 'indefinido', 'semisenior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY);

-- 4. PREGUNTAS DE FILTRO (3 por oferta)
INSERT INTO preguntas_oferta (oferta_id, pregunta, tipo, opciones, obligatoria, orden) VALUES
-- Oferta 2: Diseñador UI/UX
(2, '¿Tienes al menos 4 años de experiencia en diseño UI/UX?', 'si_no', null, 1, 1),
(2, '¿Qué herramienta de diseño dominas mejor?', 'opciones', '["Figma","Sketch","Adobe XD","Otro"]', 1, 2),
(2, '¿Disponibilidad para trabajar remoto?', 'si_no', null, 1, 3),
-- Oferta 3: Project Manager
(3, '¿Tienes al menos 5 años como Project Manager?', 'si_no', null, 1, 1),
(3, '¿Qué metodología ágil prefieres?', 'opciones', '["Scrum","Kanban","SAFe","Otra"]', 1, 2),
(3, '¿Disponibilidad para trabajar en modalidad híbrida en Cusco?', 'si_no', null, 1, 3),
-- Oferta 4: Desarrollador Mobile Flutter
(4, '¿Tienes al menos 2 años de experiencia con Flutter/Dart?', 'si_no', null, 1, 1),
(4, '¿Qué IDE prefieres para desarrollo mobile?', 'opciones', '["VS Code","Android Studio","IntelliJ"]', 1, 2),
(4, '¿Disponibilidad para trabajar en modalidad híbrida en Lima?', 'si_no', null, 1, 3);
