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

-- 5. MÁS OFERTAS DE TRABAJO (sin preguntas)
INSERT INTO ofertas_trabajo (id, empresa_id, titulo, slug, descripcion, requisitos, salario_min, salario_max, ubicacion, modalidad, tipo_contrato, nivel_experiencia, categoria_id, estado, vistas_count, fecha_creacion, fecha_expiracion) VALUES

(5, 1, 'Analista Contable Senior', 'analista-contable-senior-5',
 'Llevar la contabilidad general, conciliaciones bancarias y reportes financieros mensuales.',
 '• 3+ años en contabilidad\n• Conocimiento de CONCAR\n• Excel avanzado\n• Colegiatura deseable',
 3000.00, 4000.00, 'Arequipa, Perú', 'presencial', 'indefinido', 'semisenior', 3, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(6, 1, 'Ejecutivo de Ventas B2B', 'ejecutivo-ventas-b2b-6',
 'Venta consultiva de servicios de seguridad corporativa a empresas. Gestión de cartera y prospección.',
 '• 2+ años en ventas B2B\n• Habilidades de negociación\n• Manejo de CRM\n• Licencia de conducir deseable',
 2200.00, 3500.00, 'Lima, Perú', 'presencial', 'indefinido', 'junior', 3, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(7, 2, 'Backend Developer Node.js', 'backend-developer-nodejs-7',
 'Desarrollo de APIs REST escalables con Node.js y Express. Mantenimiento de bases de datos PostgreSQL.',
 '• 3+ años con Node.js\n• PostgreSQL y MySQL\n• Docker y Kubernetes\n• Pruebas unitarias\n• Git',
 4000.00, 5500.00, 'Remoto', 'remoto', 'indefinido', 'semisenior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(8, 2, 'Data Analyst', 'data-analyst-8',
 'Análisis de datos comerciales y operativos. Creación de dashboards en Power BI y reportes gerenciales.',
 '• 2+ años como Data Analyst\n• SQL avanzado\n• Power BI o Tableau\n• Python deseable\n• Inglés técnico',
 3500.00, 5000.00, 'Lima, Perú', 'híbrido', 'indefinido', 'semisenior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(9, 3, 'Asistente de Recursos Humanos', 'asistente-rrhh-9',
 'Soporte en procesos de selección, nómina, gestión documental y clima laboral.',
 '• Egresado en Psicología o Administración\n• 1 año en RRHH\n• Conocimiento de planilla\n• Office intermedio',
 1800.00, 2500.00, 'Cusco, Perú', 'presencial', 'indefinido', 'junior', 3, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(10, 3, 'Consultor SAP MM', 'consultor-sap-mm-10',
 'Implementación y soporte de módulo SAP MM en proyectos de transformación digital para clientes.',
 '• 4+ años en SAP MM\n• Certificación SAP deseable\n• Conocimiento de integración con FI\n• Inglés intermedio',
 6000.00, 8000.00, 'Remoto', 'remoto', 'freelance', 'senior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(11, 4, 'QA Tester Manual/Automatizado', 'qa-tester-11',
 'Diseño y ejecución de casos de prueba, reporte de bugs y automatización de pruebas funcionales.',
 '• 2+ años como QA\n• Selenium o Cypress\n• Conocimiento de JIRA\n• SQL básico\n• Metodologías ágiles',
 2800.00, 3800.00, 'Lima, Perú', 'híbrido', 'indefinido', 'semisenior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(12, 4, 'Diseñador Gráfico Senior', 'diseniador-grafico-senior-12',
 'Creación de piezas gráficas para campañas digitales, branding y materiales corporativos.',
 '• 4+ años en diseño gráfico\n• Adobe Creative Suite\n• After Effects deseable\n• Portfolio demostrable',
 3000.00, 4500.00, 'Remoto', 'remoto', 'indefinido', 'senior', 2, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(13, 2, 'DevOps Engineer', 'devops-engineer-13',
 'Automatización de infraestructura, CI/CD, monitoreo y optimización de entornos cloud (AWS/GCP).',
 '• 3+ años como DevOps\n• AWS o GCP\n• Terraform o Pulumi\n• Docker y Kubernetes\n• Linux avanzado',
 5000.00, 7000.00, 'Remoto', 'remoto', 'indefinido', 'senior', 1, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY),

(14, 1, 'Técnico en Seguridad Electrónica', 'tecnico-seguridad-electronica-14',
 'Instalación, mantenimiento y configuración de sistemas de seguridad: CCTV, alarmas y control de acceso.',
 '• 2+ años en seguridad electrónica\n• Conocimiento de CCTV y alarmas\n• Disponibilidad para viajar\n• Trabajo en equipo',
 1800.00, 2800.00, 'Lima, Perú', 'presencial', 'indefinido', 'junior', 3, 'activa', 0, NOW(), NOW() + INTERVAL 90 DAY);

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
