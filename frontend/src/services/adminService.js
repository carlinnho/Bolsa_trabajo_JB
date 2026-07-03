// src/services/adminService.js

const KEY_COMPANIES = "jb_admin_companies";
const KEY_OFFERS = "jb_admin_offers";
const KEY_CANDIDATES = "jb_admin_candidates";

// Initial mock data
const INITIAL_COMPANIES = [
    { id: 'c1', nombre: 'I.seg', sector: 'Seguridad', descripcion: 'Líder en servicios de seguridad integral y vigilancia privada.', logoColor: '#F46F0B' },
    { id: 'c2', nombre: 'Consultora JB', sector: 'Recursos Humanos', descripcion: 'Especialistas en atracción, selección y desarrollo del talento humano.', logoColor: '#123498' },
    { id: 'c3', nombre: 'TechSolutions', sector: 'Desarrollo de Software', descripcion: 'Creación de software a medida, consultoría TI y transformación digital.', logoColor: '#10B981' },
    { id: 'c4', nombre: 'DataWorld Corp', sector: 'Tecnología de Datos', descripcion: 'Soluciones analíticas, big data y business intelligence para empresas.', logoColor: '#3B82F6' },
    { id: 'c5', nombre: 'JB Interna', sector: 'Administración', descripcion: 'Servicios internos de administración, contabilidad y soporte corporativo.', logoColor: '#6366F1' }
];

const INITIAL_OFFERS = [
    {
        id: 'o1',
        cargo: 'Desarrollador Frontend React',
        empresaId: 'c2',
        empresaNombre: 'Consultora JB',
        ubicacion: 'Lima, Perú',
        salario: 'S/ 3,500 - S/ 5,000',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Presencial',
        descripcion: 'Buscamos un desarrollador frontend apasionado por la creación de interfaces dinámicas y pulidas con React y Tailwind.',
        requisitos: '• 2+ años en React\n• CSS/Tailwind\n• Consumo de APIs REST\n• Control de versiones Git',
        estado: 'Activa',
        preguntas: ["¿Cuántos años de experiencia tienes con React?", "¿Tienes conocimientos en Tailwind CSS?"],
        fecha_publicacion: '2026-06-20'
    },
    {
        id: 'o2',
        cargo: 'Analista Contable',
        empresaId: 'c1',
        empresaNombre: 'I.seg',
        ubicacion: 'Arequipa, Perú',
        salario: 'S/ 2,500 - S/ 3,500',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Presencial',
        descripcion: 'Buscamos un analista contable para conciliaciones bancarias, cierres mensuales y manejo de sistemas contables.',
        requisitos: '• Egresado o bachiller en Contabilidad\n• Experiencia con ERPs (SAP deseable)\n• Excel avanzado',
        estado: 'Activa',
        preguntas: ["¿Tienes título universitario o colegiatura?", "¿Qué sistema contable manejas (ERP/SAP)?"],
        fecha_publicacion: '2026-06-23'
    },
    {
        id: 'o3',
        cargo: 'Asistente Legal',
        empresaId: 'c5',
        empresaNombre: 'JB Interna',
        ubicacion: 'Lima, Híbrido',
        salario: 'S/ 2,000 - S/ 3,000',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Híbrida',
        descripcion: 'Buscamos un asistente legal para soporte en trámites corporativos y derecho laboral.',
        requisitos: '• Bachiller en Derecho\n• Conocimiento sólido en legislación laboral peruana\n• 1 año de experiencia mínima',
        estado: 'Activa',
        preguntas: ["¿Tiene experiencia en derecho laboral?"],
        fecha_publicacion: '2026-06-25'
    },
    {
        id: 'o4',
        cargo: 'Ejecutivo Comercial',
        empresaId: 'c1',
        empresaNombre: 'I.seg',
        ubicacion: 'Lima, Perú',
        salario: 'S/ 2,200 + Comisiones',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Presencial',
        descripcion: 'Buscamos ejecutivos comerciales para ventas consultivas B2B en el rubro de seguridad corporativa.',
        requisitos: '• Experiencia previa en ventas intangibles o seguridad\n• Capacidad de negociación\n• Cartera de clientes deseable',
        estado: 'Activa',
        preguntas: ["¿Tiene experiencia en ventas corporativas?"],
        fecha_publicacion: '2026-06-28'
    },
    {
        id: 'o5',
        cargo: 'Backend Developer Node.js',
        empresaId: 'c3',
        empresaNombre: 'TechSolutions',
        ubicacion: 'Remoto',
        salario: 'S/ 4,000 - S/ 5,500',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Remoto',
        descripcion: 'Buscamos desarrolladores backend robustos con Node.js y Express para creación de APIs de alto rendimiento.',
        requisitos: '• Node.js y Express\n• Bases de datos PostgreSQL o MySQL\n• Pruebas unitarias\n• Docker',
        estado: 'Activa',
        preguntas: ["¿Tienes experiencia con Express y bases de datos SQL?"],
        fecha_publicacion: '2026-06-22'
    },
    {
        id: 'o6',
        cargo: 'Diseñador UI/UX Senior',
        empresaId: 'c2',
        empresaNombre: 'Consultora JB',
        ubicacion: 'Remoto',
        salario: 'S/ 4,000 - S/ 6,000',
        tipo_contrato: 'Tiempo completo',
        modalidad: 'Remoto',
        descripcion: 'Diseño de experiencias completas, wireframes, user journeys y mantenimiento del sistema de diseño.',
        requisitos: '• Figma avanzado\n• Portfolio robusto UI/UX\n• Metodologías de investigación de usuario',
        estado: 'Pausada',
        preguntas: ["¿Tienes un portafolio actualizado en Behance/Figma?"],
        fecha_publicacion: '2026-06-24'
    }
];

const INITIAL_CANDIDATES = [
    {
        id: 'p1',
        candidato: 'Ana Torres',
        correo: 'ana.torres@gmail.com',
        telefono: '987654321',
        cvUrl: '#',
        presentacion: 'Egresada de contabilidad con 2 años de experiencia en conciliaciones y reportes. Proactiva y con excelente capacidad analítica.',
        ofertaId: 'o2',
        estado: 'Revisado',
        respuestas: {
            "¿Tienes título universitario o colegiatura?": "Sí, bachiller en contabilidad",
            "¿Qué sistema contable manejas (ERP/SAP)?": "Tengo experiencia usando SAP Business One a nivel usuario."
        },
        fecha: '2026-07-02'
    },
    {
        id: 'p2',
        candidato: 'Luis Prado',
        correo: 'lprado@outlook.com',
        telefono: '912345678',
        cvUrl: '#',
        presentacion: 'Abogado colegiado con maestría en derecho laboral. Experiencia en redacción de contratos, asesoría sindical e inspecciones de Sunafil.',
        ofertaId: 'o3',
        estado: 'Enviado',
        respuestas: {
            "¿Tiene experiencia en derecho laboral?": "Sí, cuento con 1 año y medio de experiencia en derecho laboral en un estudio jurídico corporativo."
        },
        fecha: '2026-07-02'
    },
    {
        id: 'p3',
        candidato: 'Marco Díaz',
        correo: 'mdiaz@yahoo.com',
        telefono: '923456789',
        cvUrl: '#',
        presentacion: 'Vendedor corporativo con amplia experiencia en colocación de servicios intangibles de seguridad y resguardo.',
        ofertaId: 'o4',
        estado: 'Aprobado',
        respuestas: {
            "¿Tiene experiencia en ventas corporativas?": "Sí, llevo más de 3 años vendiendo servicios corporativos B2B en el sector de seguridad y logística."
        },
        fecha: '2026-07-01'
    },
    {
        id: 'p4',
        candidato: 'Sofía Castro',
        correo: 'sofia.castro@gmail.com',
        telefono: '934567890',
        cvUrl: '#',
        presentacion: 'Desarrolladora frontend con gran enfoque en diseño e interacción de interfaces modernas. Gusto por el clean code.',
        ofertaId: 'o1',
        estado: 'Entrevista',
        respuestas: {
            "¿Cuántos años de experiencia tienes con React?": "Tengo 3 años trabajando exclusivamente con React y librerías de estado como Redux Toolkit.",
            "¿Tienes conocimientos en Tailwind CSS?": "Sí, lo utilizo en todos mis proyectos para layouts dinámicos y estilado fluido."
        },
        fecha: '2026-07-02'
    },
    {
        id: 'p5',
        candidato: 'Carlos Mendoza',
        correo: 'carlos.m@gmail.com',
        telefono: '945678901',
        cvUrl: '#',
        presentacion: 'Analista con fuertes habilidades en SQL y Python. Me especializo en procesar reportes de negocio y automatización de métricas.',
        ofertaId: 'o2',
        estado: 'Enviado',
        respuestas: {
            "¿Tienes título universitario o colegiatura?": "Sí, colegiado en Ingeniería Comercial.",
            "¿Qué sistema contable manejas (ERP/SAP)?": "Manejo CONCAR y he tenido capacitaciones básicas en SAP ERP."
        },
        fecha: '2026-07-02'
    },
    {
        id: 'p6',
        candidato: 'Valeria Ruiz',
        correo: 'vruiz@design.co',
        telefono: '956789012',
        cvUrl: '#',
        presentacion: 'Diseñadora UI/UX enfocada en diseño centrado en el usuario, prototipado interactivo de alta fidelidad y mantenimiento de Design Systems.',
        ofertaId: 'o6',
        estado: 'Enviado',
        respuestas: {
            "¿Tienes un portafolio actualizado en Behance/Figma?": "Sí, se puede revisar mi portafolio en figma.com/@valeria_ruiz_designer con mis últimos proyectos UI."
        },
        fecha: '2026-06-30'
    },
    {
        id: 'p7',
        candidato: 'Diego Herrera',
        correo: 'diego.h@gmail.com',
        telefono: '967890123',
        cvUrl: '#',
        presentacion: 'Ingeniero Backend especializado en arquitecturas REST, microservicios y tuning de bases de datos relacionales.',
        ofertaId: 'o5',
        estado: 'Revisado',
        respuestas: {
            "¿Tienes experiencia con Express y bases de datos SQL?": "Sí, llevo desarrollando con Node.js y Express unos 4 años y utilizo PostgreSQL en producción de manera continua."
        },
        fecha: '2026-07-01'
    },
    {
        id: 'p8',
        candidato: 'Lucía Gomez',
        correo: 'lucia.gomez@hotmail.com',
        telefono: '978901234',
        cvUrl: '#',
        presentacion: 'Desarrolladora Frontend Junior. Conozco React y Vue, busco una oportunidad para seguir creciendo profesionalmente.',
        ofertaId: 'o1',
        estado: 'Enviado',
        respuestas: {
            "¿Cuántos años de experiencia tienes con React?": "1 año de experiencia en prácticas y proyectos personales.",
            "¿Tienes conocimientos en Tailwind CSS?": "Sí, he maquetado múltiples proyectos responsivos con Tailwind."
        },
        fecha: '2026-07-02'
    }
];

// Helper to initialize local storage
const initializeDB = () => {
    if (!localStorage.getItem(KEY_COMPANIES)) {
        localStorage.setItem(KEY_COMPANIES, JSON.stringify(INITIAL_COMPANIES));
    }
    if (!localStorage.getItem(KEY_OFFERS)) {
        localStorage.setItem(KEY_OFFERS, JSON.stringify(INITIAL_OFFERS));
    }
    if (!localStorage.getItem(KEY_CANDIDATES)) {
        localStorage.setItem(KEY_CANDIDATES, JSON.stringify(INITIAL_CANDIDATES));
    }
};

initializeDB();

// --- COMPANIES CRUD ---
export const getCompanies = () => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEY_COMPANIES));
};

export const saveCompany = (company) => {
    const list = getCompanies();
    if (company.id) {
        // Edit
        const index = list.findIndex(c => c.id === company.id);
        if (index !== -1) {
            list[index] = { ...list[index], ...company };
        }
    } else {
        // Add new
        company.id = 'c_' + Date.now();
        company.logoColor = company.logoColor || getRandomColor();
        list.push(company);
    }
    localStorage.setItem(KEY_COMPANIES, JSON.stringify(list));
    return company;
};

export const deleteCompany = (id) => {
    let list = getCompanies();
    list = list.filter(c => c.id !== id);
    localStorage.setItem(KEY_COMPANIES, JSON.stringify(list));
    return true;
};

// --- OFFERS CRUD ---
export const getOffers = () => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEY_OFFERS));
};

export const saveOffer = (offer) => {
    const list = getOffers();
    const companies = getCompanies();
    const comp = companies.find(c => c.id === offer.empresaId);
    offer.empresaNombre = comp ? comp.nombre : "Otra";

    if (offer.id) {
        // Edit
        const index = list.findIndex(o => o.id === offer.id);
        if (index !== -1) {
            list[index] = { ...list[index], ...offer };
        }
    } else {
        // Add new
        offer.id = 'o_' + Date.now();
        offer.fecha_publicacion = new Date().toISOString().split('T')[0];
        offer.estado = offer.estado || 'Activa';
        offer.preguntas = offer.preguntas || [];
        list.push(offer);
    }
    localStorage.setItem(KEY_OFFERS, JSON.stringify(list));
    return offer;
};

export const deleteOffer = (id) => {
    let list = getOffers();
    list = list.filter(o => o.id !== id);
    localStorage.setItem(KEY_OFFERS, JSON.stringify(list));

    // Clean up candidates associated with deleted offer
    let candidates = getCandidates();
    candidates = candidates.filter(c => c.ofertaId !== id);
    localStorage.setItem(KEY_CANDIDATES, JSON.stringify(candidates));

    return true;
};

export const toggleOfferStatus = (id) => {
    const list = getOffers();
    const index = list.findIndex(o => o.id === id);
    if (index !== -1) {
        list[index].estado = list[index].estado === 'Activa' ? 'Pausada' : 'Activa';
        localStorage.setItem(KEY_OFFERS, JSON.stringify(list));
        return list[index];
    }
    return null;
};

// --- CANDIDATES / FUNNEL STATE ---
export const getCandidates = () => {
    initializeDB();
    const list = JSON.parse(localStorage.getItem(KEY_CANDIDATES)) || [];
    let updated = false;
    const listWithHours = list.map((c, idx) => {
        if (!c.hora) {
            const hours = ["08:34 a. m.", "10:02 a. m.", "11:15 a. m.", "12:10 p. m.", "08:45 a. m.", "03:20 p. m.", "04:12 p. m.", "09:05 a. m."];
            c.hora = hours[idx % hours.length];
            updated = true;
        }
        return c;
    });
    if (updated) {
        localStorage.setItem(KEY_CANDIDATES, JSON.stringify(listWithHours));
    }
    return listWithHours;
};

export const updateCandidateStage = (id, newStage) => {
    const list = getCandidates();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
        list[index].estado = newStage;
        localStorage.setItem(KEY_CANDIDATES, JSON.stringify(list));
        return list[index];
    }
    return null;
};

export const addCandidate = (candidate) => {
    const list = getCandidates();
    candidate.id = 'p_' + Date.now();
    candidate.fecha = new Date().toISOString().split('T')[0];
    
    const now = new Date();
    let hrs = now.getHours();
    let mins = now.getMinutes();
    let ampm = hrs >= 12 ? 'p. m.' : 'a. m.';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    mins = mins < 10 ? '0' + mins : mins;
    candidate.hora = `${hrs}:${mins} ${ampm}`;

    candidate.estado = candidate.estado || 'Enviado';
    list.push(candidate);
    localStorage.setItem(KEY_CANDIDATES, JSON.stringify(list));
    return candidate;
};

// --- STATS HELPER ---
export const getStatsSummary = () => {
    const companies = getCompanies();
    const offers = getOffers();
    const candidates = getCandidates();

    // Candidates applied today (mock filter or just count)
    const today = new Date().toISOString().split('T')[0];
    const todayCount = candidates.filter(c => c.fecha === today || c.fecha === '2026-07-02').length;

    const activeOffersCount = offers.filter(o => o.estado === 'Activa').length;
    const companiesCount = companies.length;

    // Calculate rates
    const approvedCount = candidates.filter(c => c.estado === 'Aprobado').length;
    const totalCount = candidates.length;
    const approvalRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

    // Count by funnel stages
    const funnelStages = [
        { label: "Enviado", count: candidates.filter(c => c.estado === 'Enviado').length, color: "#123498", width: "100%" },
        { label: "Revisado", count: candidates.filter(c => c.estado === 'Revisado').length, color: "#3B5BDB", width: "100%" },
        { label: "Entrevista", count: candidates.filter(c => c.estado === 'Entrevista').length, color: "#6C8CFF", width: "100%" },
        { label: "Aprobado", count: candidates.filter(c => c.estado === 'Aprobado').length, color: "#F46F0B", width: "100%" },
        { label: "Rechazado", count: candidates.filter(c => c.estado === 'Rechazado').length, color: "#EF4444", width: "100%" }
    ];

    // Compute relative width based on max count
    const maxCount = Math.max(...funnelStages.map(f => f.count), 1);
    funnelStages.forEach(stage => {
        stage.width = `${Math.max((stage.count / maxCount) * 100, 8)}%`;
    });

    // Recent activity (sorted or just last 5)
    // Mapping candidate, offer cargo, company name, state
    const recentActivity = candidates.slice(-5).reverse().map(c => {
        const off = offers.find(o => o.id === c.ofertaId);
        return {
            id: c.id,
            candidato: c.candidato,
            oferta: off ? off.cargo : "Puesto Eliminado",
            empresa: off ? off.empresaNombre : "N/A",
            estado: c.estado,
            fecha: c.fecha,
            hora: c.hora || "09:00 a. m."
        };
    });

    return {
        todayCount,
        activeOffersCount,
        companiesCount,
        approvalRate,
        funnelStages,
        recentActivity
    };
};

const COLORS = ['#123498', '#F46F0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}
