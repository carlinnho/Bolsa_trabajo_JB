import React, { useState, useEffect } from "react";
import {
    Users,
    Search,
    Calendar,
    Mail,
    Phone,
    Download,
    Eye,
    X,
    Check,
    HelpCircle,
    FileText,
    CheckCircle2,
    XCircle,
    Building2,
    Clock,
    AlertCircle
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// DATOS DE RESPALDO — Se usan automáticamente si el
// servicio externo falla o no existe.
// ═══════════════════════════════════════════════════════════
const FALLBACK_OFFERS = [
    { id: "of-1", cargo: "Desarrollador Frontend React", empresaNombre: "JB Tecnologías" },
    { id: "of-2", cargo: "Diseñador UX/UI Senior", empresaNombre: "Creativa Studio" },
    { id: "of-3", cargo: "Analista de Datos", empresaNombre: "DataCorp" },
    { id: "of-4", cargo: "Ingeniero DevOps", empresaNombre: "CloudNet SAS" },
    { id: "of-5", cargo: "Gerente de Proyectos", empresaNombre: "JB Tecnologías" },
];

const FALLBACK_CANDIDATES = [
    {
        id: "cand-1",
        candidato: "Lucía Gómez Rivas",
        correo: "lucia.gomez@email.com",
        telefono: "+51 987 654 321",
        ofertaId: "of-1",
        fecha: "02/07/2025",
        hora: "09:15 a. m.",
        estado: "Enviado",
        presentacion: "Soy desarrolladora frontend con más de 4 años de experiencia en React y TypeScript. Me apasiona crear interfaces intuitivas y accesibles que generen impacto positivo en los usuarios.",
        respuestas: {
            "¿Tiene experiencia con React?": "Sí, más de 4 años en proyectos empresariales.",
            "¿Disponibilidad para viajar?": "Sí, disponibilidad total."
        }
    },
    {
        id: "cand-2",
        candidato: "Sofía Castro Mendoza",
        correo: "sofia.castro@email.com",
        telefono: "+51 956 123 456",
        ofertaId: "of-1",
        fecha: "01/07/2025",
        hora: "11:30 a. m.",
        estado: "Revisado",
        presentacion: "Ingeniera de sistemas con especialización en desarrollo web. He liderado equipos ágiles y busco un reto que me permita crecer profesionalmente.",
        respuestas: {
            "¿Tiene experiencia con React?": "Sí, 2 años en entorno profesional.",
            "¿Disponibilidad para viajar?": "Parcial, solo fines de semana."
        }
    },
    {
        id: "cand-3",
        candidato: "Carlos Mendoza Torres",
        correo: "carlos.mendoza@email.com",
        telefono: "+51 912 345 678",
        ofertaId: "of-2",
        fecha: "30/06/2025",
        hora: "02:45 p. m.",
        estado: "Entrevista",
        presentacion: "Diseñador UX/UI con portafolio demostrable en Figma. He trabajado con startups y empresas consolidadas, siempre enfocado en la investigación de usuarios.",
        respuestas: {
            "¿Maneja Figma a nivel avanzado?": "Sí, es mi herramienta principal desde hace 3 años.",
            "¿Tiene portafolio disponible?": "Sí, lo adjunto en el CV."
        }
    },
    {
        id: "cand-4",
        candidato: "María Fernanda López",
        correo: "maria.lopez@email.com",
        telefono: "+51 934 567 890",
        ofertaId: "of-2",
        fecha: "29/06/2025",
        hora: "10:00 a. m.",
        estado: "Aprobado",
        presentacion: "Diseñadora con master en experiencia de usuario. Mi enfoque combina diseño visual con investigación cualitativa para crear productos que las personas realmente necesitan.",
        respuestas: {
            "¿Maneja Figma a nivel avanzado?": "Sí, certificación oficial de Figma.",
            "¿Tiene portafolio disponible?": "Sí, disponible en Behance y sitio personal."
        }
    },
    {
        id: "cand-5",
        candidato: "Andrés Ruiz Paredes",
        correo: "andres.ruiz@email.com",
        telefono: "+51 945 678 901",
        ofertaId: "of-3",
        fecha: "28/06/2025",
        hora: "03:20 p. m.",
        estado: "Rechazado",
        presentacion: "Estadístico con conocimientos en Python y SQL. Busco incorporarme al área de análisis de datos de una empresa innovadora.",
        respuestas: {
            "¿Conoce Python y SQL?": "Sí, nivel intermedio en ambos.",
            "¿Experiencia con Power BI?": "Básica, cursos en línea."
        }
    },
    {
        id: "cand-6",
        candidato: "Diego Alejandro Flores",
        correo: "diego.flores@email.com",
        telefono: "+51 956 789 012",
        ofertaId: "of-4",
        fecha: "27/06/2025",
        hora: "08:50 a. m.",
        estado: "Enviado",
        presentacion: "",
        respuestas: {}
    },
    {
        id: "cand-7",
        candidato: "Valentina Rojas Hinostroza",
        correo: "valentina.rojas@email.com",
        telefono: "+51 967 890 123",
        ofertaId: "of-5",
        fecha: "26/06/2025",
        hora: "01:10 p. m.",
        estado: "Entrevista",
        presentacion: "MBA con 8 años de experiencia en gestión de proyectos tecnológicos. Certificada en PMP y Scrum Master. He dirigido equipos de hasta 25 personas.",
        respuestas: {
            "¿Tiene certificación PMP?": "Sí, certificada desde 2022.",
            "¿Experiencia liderando equipos?": "Sí, hasta 25 personas en mi último rol."
        }
    },
    {
        id: "cand-8",
        candidato: "Roberto Sánchez Vega",
        correo: "roberto.sanchez@email.com",
        telefono: "+51 978 901 234",
        ofertaId: "of-3",
        fecha: "25/06/2025",
        hora: "04:30 p. m.",
        estado: "Revisado",
        presentacion: "Ingeniero de sistemas con maestría en Big Data. Experiencia en ETL con Apache Spark y modelado predictivo con scikit-learn.",
        respuestas: {
            "¿Conoce Python y SQL?": "Sí, nivel avanzado, uso diario en mi trabajo actual.",
            "¿Experiencia con Power BI?": "Sí, dashboards ejecutivos para gerencia."
        }
    },
];

// ═══════════════════════════════════════════════════════════
// HELPERS — Intentan cargar del servicio, si falla
// usan los datos de respaldo.
// ═══════════════════════════════════════════════════════════
let _inMemoryCandidates = null;
let _inMemoryOffers = null;

function safeGetCandidates() {
    try {
        // Intentar importar dinámicamente el servicio
        const adminService = require("../../services/adminService");
        if (adminService && typeof adminService.getCandidates === "function") {
            const result = adminService.getCandidates();
            if (Array.isArray(result) && result.length > 0) {
                _inMemoryCandidates = result;
                return result;
            }
        }
    } catch (e) {
        // Servicio no disponible — usar datos de respaldo
    }
    if (!_inMemoryCandidates) {
        _inMemoryCandidates = JSON.parse(JSON.stringify(FALLBACK_CANDIDATES));
    }
    return _inMemoryCandidates;
}

function safeGetOffers() {
    try {
        const adminService = require("../../services/adminService");
        if (adminService && typeof adminService.getOffers === "function") {
            const result = adminService.getOffers();
            if (Array.isArray(result) && result.length > 0) {
                _inMemoryOffers = result;
                return result;
            }
        }
    } catch (e) {
        // Servicio no disponible
    }
    if (!_inMemoryOffers) {
        _inMemoryOffers = JSON.parse(JSON.stringify(FALLBACK_OFFERS));
    }
    return _inMemoryOffers;
}

function safeUpdateCandidateStage(id, newStage) {
    try {
        const adminService = require("../../services/adminService");
        if (adminService && typeof adminService.updateCandidateStage === "function") {
            adminService.updateCandidateStage(id, newStage);
            return; // El servicio maneja la persistencia
        }
    } catch (e) {
        // Servicio no disponible — actualizar en memoria local
    }
    // Fallback: actualizar directamente en la copia en memoria
    if (_inMemoryCandidates) {
        const target = _inMemoryCandidates.find(c => c.id === id);
        if (target) {
            target.estado = newStage;
        }
    }
}

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════
export default function Postulantes() {
    const [candidates, setCandidates] = useState([]);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOffer, setFilterOffer] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [activeCandidate, setActiveCandidate] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pequeño delay para que el render inicial se muestre sin parpadeo
        const timer = setTimeout(() => {
            loadData();
            setLoading(false);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    const loadData = () => {
        try {
            const cands = safeGetCandidates();
            const offs = safeGetOffers();
            setCandidates(cands);
            setOffers(offs);
        } catch (err) {
            console.error("Error cargando datos de postulantes:", err);
            setCandidates(FALLBACK_CANDIDATES);
            setOffers(FALLBACK_OFFERS);
        }
    };

    const handleUpdateStage = (id, newStage) => {
        try {
            safeUpdateCandidateStage(id, newStage);
            // Recargar datos actualizados
            const updatedCands = safeGetCandidates();
            setCandidates(updatedCands);
            // Si el modal está abierto con este candidato, actualizarlo también
            if (activeCandidate && activeCandidate.id === id) {
                const updated = updatedCands.find(c => c.id === id);
                if (updated) setActiveCandidate({ ...updated });
            }
        } catch (err) {
            console.error("Error actualizando estado:", err);
        }
    };

    const handleDownloadCV = (candidato) => {
        setDownloadingId(candidato.id);
        setTimeout(() => {
            setDownloadingId(null);
            alert(`📥 Descargando currículum de ${candidato.candidato} en formato PDF...`);
        }, 1200);
    };

    // ─── Lógica de filtrado ───────────────────────────
    const filteredCandidates = candidates.filter(cand => {
        if (!cand) return false;
        const name = (cand.candidato || "").toLowerCase();
        const email = (cand.correo || "").toLowerCase();
        const term = searchTerm.toLowerCase();
        const matchesSearch = name.includes(term) || email.includes(term);

        const matchesOffer = filterOffer ? cand.ofertaId === filterOffer : true;

        let matchesStatus = true;
        if (filterStatus) {
            if (filterStatus === "Pendiente") {
                matchesStatus = cand.estado === "Enviado" || cand.estado === "Revisado";
            } else {
                matchesStatus = cand.estado === filterStatus;
            }
        }

        return matchesSearch && matchesOffer && matchesStatus;
    });

    const getOfferDetail = (ofertaId) => {
        if (!ofertaId) return { cargo: "Sin asignar", empresa: "N/A" };
        const off = offers.find(o => o.id === ofertaId);
        return off
            ? { cargo: off.cargo, empresa: off.empresaNombre }
            : { cargo: "Vacante Eliminada", empresa: "N/A" };
    };

    // ─── Estadísticas resumidas ───────────────────────
    const totalCount = filteredCandidates.length;
    const pendingCount = filteredCandidates.filter(c => c.estado === "Enviado" || c.estado === "Revisado").length;
    const interviewCount = filteredCandidates.filter(c => c.estado === "Entrevista").length;
    const approvedCount = filteredCandidates.filter(c => c.estado === "Aprobado").length;
    const rejectedCount = filteredCandidates.filter(c => c.estado === "Rechazado").length;

    // ─── Loading state ────────────────────────────────
    if (loading) {
        return (
            <div className="space-y-6 animate-fade-slide">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">
                            Registro de Postulantes
                        </h1>
                        <p className="text-sm text-slate-400">
                            Base de datos centralizada de candidatos y control de estados de postulación
                        </p>
                    </div>
                </div>
                <div className="bg-white p-12 rounded-2xl border border-slate-200/60 shadow-3xs flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-3 border-[#123498]/20 border-t-[#123498] rounded-full animate-spin" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cargando postulantes...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-slide">
            {/* ─── Header ─────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">
                        Registro de Postulantes
                    </h1>
                    <p className="text-sm text-slate-400">
                        Base de datos centralizada de candidatos y control de estados de postulación
                    </p>
                </div>
            </div>

            {/* ─── Barra de estadísticas ─────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total</div>
                    <div className="text-lg font-black text-[#123498] mt-1">{totalCount}</div>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 text-center">
                    <div className="text-[9px] font-black text-amber-500 uppercase tracking-wider">Pendientes</div>
                    <div className="text-lg font-black text-amber-600 mt-1">{pendingCount}</div>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/60 text-center">
                    <div className="text-[9px] font-black text-purple-500 uppercase tracking-wider">Entrevistas</div>
                    <div className="text-lg font-black text-purple-600 mt-1">{interviewCount}</div>
                </div>
                <div className="p-3 bg-green-50/50 rounded-xl border border-green-100/60 text-center">
                    <div className="text-[9px] font-black text-green-500 uppercase tracking-wider">Aprobados</div>
                    <div className="text-lg font-black text-green-600 mt-1">{approvedCount}</div>
                </div>
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100/60 text-center">
                    <div className="text-[9px] font-black text-red-500 uppercase tracking-wider">Rechazados</div>
                    <div className="text-lg font-black text-red-600 mt-1">{rejectedCount}</div>
                </div>
            </div>

            {/* ─── Filtros ────────────────────────────── */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar postulante por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <select
                        value={filterOffer}
                        onChange={(e) => setFilterOffer(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all"
                    >
                        <option value="">Todas las vacantes</option>
                        {offers.map(o => (
                            <option key={o.id} value={o.id}>{o.cargo} ({o.empresaNombre})</option>
                        ))}
                    </select>
                </div>

                <div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all"
                    >
                        <option value="">Todos los estados</option>
                        <option value="Pendiente">Pendiente (CV Recibido/Revisado)</option>
                        <option value="Entrevista">Entrevista</option>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>
                </div>
            </div>

            {/* ─── Tabla de candidatos ───────────────── */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
                {filteredCandidates.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="mx-auto text-slate-300 mb-3" size={40} />
                        <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">Sin candidatos registrados</h3>
                        <p className="text-xs text-slate-400 mt-1">Pruebe ajustando los filtros de búsqueda o verifique vacantes activas.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#F7F8FA] text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-black">Candidato</th>
                                    <th className="px-6 py-4 font-black">Postulación</th>
                                    <th className="px-6 py-4 font-black">Fecha y Hora de Ingreso</th>
                                    <th className="px-6 py-4 font-black text-center">Filtros</th>
                                    <th className="px-6 py-4 font-black">Estado</th>
                                    <th className="px-6 py-4 font-black text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCandidates.map((cand) => {
                                    if (!cand) return null;
                                    const details = getOfferDetail(cand.ofertaId);
                                    const initLetters = (cand.candidato || "??").substring(0, 2).toUpperCase();
                                    const hasAnswers = cand.respuestas && typeof cand.respuestas === "object" && Object.keys(cand.respuestas).length > 0;

                                    let stateLabel = cand.estado || "Sin estado";
                                    let stateStyle = "bg-slate-50 text-slate-500 border border-slate-100";

                                    if (cand.estado === "Enviado" || cand.estado === "Revisado") {
                                        stateLabel = "Pendiente";
                                        stateStyle = "bg-amber-50 text-amber-700 border border-amber-100";
                                    } else if (cand.estado === "Entrevista") {
                                        stateStyle = "bg-purple-50 text-purple-700 border border-purple-100";
                                    } else if (cand.estado === "Aprobado") {
                                        stateStyle = "bg-green-50 text-green-700 border border-green-100";
                                    } else if (cand.estado === "Rechazado") {
                                        stateStyle = "bg-red-50 text-red-700 border border-red-100";
                                    }

                                    return (
                                        <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center text-[10px] font-black shrink-0 border border-[#123498]/10">
                                                        {initLetters}
                                                    </div>
                                                    <div>
                                                        <div className="font-extrabold text-slate-700 text-xs uppercase tracking-wide">{cand.candidato}</div>
                                                        <div className="text-[10px] text-slate-400 font-semibold flex flex-col sm:flex-row sm:gap-2 mt-0.5">
                                                            <span>{cand.correo}</span>
                                                            <span className="hidden sm:inline text-slate-200">|</span>
                                                            <span>{cand.telefono}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="font-extrabold text-slate-600 text-xs">{details.cargo}</div>
                                                <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-0.5 uppercase">
                                                    <Building2 size={11} />
                                                    <span>{details.empresa}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="text-slate-600 font-bold flex items-center gap-1">
                                                    <Calendar size={12} className="text-slate-400" />
                                                    <span>{cand.fecha}</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-0.5">
                                                    <Clock size={11} className="text-slate-400" />
                                                    <span>{cand.hora || "09:00 a. m."}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                {hasAnswers ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-50 text-[#123498] border border-blue-100">
                                                        <HelpCircle size={10} />
                                                        <span>Respondido</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 border border-slate-100">
                                                        <span>Sin filtro</span>
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${stateStyle}`}>
                                                    {stateLabel}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setActiveCandidate(cand)}
                                                        className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all"
                                                        title="Ver Expediente"
                                                    >
                                                        <Eye size={13} />
                                                    </button>

                                                    {cand.estado !== "Aprobado" && (
                                                        <button
                                                            onClick={() => handleUpdateStage(cand.id, "Aprobado")}
                                                            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg border border-transparent hover:border-green-100 transition-all"
                                                            title="Aprobar Candidato"
                                                        >
                                                            <Check size={13} strokeWidth={3} />
                                                        </button>
                                                    )}

                                                    {cand.estado !== "Rechazado" && (
                                                        <button
                                                            onClick={() => handleUpdateStage(cand.id, "Rechazado")}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                                                            title="Rechazar Candidato"
                                                        >
                                                            <X size={13} strokeWidth={3} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ─── Modal de detalle del candidato ────── */}
            {activeCandidate && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in"
                    onClick={(e) => { if (e.target === e.currentTarget) setActiveCandidate(null); }}
                >
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-xl shadow-2xl overflow-hidden animate-scale-up my-8">
                        {/* Header del modal */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center text-sm font-black shadow-3xs border border-[#123498]/10 shrink-0">
                                    {(activeCandidate.candidato || "??").substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-slate-700 uppercase tracking-wide">
                                        Expediente de {activeCandidate.candidato}
                                    </h2>
                                    <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">
                                        Postulante a {getOfferDetail(activeCandidate.ofertaId).cargo} ({getOfferDetail(activeCandidate.ofertaId).empresa})
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveCandidate(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
                            {/* Datos de contacto */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-slate-400" />
                                    <div className="min-w-0">
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Correo</div>
                                        <div className="text-slate-700 font-bold truncate">{activeCandidate.correo || "No registrado"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    <div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Teléfono</div>
                                        <div className="text-slate-700 font-bold">{activeCandidate.telefono || "No registrado"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-slate-400" />
                                    <div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Postulado</div>
                                        <div className="text-slate-700 font-bold">{activeCandidate.fecha || "Sin fecha"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Descarga de CV */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-[#123498]/10 bg-[#123498]/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0 shadow-3xs">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-700">Currículum Vitae.pdf</div>
                                        <div className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">Archivo digital cargado</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownloadCV(activeCandidate)}
                                    disabled={downloadingId !== null}
                                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#123498] hover:bg-[#096ACC] disabled:bg-slate-400 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0"
                                >
                                    <Download size={12} />
                                    <span>{downloadingId === activeCandidate.id ? "Descargando..." : "Descargar CV"}</span>
                                </button>
                            </div>

                            {/* Carta de presentación */}
                            <div>
                                <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1.5">
                                    Carta de Presentación
                                </h3>
                                <p className="text-slate-500 bg-[#F7F8FA] p-3.5 rounded-xl border border-slate-200/60 leading-relaxed font-semibold italic">
                                    &ldquo;{activeCandidate.presentacion || "El candidato no redactó una carta de presentación."}&rdquo;
                                </p>
                            </div>

                            {/* Respuestas de pre-filtrado */}
                            <div>
                                <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <HelpCircle size={13} className="text-[#F46F0B]" />
                                    Respuestas de Pre-filtrado
                                </h3>
                                {!activeCandidate.respuestas || typeof activeCandidate.respuestas !== "object" || Object.keys(activeCandidate.respuestas).length === 0 ? (
                                    <p className="text-slate-400 font-bold bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 text-center uppercase tracking-wider">
                                        Esta oferta no requería preguntas de filtrado.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {Object.entries(activeCandidate.respuestas).map(([q, a], idx) => (
                                            <div key={idx} className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60">
                                                <div className="font-extrabold text-slate-700 flex items-start gap-1">
                                                    <span className="text-[#F46F0B] font-black w-4">Q.</span>
                                                    <span>{q}</span>
                                                </div>
                                                <div className="mt-2 text-slate-500 font-semibold pl-4 flex items-start gap-1">
                                                    <span className="text-green-600 font-black w-4">A.</span>
                                                    <span>{a}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Controles de cambio de estado */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                                    Etapa Actual: <span className="text-[#123498] font-black">{activeCandidate.estado}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeCandidate.estado !== "Rechazado" && (
                                        <button
                                            onClick={() => handleUpdateStage(activeCandidate.id, "Rechazado")}
                                            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                                        >
                                            <XCircle size={13} />
                                            Rechazar
                                        </button>
                                    )}
                                    {activeCandidate.estado !== "Aprobado" && (
                                        <button
                                            onClick={() => handleUpdateStage(activeCandidate.id, "Aprobado")}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                                        >
                                            <CheckCircle2 size={13} />
                                            Aprobar
                                        </button>
                                    )}
                                    {(activeCandidate.estado === "Aprobado" || activeCandidate.estado === "Rechazado") && (
                                        <button
                                            onClick={() => handleUpdateStage(activeCandidate.id, "Enviado")}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                                        >
                                            <AlertCircle size={13} />
                                            Marcar Pendiente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}