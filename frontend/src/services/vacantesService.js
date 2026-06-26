// ─────────────────────────────────────────────────────────────
// vacantesService.js — Servicio de vacantes (API / mock)
//
// API esperada (futura):
//   GET  /vacantes/?cargo=&ubicacion=&fecha_rango=7d
//   GET  /vacantes/?id=<uuid>
//   POST /vacantes/?action=postular  (requiere Bearer token)
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
    cargo: 'Desarrollador Frontend React',
    empresa: 'Consultora JB',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-20',
    descripcion_corta: 'Buscamos un desarrollador frontend con experiencia en React y Tailwind CSS.',
    descripcion: 'Nos encontramos en la búsqueda de un Desarrollador Frontend con sólidos conocimientos en React para unirse a nuestro equipo de tecnología. Serás responsable de construir y mantener interfaces de usuario modernas y responsivas, colaborando estrechamente con el equipo de diseño y backend.',
    requisitos: '• 3+ años de experiencia con React\n• Conocimiento de Tailwind CSS\n• Experiencia con consumo de APIs REST\n• Git y trabajo en equipo\n• Inglés técnico deseable',
    salario: 'S/ 3,500 - S/ 5,000',
    tipo_contrato: 'Tiempo completo',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'rrhh@consultorajb.com',
  },
  {
    id: 'v2',
    cargo: 'Analista de Datos',
    empresa: 'DataWorld Corp',
    ubicacion: 'Arequipa, Perú',
    fecha_publicacion: '2026-06-18',
    descripcion_corta: 'Analista de datos con experiencia en Python, SQL y visualización.',
    descripcion: 'Buscamos un Analista de Datos para extraer, procesar y analizar datos de diversas fuentes. Crearás dashboards y reportes que apoyarán la toma de decisiones estratégicas.',
    requisitos: '• 2+ años en análisis de datos\n• Python (Pandas, NumPy)\n• SQL avanzado\n• Power BI o Tableau\n• Estadística descriptiva',
    salario: 'S/ 3,000 - S/ 4,200',
    tipo_contrato: 'Tiempo completo',
    horario: 'Lun - Vie, 8:00 a 17:00',
    contacto_correo: 'talento@dataworld.pe',
  },
  {
    id: 'v3',
    cargo: 'Diseñador UI/UX Senior',
    empresa: 'Consultora JB',
    ubicacion: 'Remoto',
    fecha_publicacion: '2026-06-25',
    descripcion_corta: 'Diseñador con experiencia en Figma, design systems y user research.',
    descripcion: 'Estamos buscando un Diseñador UI/UX Senior para liderar el diseño de nuestras plataformas digitales. Crearás experiencias de usuario intuitivas y atractivas, definiendo patrones de diseño y colaborando con desarrolladores.',
    requisitos: '• 4+ años en diseño UI/UX\n• Figma avanzado\n• Experiencia en design systems\n• Conocimiento de accesibilidad\n• Portfolio demostrable',
    salario: 'S/ 4,000 - S/ 6,000',
    tipo_contrato: 'Tiempo completo',
    horario: 'Horario flexible',
    contacto_correo: 'rrhh@consultorajb.com',
  },
  {
    id: 'v4',
    cargo: 'Backend Developer Node.js',
    empresa: 'TechSolutions',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-22',
    descripcion_corta: 'Desarrollador backend con Node.js, Express y bases de datos SQL/NoSQL.',
    descripcion: 'Nos encontramos en la búsqueda de un Backend Developer para desarrollar y mantener APIs escalables. Trabajarás con Node.js, Express y bases de datos relacionales y no relacionales en un entorno ágil.',
    requisitos: '• 3+ años con Node.js\n• Express o NestJS\n• PostgreSQL y MongoDB\n• Docker\n• Pruebas unitarias y de integración',
    salario: 'S/ 4,000 - S/ 5,500',
    tipo_contrato: 'Tiempo completo',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'jobs@techsolutions.pe',
  },
  {
    id: 'v5',
    cargo: 'Practicante de Sistemas',
    empresa: 'Consultora JB',
    ubicacion: 'Lima, Perú',
    fecha_publicacion: '2026-06-10',
    descripcion_corta: 'Practicante para soporte técnico y desarrollo de herramientas internas.',
    descripcion: 'Buscamos un practicante de sistemas para brindar soporte técnico a usuarios internos y apoyar en el desarrollo de herramientas de automatización. Excelente oportunidad para ganar experiencia en un entorno empresarial.',
    requisitos: '• Estudiante de Ing. de Sistemas o afines\n• Conocimientos básicos de redes\n• Office 365\n• Ganas de aprender',
    salario: 'S/ 1,025 - S/ 1,200',
    tipo_contrato: 'Prácticas',
    horario: 'Lun - Vie, 9:00 a 14:00',
    contacto_correo: 'rrhh@consultorajb.com',
  },
  {
    id: 'v6',
    cargo: 'Project Manager',
    empresa: 'Innovatech',
    ubicacion: 'Cusco, Perú',
    fecha_publicacion: '2026-06-12',
    descripcion_corta: 'Project Manager con experiencia en metodologías ágiles y gestión de equipos.',
    descripcion: 'Buscamos un Project Manager para liderar equipos multidisciplinarios en proyectos de transformación digital. Serás responsable de la planificación, seguimiento y entrega de proyectos dentro del tiempo y presupuesto.',
    requisitos: '• 5+ años como PM\n• Certificación Scrum Master\n• Conocimiento de Jira\n• Liderazgo de equipos\n• Inglés avanzado',
    salario: 'S/ 5,000 - S/ 7,000',
    tipo_contrato: 'Tiempo completo',
    horario: 'Lun - Vie, 9:00 a 18:00',
    contacto_correo: 'rrhh@innovatech.pe',
  },
  {
    id: 'v7',
    cargo: 'Especialista en Marketing Digital',
    empresa: 'Consultora JB',
    ubicacion: 'Remoto',
    fecha_publicacion: '2026-06-08',
    descripcion_corta: 'Especialista en marketing digital para gestión de redes sociales y campañas.',
    descripcion: 'Buscamos un Especialista en Marketing Digital para gestionar y ejecutar estrategias de marketing en redes sociales, campañas publicitarias y análisis de métricas para fortalecer la presencia de marca.',
    requisitos: '• 3+ años en marketing digital\n• Meta Ads y Google Ads\n• SEO/SEM\n• Canva y Adobe Suite\n• Analítica web',
    salario: 'S/ 2,800 - S/ 4,000',
    tipo_contrato: 'Tiempo completo',
    horario: 'Horario flexible',
    contacto_correo: 'marketing@consultorajb.com',
  },
  {
    id: 'v8',
    cargo: 'Soporte Técnico TI',
    empresa: 'NetServices',
    ubicacion: 'Trujillo, Perú',
    fecha_publicacion: '2026-06-05',
    descripcion_corta: 'Técnico de soporte para atención de incidencias y mantenimiento de equipos.',
    descripcion: 'Buscamos un técnico de soporte TI para brindar atención a usuarios internos, diagnosticar y resolver incidencias de hardware y software, y realizar mantenimiento preventivo de equipos.',
    requisitos: '• 2+ años en soporte TI\n• Windows y Linux\n• Redes básicas\n• Atención al cliente\n• Certificación ITIL deseable',
    salario: 'S/ 1,800 - S/ 2,500',
    tipo_contrato: 'Tiempo completo',
    horario: 'Lun - Vie, 8:00 a 17:00',
    contacto_correo: 'soporte@netservices.pe',
  },
];

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── listar(filtros) ───────────────────────────────────────
// Filtra por: cargo, ubicacion, fecha_rango ('24h'|'3d'|'7d'|''), tipo_contrato
export async function listar(filtros = {}) {
  await delay(400);

  let resultado = [...VACANTES_MOCK];

  if (filtros.cargo) {
    const t = filtros.cargo.toLowerCase();
    resultado = resultado.filter((v) => v.cargo.toLowerCase().includes(t));
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

  return resultado.map((v) => ({
    id: v.id,
    cargo: v.cargo,
    empresa: v.empresa,
    ubicacion: v.ubicacion,
    fecha_publicacion: v.fecha_publicacion,
    descripcion_corta: v.descripcion_corta,
    tipo_contrato: v.tipo_contrato,
  }));
}

// ─── detalle(id) ───────────────────────────────────────────
export async function detalle(id) {
  await delay(300);
  const v = VACANTES_MOCK.find((x) => x.id === id);
  if (!v) throw new Error('Vacante no encontrada');
  return { ...v };
}

// ─── postular(id) ──────────────────────────────────────────
export async function postular(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Debes iniciar sesión para postularte');

  await delay(600);

  const v = VACANTES_MOCK.find((x) => x.id === id);
  if (!v) throw new Error('Vacante no encontrada');

  return {
    success: true,
    message: `Te has postulado exitosamente a "${v.cargo}" en ${v.empresa}.`,
  };
}
