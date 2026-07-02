// ─────────────────────────────────────────────────────────────
// vacantesService.js — Servicio de vacantes (API / mock)
//
// API esperada (futura):
//   GET  /vacantes/?titulo=&ubicacion=&fecha_rango=7d
//   GET  /vacantes/?id=<uuid>
//   POST /vacantes/?action=postular  (requiere Bearer token)
//
//   PUT  /api/users/  (para actualizar cv_url)
//   POST /api/upload/cv  (para subir archivo CV)
// ─────────────────────────────────────────────────────────────

// ─── Ayuda: calcula fecha límite según rango ─────────────
function getFechaLimite(rango) {
  const hoy = new Date('2026-06-25');
  if (rango === '24h') return new Date(hoy.getTime() - 24 * 60 * 60 * 1000);
  if (rango === '3d') return new Date(hoy.getTime() - 3 * 24 * 60 * 60 * 1000);
  if (rango === '7d') return new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
  return null;
}

// ─── Datos mock ────────────────────────────────────────────
const VACANTES_MOCK = [
  {
    id: 'v1',
    titulo: 'Desarrollador Frontend React',
    empresa_id: 1,
    empresa_nombre: 'Consultora JB',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-20',
    descripcion_corta: 'Buscamos un desarrollador frontend con experiencia en React y Tailwind CSS.',
    descripcion: 'Nos encontramos en la búsqueda de un Desarrollador Frontend con sólidos conocimientos en React para unirse a nuestro equipo de tecnología. Serás responsable de construir y mantener interfaces de usuario modernas y responsivas, colaborando estrechamente con el equipo de diseño y backend.',
    requisitos: '• 3+ años de experiencia con React\n• Conocimiento de Tailwind CSS\n• Experiencia con consumo de APIs REST\n• Git y trabajo en equipo\n• Inglés técnico deseable',
    salario_min: 3500,
    salario_max: 5000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'rrhh@consultorajb.com',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 3 años de experiencia con React?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Cuál es tu nivel de inglés?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado", "Nativo"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Disponibilidad para trabajar presencial en Lima?", tipo: "si_no", obligatoria: true, orden: 3 },
      { id: 4, pregunta: "¿Cuántos años de experiencia tienes con Tailwind CSS?", tipo: "numero", obligatoria: false, orden: 4 },
      { id: 5, pregunta: "Cuéntanos por qué crees que eres el candidato ideal", tipo: "texto", obligatoria: true, orden: 5 },
    ],
  },
  {
    id: 'v2',
    titulo: 'Analista de Datos',
    empresa_id: 2,
    empresa_nombre: 'DataWorld Corp',
    ubicacion: 'Arequipa, Perú',
    fecha_publicacion: '2026-06-18',
    descripcion_corta: 'Analista de datos con experiencia en Python, SQL y visualización.',
    descripcion: 'Buscamos un Analista de Datos para extraer, procesar y analizar datos de diversas fuentes. Crearás dashboards y reportes que apoyarán la toma de decisiones estratégicas.',
    requisitos: '• 2+ años en análisis de datos\n• Python (Pandas, NumPy)\n• SQL avanzado\n• Power BI o Tableau\n• Estadística descriptiva',
    salario_min: 3000,
    salario_max: 4200,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 8:00 a 17:00',
    contacto_correo: 'talento@dataworld.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 2 años de experiencia en análisis de datos?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué herramientas de visualización usas?", tipo: "opciones", opciones: ["Power BI", "Tableau", "Looker", "Otra"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Cuál es tu nivel de SQL?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado"], obligatoria: true, orden: 3 },
      { id: 4, pregunta: "¿Disponibilidad para trabajar presencial en Arequipa?", tipo: "si_no", obligatoria: true, orden: 4 },
    ],
  },
  {
    id: 'v3',
    titulo: 'Diseñador UI/UX Senior',
    empresa_id: 1,
    empresa_nombre: 'Consultora JB',
    ubicacion: 'Remoto',
    fecha_publicacion: '2026-06-25',
    descripcion_corta: 'Diseñador con experiencia en Figma, design systems y user research.',
    descripcion: 'Estamos buscando un Diseñador UI/UX Senior para liderar el diseño de nuestras plataformas digitales. Crearás experiencias de usuario intuitivas y atractivas, definiendo patrones de diseño y colaborando con desarrolladores.',
    requisitos: '• 4+ años en diseño UI/UX\n• Figma avanzado\n• Experiencia en design systems\n• Conocimiento de accesibilidad\n• Portfolio demostrable',
    salario_min: 4000,
    salario_max: 6000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Remoto',
    horario: 'Horario flexible',
    contacto_correo: 'rrhh@consultorajb.com',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 4 años de experiencia en diseño UI/UX?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué herramienta de diseño usas principalmente?", tipo: "opciones", opciones: ["Figma", "Sketch", "Adobe XD", "Otro"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Has trabajado con design systems antes?", tipo: "si_no", obligatoria: true, orden: 3 },
      { id: 4, pregunta: "Comparte un enlace a tu portafolio", tipo: "texto", obligatoria: false, orden: 4 },
    ],
  },
  {
    id: 'v4',
    titulo: 'Backend Developer Node.js',
    empresa_id: 4,
    empresa_nombre: 'TechSolutions',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-22',
    descripcion_corta: 'Desarrollador backend con Node.js, Express y bases de datos SQL/NoSQL.',
    descripcion: 'Nos encontramos en la búsqueda de un Backend Developer para desarrollar y mantener APIs escalables. Trabajarás con Node.js, Express y bases de datos relacionales y no relacionales en un entorno ágil.',
    requisitos: '• 3+ años con Node.js\n• Express o NestJS\n• PostgreSQL y MongoDB\n• Docker\n• Pruebas unitarias y de integración',
    salario_min: 4000,
    salario_max: 5500,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Híbrida',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'jobs@techsolutions.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 3 años de experiencia con Node.js?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué base de datos SQL dominas más?", tipo: "opciones", opciones: ["PostgreSQL", "MySQL", "SQL Server", "Oracle"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes experiencia con Docker?", tipo: "si_no", obligatoria: true, orden: 3 },
      { id: 4, pregunta: "¿Disponibilidad para trabajar en modalidad híbrida en Lima?", tipo: "si_no", obligatoria: true, orden: 4 },
    ],
  },
  {
    id: 'v5',
    titulo: 'Practicante de Sistemas',
    empresa_id: 1,
    empresa_nombre: 'Consultora JB',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-10',
    descripcion_corta: 'Practicante para soporte técnico y desarrollo de herramientas internas.',
    descripcion: 'Buscamos un practicante de sistemas para brindar soporte técnico a usuarios internos y apoyar en el desarrollo de herramientas de automatización. Excelente oportunidad para ganar experiencia en un entorno empresarial.',
    requisitos: '• Estudiante de Ing. de Sistemas o afines\n• Conocimientos básicos de redes\n• Office 365\n• Ganas de aprender',
    salario_min: 1025,
    salario_max: 1200,
    tipo_contrato: 'Prácticas',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 9:00 a 14:00',
    contacto_correo: 'rrhh@consultorajb.com',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Eres estudiante de Ing. de Sistemas o carreras afines?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Cuánto tiempo puedes dedicar a la práctica?", tipo: "opciones", opciones: ["4 horas", "5 horas", "6 horas"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes conocimientos básicos de redes?", tipo: "si_no", obligatoria: false, orden: 3 },
    ],
  },
  {
    id: 'v6',
    titulo: 'Project Manager',
    empresa_id: 6,
    empresa_nombre: 'Innovatech',
    ubicacion: 'Cusco, Perú',
    fecha_publicacion: '2026-06-12',
    descripcion_corta: 'Project Manager con experiencia en metodologías ágiles y gestión de equipos.',
    descripcion: 'Buscamos un Project Manager para liderar equipos multidisciplinarios en proyectos de transformación digital. Serás responsable de la planificación, seguimiento y entrega de proyectos dentro del tiempo y presupuesto.',
    requisitos: '• 5+ años como PM\n• Certificación Scrum Master\n• Conocimiento de Jira\n• Liderazgo de equipos\n• Inglés avanzado',
    salario_min: 5000,
    salario_max: 7000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Híbrida',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'rrhh@innovatech.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 5 años de experiencia como Project Manager?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Tienes certificación Scrum Master?", tipo: "si_no", obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Cuál es tu nivel de inglés?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado", "Nativo"], obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v7',
    titulo: 'Especialista en Marketing Digital',
    empresa_id: 1,
    empresa_nombre: 'Consultora JB',
    ubicacion: 'Remoto',
    fecha_publicacion: '2026-06-08',
    descripcion_corta: 'Especialista en marketing digital para gestión de redes sociales y campañas.',
    descripcion: 'Buscamos un Especialista en Marketing Digital para gestionar y ejecutar estrategias de marketing en redes sociales, campañas publicitarias y análisis de métricas para fortalecer la presencia de marca.',
    requisitos: '• 3+ años en marketing digital\n• Meta Ads y Google Ads\n• SEO/SEM\n• Canva y Adobe Suite\n• Analítica web',
    salario_min: 2800,
    salario_max: 4000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Remoto',
    horario: 'Horario flexible',
    contacto_correo: 'marketing@consultorajb.com',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 3 años en marketing digital?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué plataforma publicitaria manejas mejor?", tipo: "opciones", opciones: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes experiencia en SEO?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v8',
    titulo: 'Soporte Técnico TI',
    empresa_id: 8,
    empresa_nombre: 'NetServices',
    ubicacion: 'Trujillo, Perú',
    fecha_publicacion: '2026-06-05',
    descripcion_corta: 'Técnico de soporte para atención de incidencias y mantenimiento de equipos.',
    descripcion: 'Buscamos un técnico de soporte TI para brindar atención a usuarios internos, diagnosticar y resolver incidencias de hardware y software, y realizar mantenimiento preventivo de equipos.',
    requisitos: '• 2+ años en soporte TI\n• Windows y Linux\n• Redes básicas\n• Atención al cliente\n• Certificación ITIL deseable',
    salario_min: 1800,
    salario_max: 2500,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 8:00 a 17:00',
    contacto_correo: 'soporte@netservices.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 2 años en soporte TI?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué sistemas operativos manejas?", tipo: "opciones", opciones: ["Windows", "Linux", "Ambos"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes certificación ITIL?", tipo: "si_no", obligatoria: false, orden: 3 },
    ],
  },
  {
    id: 'v9',
    titulo: 'Ingeniero DevOps',
    empresa_id: 9,
    empresa_nombre: 'CloudPeru',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-24',
    descripcion_corta: 'DevOps con experiencia en AWS, Docker y CI/CD.',
    descripcion: 'Buscamos un Ingeniero DevOps para gestionar infraestructura en la nube, automatizar despliegues y mantener la disponibilidad de los servicios. Trabajarás con AWS, Docker, Kubernetes y pipelines de CI/CD.',
    requisitos: '• 3+ años en DevOps\n• AWS o Azure\n• Docker y Kubernetes\n• Jenkins o GitLab CI\n• Terraform deseable',
    salario_min: 5500,
    salario_max: 7000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Remoto',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'jobs@cloudperu.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 3 años de experiencia en DevOps?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué cloud provider usas más?", tipo: "opciones", opciones: ["AWS", "Azure", "GCP", "Otro"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes experiencia con Kubernetes?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v10',
    titulo: 'Analista Contable',
    empresa_id: 10,
    empresa_nombre: 'FinCorp',
    ubicacion: 'Arequipa, Perú',
    fecha_publicacion: '2026-06-23',
    descripcion_corta: 'Analista contable con experiencia en conciliaciones y cierres mensuales.',
    descripcion: 'Nos encontramos en la búsqueda de un Analista Contable para realizar conciliaciones bancarias, registros contables, elaboración de estados financieros y apoyo en cierres contables mensuales.',
    requisitos: '• 2+ años en contabilidad\n• Conocimiento de PCGA/NIIF\n• Excel avanzado\n• SAP deseable\n• Colegiatura',
    salario_min: 2500,
    salario_max: 3500,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 8:00 a 17:00',
    contacto_correo: 'rrhh@fincorp.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 2 años en contabilidad?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Conoces NIIF?", tipo: "si_no", obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Cuál es tu nivel de Excel?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado"], obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v11',
    titulo: 'Recepcionista',
    empresa_id: 11,
    empresa_nombre: 'Hotel Imperial',
    ubicacion: 'Cusco, Perú',
    fecha_publicacion: '2026-06-21',
    descripcion_corta: 'Recepcionista bilingüe para hotel en el centro histórico.',
    descripcion: 'Buscamos una persona proactiva y con excelente presencia para recibir a los huéspedes, gestionar reservas y brindar información turística en nuestro hotel ubicado en el centro de Cusco.',
    requisitos: '• Inglés avanzado\n• Experiencia en atención al cliente\n• Conocimiento de sistemas de reservas\n• Disponibilidad de horarios',
    salario_min: 1500,
    salario_max: 2000,
    tipo_contrato: 'Medio tiempo',
    modalidad: 'Presencial',
    horario: 'Lun - Sáb, 14:00 a 20:00',
    contacto_correo: 'talento@hotelimperial.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tu nivel de inglés es avanzado?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Tienes experiencia en atención al cliente?", tipo: "si_no", obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Disponibilidad para trabajar en Cusco?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v12',
    titulo: 'Community Manager',
    empresa_id: 12,
    empresa_nombre: 'Agencia Pixel',
    ubicacion: 'Remoto',
    fecha_publicacion: '2026-06-19',
    descripcion_corta: 'Community Manager para gestión de redes sociales y contenido.',
    descripcion: 'Estamos buscando un Community Manager creativo para gestionar las redes sociales de nuestros clientes, crear contenido atractivo, programar publicaciones y analizar métricas de rendimiento.',
    requisitos: '• 2+ años en community management\n• Meta Business Suite y LinkedIn\n• Canva o Adobe Suite\n• Redacción creativa\n• Conocimiento de tendencias digitales',
    salario_min: 2000,
    salario_max: 3000,
    tipo_contrato: 'Temporal',
    modalidad: 'Remoto',
    horario: 'Horario flexible',
    contacto_correo: 'rrhh@agenciaspixel.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 2 años como Community Manager?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué redes sociales manejas mejor?", tipo: "opciones", opciones: ["Instagram", "LinkedIn", "TikTok", "Todas"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Manejas Meta Business Suite?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v13',
    titulo: 'Data Engineer',
    empresa_id: 2,
    empresa_nombre: 'DataWorld Corp',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-17',
    descripcion_corta: 'Data Engineer para construir pipelines de datos escalables.',
    descripcion: 'Buscamos un Data Engineer para diseñar, construir y mantener pipelines de datos, optimizar bases de datos y desarrollar soluciones de big data que impulsen la toma de decisiones basada en datos.',
    requisitos: '• 3+ años como Data Engineer\n• Python y SQL\n• Spark o Airflow\n• AWS/GCP\n• Modelado de datos',
    salario_min: 5000,
    salario_max: 7000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Híbrida',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'talento@dataworld.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 3 años como Data Engineer?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué lenguajes usas para ETL?", tipo: "opciones", opciones: ["Python", "SQL", "Java", "Scala"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes experiencia con Airflow o Spark?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v14',
    titulo: 'Asistente Administrativo',
    empresa_id: 14,
    empresa_nombre: 'Grupo RPC',
    ubicacion: 'Trujillo, Perú',
    fecha_publicacion: '2026-06-15',
    descripcion_corta: 'Asistente administrativo para labores de oficina y archivo.',
    descripcion: 'Nos encontramos en la búsqueda de un Asistente Administrativo para apoyar en labores de archivo documentario, atención telefónica, coordinación de reuniones y soporte general a la gerencia.',
    requisitos: '• 1+ año en puestos administrativos\n• Office 365\n• Organización y proactividad\n• Archivo documentario',
    salario_min: 1500,
    salario_max: 2000,
    tipo_contrato: 'Permanente',
    modalidad: 'Presencial',
    horario: 'Lun - Vie, 8:30 a 17:30',
    contacto_correo: 'rrhh@gruporepc.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 1 año en puestos administrativos?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Cuál es tu nivel de Office 365?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Disponibilidad para trabajar en Trujillo?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v15',
    titulo: 'Desarrollador Mobile Flutter',
    empresa_id: 4,
    empresa_nombre: 'TechSolutions',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-14',
    descripcion_corta: 'Desarrollador mobile con Flutter para apps iOS y Android.',
    descripcion: 'Buscamos un Desarrollador Mobile con experiencia en Flutter para crear aplicaciones multiplataforma nativas. Trabajarás en proyectos desafiantes para clientes internacionales en un entorno ágil.',
    requisitos: '• 2+ años con Flutter/Dart\n• Conocimiento de Firebase\n• Experiencia con APIs REST\n• Publicación en App Store y Play Store\n• Git',
    salario_min: 3500,
    salario_max: 5000,
    tipo_contrato: 'Tiempo completo',
    modalidad: 'Híbrida',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'jobs@techsolutions.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 2 años de experiencia con Flutter?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Has publicado apps en App Store o Play Store?", tipo: "si_no", obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes experiencia con Firebase?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
  {
    id: 'v16',
    titulo: 'Tester QA Manual',
    empresa_id: 16,
    empresa_nombre: 'QualitySoft',
    ubicacion: 'Arequipa, Perú',
    fecha_publicacion: '2026-06-11',
    descripcion_corta: 'Tester QA manual para pruebas funcionales y regresión.',
    descripcion: 'Estamos buscando un Tester QA Manual para ejecutar casos de prueba, reportar bugs, realizar pruebas de regresión y asegurar la calidad de nuestras aplicaciones web y móviles.',
    requisitos: '• 1+ año en QA manual\n• Jira o TestRail\n• Conocimiento de ciclos de desarrollo\n• Atención al detalle\n• SQL básico deseable',
    salario_min: 2000,
    salario_max: 3000,
    tipo_contrato: 'Temporal',
    modalidad: 'Remoto',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'rrhh@qualitysoft.pe',
    preguntas_filtro: [
      { id: 1, pregunta: "¿Tienes al menos 1 año como Tester QA Manual?", tipo: "si_no", obligatoria: true, orden: 1 },
      { id: 2, pregunta: "¿Qué herramientas usas para gestión de pruebas?", tipo: "opciones", opciones: ["Jira", "TestRail", "Ambas", "Ninguna"], obligatoria: true, orden: 2 },
      { id: 3, pregunta: "¿Tienes conocimientos de SQL?", tipo: "si_no", obligatoria: true, orden: 3 },
    ],
  },
];

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── listar(filtros) ───────────────────────────────────────
// Filtra por: cargo (titulo), ubicacion, fecha_rango ('24h'|'3d'|'7d'|''), tipo_contrato
export async function listar(filtros = {}) {
  await delay(400);

  let resultado = [...VACANTES_MOCK];

  if (filtros.cargo) {
    const t = filtros.cargo.toLowerCase();
    resultado = resultado.filter((v) => v.titulo.toLowerCase().includes(t));
  }

  if (filtros.ubicacion) {
    const t = filtros.ubicacion.toLowerCase();
    resultado = resultado.filter((v) => v.ubicacion.toLowerCase().includes(t));
  }

  if (filtros.fecha_rango) {
    const limite = getFechaLimite(filtros.fecha_rango);
    if (limite) {
      resultado = resultado.filter((v) => new Date(v.fecha_publicacion) >= limite);
    }
  }

  if (filtros.tipo_contrato) {
    resultado = resultado.filter((v) => v.tipo_contrato === filtros.tipo_contrato);
  }

  if (filtros.modalidad) {
    resultado = resultado.filter((v) => v.modalidad === filtros.modalidad);
  }

  return resultado.map((v) => ({
    id: v.id,
    titulo: v.titulo,
    empresa_nombre: v.empresa_nombre,
    ubicacion: v.ubicacion,
    fecha_publicacion: v.fecha_publicacion,
    descripcion_corta: v.descripcion_corta,
    tipo_contrato: v.tipo_contrato,
    modalidad: v.modalidad,
  }));
}

// ─── detalle(id) ───────────────────────────────────────────
export async function detalle(id) {
  await delay(300);
  const v = VACANTES_MOCK.find((x) => x.id === id);
  if (!v) throw new Error('Vacante no encontrada');
  return { ...v };
}

// ─── postular(id, respuestas, cvFile?) ─────────────────────
// eslint-disable-next-line no-unused-vars
export async function postular(id, _respuestas = {}, _cvFile = null) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Debes iniciar sesión para postularte');

  await delay(600);

  const v = VACANTES_MOCK.find((x) => x.id === id);
  if (!v) throw new Error('Vacante no encontrada');

  // En el futuro esto enviará:
  // POST /vacantes/?action=postular
  // Body: { vacante_id, respuestas, cv_url }
  // Headers: { Authorization: Bearer <token> }
  //
  // Y para el CV:
  // POST /api/upload/cv  (multipart/form-data)

  return {
    success: true,
    message: `Te has postulado exitosamente a "${v.titulo}" en ${v.empresa_nombre}.`,
  };
}
