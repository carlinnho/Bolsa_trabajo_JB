import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Building2, Briefcase, Users, LogOut,
    ChevronRight, Menu, X, Calendar, PlusCircle, ArrowRight,
    Clock, Video, MapPin, CheckCircle2, XCircle, Download, Mail, Phone,
    Eye, Check, FileText, HelpCircle, Edit3, Trash2, Search, ToggleLeft,
    ToggleRight, Plus, Sparkles, User, UserCheck, AlertCircle, Home
} from "lucide-react";
import StatCard from "./StatCard";
import {
    getStatsSummary, getCandidates, getOffers, updateCandidateStage,
    getCompanies, saveCompany, deleteCompany, saveOffer, deleteOffer, toggleOfferStatus
} from "../../services/adminService";

// ═══════════════════════════════════════════════════════════
// DATOS MOCK
// ═══════════════════════════════════════════════════════════
const UPCOMING_INTERVIEWS = [
    { candidato: "Sofía Castro", puesto: "Desarrollador Frontend React", tipo: "Virtual (Zoom)", fecha: "Hoy, 4:00 PM", entrevistador: "Rodrigo M. (JB)", icon: Video, color: "bg-blue-50 text-blue-600 border border-blue-100" },
    { candidato: "Diego Herrera", puesto: "Backend Developer Node.js", tipo: "Presencial", fecha: "Mañana, 10:00 AM", entrevistador: "Carlos S. (TechSolutions)", icon: MapPin, color: "bg-purple-50 text-purple-600 border border-purple-100" },
    { candidato: "Ana Torres", puesto: "Analista Contable", tipo: "Presencial", fecha: "Lunes 6, 9:30 AM", entrevistador: "Diana L. (I.seg)", icon: MapPin, color: "bg-emerald-50 text-emerald-600 border border-emerald-100" }
];

const ESTADO_STYLES = {
    Enviado: "text-[#123498] bg-blue-50 border border-blue-100",
    Revisado: "text-purple-600 bg-purple-50 border border-purple-100",
    Entrevista: "text-amber-600 bg-amber-50 border border-amber-100",
    Aprobado: "text-green-600 bg-green-50 border border-green-100",
    Rechazado: "text-red-600 bg-red-50 border border-red-100"
};

const FALLBACK_OFFERS = [
    { id: "of-1", cargo: "Desarrollador Frontend React", empresaNombre: "JB Tecnologías" },
    { id: "of-2", cargo: "Diseñador UX/UI Senior", empresaNombre: "Creativa Studio" },
    { id: "of-3", cargo: "Analista de Datos", empresaNombre: "DataCorp" },
    { id: "of-4", cargo: "Ingeniero DevOps", empresaNombre: "CloudNet SAS" },
    { id: "of-5", cargo: "Gerente de Proyectos", empresaNombre: "JB Tecnologías" }
];

const FALLBACK_CANDIDATES = [
    { id: "cand-1", candidato: "Lucía Gómez Rivas", correo: "lucia@email.com", telefono: "+51 987 654 321", ofertaId: "of-1", fecha: "02/07/2025", estado: "Enviado", presentacion: "Soy desarrolladora frontend con más de 4 años de experiencia.", respuestas: { "¿Tiene experiencia con React?": "Sí, más de 4 años." } },
    { id: "cand-2", candidato: "Sofía Castro Mendoza", correo: "sofia@email.com", telefono: "+51 956 123 456", ofertaId: "of-1", fecha: "01/07/2025", estado: "Revisado", presentacion: "Ingeniera de sistemas con especialización en desarrollo web.", respuestas: { "¿Tiene experiencia con React?": "Sí, 2 años." } },
    { id: "cand-3", candidato: "Carlos Mendoza Torres", correo: "carlos@email.com", telefono: "+51 912 345 678", ofertaId: "of-2", fecha: "30/06/2025", estado: "Entrevista", presentacion: "Diseñador UX/UI con portafolio demostrable en Figma.", respuestas: { "¿Maneja Figma?": "Sí, 3 años." } },
    { id: "cand-4", candidato: "María Fernanda López", correo: "maria@email.com", telefono: "+51 934 567 890", ofertaId: "of-2", fecha: "29/06/2025", estado: "Aprobado", presentacion: "Diseñadora con master en experiencia de usuario.", respuestas: {} },
    { id: "cand-5", candidato: "Andrés Ruiz Paredes", correo: "andres@email.com", telefono: "+51 945 678 901", ofertaId: "of-3", fecha: "28/06/2025", estado: "Rechazado", presentacion: "Estadístico con conocimientos en Python y SQL.", respuestas: {} },
    { id: "cand-6", candidato: "Diego Alejandro Flores", correo: "diego@email.com", telefono: "+51 956 789 012", ofertaId: "of-4", fecha: "27/06/2025", estado: "Enviado", presentacion: "", respuestas: {} }
];

const PRESET_COLORS = ['#123498', '#F46F0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];

let _memCandidates = null;
let _memOffers = null;

const safeGetCandidates = () => {
    try {
        const r = getCandidates();
        if (Array.isArray(r) && r.length > 0) { _memCandidates = r; return r; }
    } catch (e) { }
    if (!_memCandidates) _memCandidates = JSON.parse(JSON.stringify(FALLBACK_CANDIDATES));
    return _memCandidates;
};

const safeGetOffers = () => {
    try {
        const r = getOffers();
        if (Array.isArray(r) && r.length > 0) { _memOffers = r; return r; }
    } catch (e) { }
    if (!_memOffers) _memOffers = JSON.parse(JSON.stringify(FALLBACK_OFFERS));
    return _memOffers;
};

const safeUpdateStage = (id, stage) => {
    try { updateCandidateStage(id, stage); } catch (e) {
        if (_memCandidates) {
            const t = _memCandidates.find(c => c.id === id);
            if (t) t.estado = stage;
        }
    }
};

const getOfferDetail = (offers, ofertaId) => {
    const off = offers.find(o => o.id === ofertaId);
    return off ? { cargo: off.cargo, empresa: off.empresaNombre } : { cargo: "Eliminada", empresa: "N/A" };
};

// ═══════════════════════════════════════════════════════════
// SECCIÓN: DASHBOARD
// ═══════════════════════════════════════════════════════════
function SectionDashboard({ onNavigate }) {
    const [summary, setSummary] = useState(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        try { setSummary(getStatsSummary()); } catch (e) { setSummary(null); }
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!summary) {
        return <div className="flex items-center justify-center h-64 text-slate-400 font-bold">Cargando...</div>;
    }

    const stats = [
        { label: "Postulantes hoy", value: summary.todayCount, delta: "12%", accent: "#123498" },
        { label: "Ofertas activas", value: summary.activeOffersCount, delta: "3%", accent: "#F46F0B" },
        { label: "Empresas registradas", value: summary.companiesCount, accent: "#3B5BDB" },
        { label: "Tasa de aprobación", value: `${summary.approvalRate}%`, delta: "2%", accent: "#16A34A" }
    ];

    const formatDay = (d) => {
        const days = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
        const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        return `${days[d.getDay()]}, ${d.getDate()} DE ${months[d.getMonth()]}`;
    };

    const formatTime = (d) => {
        let h = d.getHours();
        let m = d.getMinutes();
        const a = h >= 12 ? 'p. m.' : 'a. m.';
        h = h % 12 || 12;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m} ${a}`;
    };

    return (
        <div className="space-y-6">
            {/* Saludo */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 border-l-[#F46F0B]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-2xs shrink-0">
                        <UserCheck size={22} className="text-[#123498]" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">Buenos días,</h1>
                        <p className="text-xl font-black text-[#123498] mt-1.5">Rodrigo Mendoza <span className="text-base">👋</span></p>
                        <p className="text-[9px] font-black text-[#F46F0B] uppercase tracking-wider mt-1">💻 Administrador de Sistemas</p>
                    </div>
                </div>
                <div className="text-right sm:border-l border-slate-100 sm:pl-6 leading-tight shrink-0">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatDay(time)}</div>
                    <div className="text-xl font-black text-[#123498] mt-1">{formatTime(time)}</div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Fila media */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">Embudo de Reclutamiento</h2>
                    <p className="text-[10px] text-slate-400 font-semibold mb-4">Estado de todos los postulantes activos</p>
                    <div className="space-y-4">
                        {summary.funnelStages?.map((stage) => (
                            <div key={stage.label}>
                                <div className="flex items-baseline justify-between mb-1.5">
                                    <span className="text-xs font-bold text-[#1A1A1A]">
                                        {stage.label === "Enviado" ? "CV Recibido" : stage.label === "Revisado" ? "CV Revisado" : stage.label}
                                    </span>
                                    <span className="text-xs font-black text-slate-500">{stage.count}</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500" style={{ width: stage.width, backgroundColor: stage.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">Actividad Reciente</h2>
                    <p className="text-[10px] text-slate-400 font-semibold mb-4">Últimas postulaciones</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="pb-3 font-black">Candidato</th>
                                    <th className="pb-3 font-black">Oferta</th>
                                    <th className="pb-3 font-black">Empresa</th>
                                    <th className="pb-3 font-black text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.recentActivity?.length === 0 ? (
                                    <tr><td colSpan="4" className="py-6 text-center text-slate-400 italic">Sin actividad.</td></tr>
                                ) : (
                                    summary.recentActivity?.map((row, i) => (
                                        <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                                            <td className="py-3 font-bold text-[#1A1A1A]">{row.candidato}</td>
                                            <td className="py-3 text-slate-500">{row.oferta}</td>
                                            <td className="py-3 text-slate-400 font-bold">{row.empresa}</td>
                                            <td className="py-3 text-right">
                                                <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${ESTADO_STYLES[row.estado] || "text-slate-500 bg-slate-50"}`}>
                                                    {row.estado === "Enviado" ? "Recibido" : row.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Fila inferior */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">Próximas Entrevistas</h2>
                            <p className="text-[10px] text-slate-400 font-semibold">Evaluaciones en agenda</p>
                        </div>
                        <Calendar size={15} className="text-slate-400" />
                    </div>
                    <div className="space-y-3">
                        {UPCOMING_INTERVIEWS.map((interview, index) => {
                            const Icon = interview.icon;
                            return (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg shrink-0 ${interview.color}`}><Icon size={14} /></div>
                                        <div>
                                            <div className="font-extrabold text-xs text-[#1A1A1A]">{interview.candidato}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Cargo: {interview.puesto}</div>
                                            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-bold">
                                                <span>Entrevistador:</span>
                                                <span className="text-[#123498]">{interview.entrevistador}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-center">
                                        <Clock size={11} className="text-[#F46F0B]" />
                                        <span className="text-[10px] text-slate-700 font-black uppercase tracking-wider">{interview.fecha}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                        <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">Accesos Rápidos</h2>
                        <p className="text-[10px] text-slate-400 font-semibold mb-4">Administración del portal</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => onNavigate("ofertas")} className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-[#F46F0B]/5 hover:border-[#F46F0B]/30 group transition-all text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#F46F0B]/10 rounded-lg group-hover:bg-[#F46F0B]/20 text-[#F46F0B] transition-colors shrink-0"><PlusCircle size={14} /></div>
                                <div><div className="text-xs font-black text-slate-700">Crear Convocatoria</div><div className="text-[9px] text-slate-400 font-semibold mt-0.5">Añade una vacante al buscador</div></div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-[#F46F0B] transition-all" />
                        </button>
                        <button onClick={() => onNavigate("empresas")} className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-[#123498]/5 hover:border-[#123498]/30 group transition-all text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#123498]/10 rounded-lg group-hover:bg-[#123498]/20 text-[#123498] transition-colors shrink-0"><Building2 size={14} /></div>
                                <div><div className="text-xs font-black text-slate-700">Registrar Cliente</div><div className="text-[9px] text-slate-400 font-semibold mt-0.5">Inserta una nueva empresa</div></div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-[#123498] transition-all" />
                        </button>
                        <button onClick={() => onNavigate("postulantes")} className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-purple-50 hover:border-purple-200 group transition-all text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 text-purple-600 transition-colors shrink-0"><Users size={14} /></div>
                                <div><div className="text-xs font-black text-slate-700">Ver Postulantes</div><div className="text-[9px] text-slate-400 font-semibold mt-0.5">Revisa candidatos y expedientes</div></div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-purple-600 transition-all" />
                        </button>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-[9px] text-slate-400 font-bold italic">
                        <Sparkles size={11} className="text-[#F46F0B]" />
                        <span>JB Consultores en línea</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// SECCIÓN: EMPRESAS
// ═══════════════════════════════════════════════════════════
function SectionEmpresas() {
    const [companies, setCompanies] = useState([]);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [formNombre, setFormNombre] = useState("");
    const [formSector, setFormSector] = useState("");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formColor, setFormColor] = useState("#123498");

    useEffect(() => {
        try {
            setCompanies(getCompanies());
            setOffers(getOffers());
        } catch (e) {
            setOffers(safeGetOffers());
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formNombre || !formSector) return;
        try {
            saveCompany({
                nombre: formNombre,
                sector: formSector,
                descripcion: formDescripcion,
                logoColor: formColor,
                ...(editingCompany ? { id: editingCompany.id } : {})
            });
        } catch (e) { }
        try {
            setCompanies(getCompanies());
            setOffers(getOffers());
        } catch (e) {
            setOffers(safeGetOffers());
        }
        setModalOpen(false);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`¿Eliminar la empresa "${name}"?`)) {
            try { deleteCompany(id); } catch (e) { }
            try {
                setCompanies(getCompanies());
                setOffers(getOffers());
            } catch (e) {
                setOffers(safeGetOffers());
            }
        }
    };

    const filteredCompanies = companies.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getOffersCount = (compId) => offers.filter(o => o.empresaId === compId && o.estado === 'Activa').length;

    return (
        <div className="space-y-6 animate-fade-slide">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Gestión de Empresas</h1>
                    <p className="text-sm text-slate-400">Administra las empresas clientes</p>
                </div>
                <button
                    onClick={() => {
                        setEditingCompany(null);
                        setFormNombre("");
                        setFormSector("");
                        setFormDescripcion("");
                        setFormColor("#123498");
                        setModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0"
                >
                    <Plus size={14} strokeWidth={2.8} />Registrar Empresa
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs flex items-center justify-between gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar empresa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] placeholder:text-slate-400"
                    />
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
                    {filteredCompanies.length} de {companies.length}
                </div>
            </div>

            {filteredCompanies.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-3xs">
                    <Building2 className="mx-auto text-slate-300 mb-3" size={40} />
                    <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">Sin resultados</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredCompanies.map((comp) => (
                        <div
                            key={comp.id}
                            className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs hover:shadow-xs transition-shadow flex flex-col justify-between group"
                            style={{ borderLeftWidth: '4px', borderLeftColor: comp.logoColor || '#123498' }}
                        >
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-3xs shrink-0"
                                        style={{ backgroundColor: comp.logoColor || '#123498' }}
                                    >
                                        {comp.nombre.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span className="text-[9px] font-black text-[#123498] bg-[#123498]/5 border border-[#123498]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                                        {comp.sector}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black text-[#1A1A1A] group-hover:text-[#123498] transition-colors uppercase tracking-wide">
                                    {comp.nombre}
                                </h3>
                                <p className="text-xs text-slate-400 font-semibold mt-2.5 line-clamp-3">
                                    {comp.descripcion || "Sin descripción."}
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    <Briefcase size={13} />
                                    <span>{getOffersCount(comp.id)} vacantes</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => {
                                            setEditingCompany(comp);
                                            setFormNombre(comp.nombre);
                                            setFormSector(comp.sector);
                                            setFormDescripcion(comp.descripcion);
                                            setFormColor(comp.logoColor || "#123498");
                                            setModalOpen(true);
                                        }}
                                        className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg transition-all"
                                        title="Editar"
                                    >
                                        <Edit3 size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comp.id, comp.nombre)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-scale-up">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <h2 className="text-xs font-black text-[#123498] uppercase tracking-widest flex items-center gap-2">
                                <Building2 size={14} className="text-[#F46F0B]" />
                                {editingCompany ? "Editar" : "Nueva"} Empresa
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nombre *</label>
                                <input type="text" required value={formNombre} onChange={(e) => setFormNombre(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Sector *</label>
                                <input type="text" required value={formSector} onChange={(e) => setFormSector(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Descripción</label>
                                <textarea rows="3" value={formDescripcion} onChange={(e) => setFormDescripcion(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50 resize-none" />
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {PRESET_COLORS.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormColor(c)}
                                            className={`w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-transform ${formColor === c ? 'scale-110 ring-2 ring-[#123498]/30 ring-offset-1' : ''}`}
                                            style={{ backgroundColor: c }}
                                        >
                                            {formColor === c && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-black text-slate-500 uppercase tracking-wider transition-colors">Cancelar</button>
                                <button type="submit" className="px-5 py-2.5 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all">{editingCompany ? "Guardar" : "Crear"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// SECCIÓN: OFERTAS
// ═══════════════════════════════════════════════════════════
function SectionOfertas() {
    const [offers, setOffers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [form, setForm] = useState({
        cargo: "", empresaId: "", ubicacion: "", salario: "",
        tipo_contrato: "Tiempo completo", modalidad: "Presencial",
        descripcion: "", requisitos: "", preguntas: []
    });

    useEffect(() => {
        try {
            setOffers(getOffers());
            setCompanies(getCompanies());
        } catch (e) {
            setOffers(safeGetOffers());
            setCompanies([]);
        }
    }, []);

    const resetForm = () => setForm({
        cargo: "", empresaId: companies[0]?.id || "", ubicacion: "", salario: "",
        tipo_contrato: "Tiempo completo", modalidad: "Presencial",
        descripcion: "", requisitos: "", preguntas: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.cargo || !form.empresaId) return;
        const cleanPreguntas = form.preguntas.filter(q => q.trim() !== "");
        try {
            saveOffer({
                ...form,
                preguntas: cleanPreguntas,
                ...(editingOffer ? { id: editingOffer.id, estado: editingOffer.estado } : { estado: 'Activa' })
            });
        } catch (e) { }
        try { setOffers(getOffers()); } catch (e) { setOffers(safeGetOffers()); }
        setModalOpen(false);
    };

    const handleDelete = (id, cargo) => {
        if (window.confirm(`¿Eliminar "${cargo}"?`)) {
            try { deleteOffer(id); } catch (e) { }
            try { setOffers(getOffers()); } catch (e) { setOffers(safeGetOffers()); }
        }
    };

    const handleToggle = (id) => {
        try { toggleOfferStatus(id); } catch (e) { }
        try { setOffers(getOffers()); } catch (e) { setOffers(safeGetOffers()); }
    };

    const filteredOffers = offers.filter(o => {
        const matchSearch = o.cargo.toLowerCase().includes(searchTerm.toLowerCase()) || o.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCompany = filterCompany ? o.empresaId === filterCompany : true;
        const matchStatus = filterStatus ? o.estado === filterStatus : true;
        return matchSearch && matchCompany && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fade-slide">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Gestión de Ofertas</h1>
                    <p className="text-sm text-slate-400">Crea, edita, pausa o elimina convocatorias</p>
                </div>
                <button
                    onClick={() => { setEditingOffer(null); resetForm(); setModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0"
                >
                    <Plus size={14} strokeWidth={2.8} />Crear Vacante
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Buscar por puesto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] placeholder:text-slate-400" />
                </div>
                <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="">Todas las empresas</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="">Todos los estados</option>
                    <option value="Activa">Activa</option>
                    <option value="Pausada">Pausada</option>
                </select>
                <div className="flex items-center justify-end text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">Total: {filteredOffers.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
                {filteredOffers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Briefcase className="mx-auto text-slate-300 mb-3" size={40} />
                        <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">Sin vacantes</h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#F7F8FA] text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-black">Puesto</th>
                                    <th className="px-6 py-4 font-black">Detalles</th>
                                    <th className="px-6 py-4 font-black">Salario</th>
                                    <th className="px-6 py-4 font-black text-center">Filtros</th>
                                    <th className="px-6 py-4 font-black">Estado</th>
                                    <th className="px-6 py-4 font-black text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOffers.map((off) => (
                                    <tr key={off.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-extrabold text-slate-700 text-sm">{off.cargo}</div>
                                            <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1 uppercase">
                                                <Building2 size={12} /><span>{off.empresaNombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-slate-500 font-extrabold uppercase">{off.tipo_contrato}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-1">
                                                <MapPin size={11} /><span>{off.ubicacion} ({off.modalidad})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-extrabold text-xs">{off.salario || "No espec."}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${off.preguntas?.length > 0 ? 'bg-blue-50 text-[#123498] border border-blue-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                                <HelpCircle size={11} />{off.preguntas?.length || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${off.estado === 'Activa' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                                {off.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => handleToggle(off.id)} className="p-2 text-slate-400 hover:text-[#123498] rounded-lg transition-colors" title={off.estado === 'Activa' ? 'Pausar' : 'Activar'}>
                                                    {off.estado === 'Activa' ? <ToggleRight size={22} className="text-green-500" /> : <ToggleLeft size={22} className="text-slate-300" />}
                                                </button>
                                                <button onClick={() => { setEditingOffer(off); setForm({ cargo: off.cargo, empresaId: off.empresaId, ubicacion: off.ubicacion, salario: off.salario, tipo_contrato: off.tipo_contrato, modalidad: off.modalidad, descripcion: off.descripcion, requisitos: off.requisitos, preguntas: [...(off.preguntas || [])] }); setModalOpen(true); }} className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg transition-all" title="Editar"><Edit3 size={13} /></button>
                                                <button onClick={() => handleDelete(off.id, off.cargo)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Eliminar"><Trash2 size={13} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl shadow-2xl my-8 overflow-hidden animate-scale-up">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <h2 className="text-xs font-black text-[#123498] uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={14} className="text-[#F46F0B]" />{editingOffer ? "Editar" : "Crear"} Convocatoria
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><X size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cargo *</label><input type="text" required value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" /></div>
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Empresa *</label><select value={form.empresaId} onChange={(e) => setForm({ ...form, empresaId: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50">{companies.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Modalidad</label><select value={form.modalidad} onChange={(e) => setForm({ ...form, modalidad: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50"><option value="Presencial">Presencial</option><option value="Remoto">Remoto</option><option value="Híbrida">Híbrida</option></select></div>
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Contrato</label><select value={form.tipo_contrato} onChange={(e) => setForm({ ...form, tipo_contrato: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50"><option value="Tiempo completo">Tiempo completo</option><option value="Medio tiempo">Medio tiempo</option><option value="Prácticas">Prácticas</option><option value="Temporal">Temporal</option></select></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Salario</label><input type="text" value={form.salario} onChange={(e) => setForm({ ...form, salario: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" /></div>
                                <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ubicación</label><input type="text" value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" /></div>
                            </div>
                            <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Descripción *</label><textarea required rows="3" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50 resize-none" /></div>
                            <div><label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Requisitos *</label><textarea required rows="2" value={form.requisitos} onChange={(e) => setForm({ ...form, requisitos: e.target.value })} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50 resize-none" /></div>
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest">Preguntas de Pre-filtrado</h3>
                                    <button type="button" onClick={() => setForm({ ...form, preguntas: [...form.preguntas, ""] })} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#123498]/20 hover:bg-[#123498]/5 text-[#123498] rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors"><Plus size={12} />Agregar</button>
                                </div>
                                {form.preguntas.length === 0 ? (
                                    <div className="bg-[#F7F8FA] border border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 text-xs font-semibold">Sin preguntas.</div>
                                ) : (
                                    <div className="space-y-2">
                                        {form.preguntas.map((q, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-400 w-5 shrink-0 text-right">#{idx + 1}</span>
                                                <input type="text" value={q} onChange={(e) => { const u = [...form.preguntas]; u[idx] = e.target.value; setForm({ ...form, preguntas: u }); }} className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-slate-50" />
                                                <button type="button" onClick={() => setForm({ ...form, preguntas: form.preguntas.filter((_, i) => i !== idx) })} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"><Trash2 size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-black text-slate-500 uppercase tracking-wider transition-colors">Cancelar</button>
                                <button type="submit" className="px-5 py-2.5 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all">{editingOffer ? "Guardar" : "Crear"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// SECCIÓN: POSTULANTES
// ═══════════════════════════════════════════════════════════
function SectionPostulantes() {
    const [candidates, setCandidates] = useState([]);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOffer, setFilterOffer] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [activeCandidate, setActiveCandidate] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCandidates(safeGetCandidates());
            setOffers(safeGetOffers());
            setLoading(false);
        }, 150);
    }, []);

    const handleUpdateStage = (id, newStage) => {
        safeUpdateStage(id, newStage);
        setCandidates(safeGetCandidates());
        if (activeCandidate?.id === id) {
            setActiveCandidate(safeGetCandidates().find(c => c.id === id));
        }
    };

    const handleDownloadCV = (cand) => {
        setDownloadingId(cand.id);
        setTimeout(() => {
            setDownloadingId(null);
            alert(`📥 Descargando CV de ${cand.candidato}...`);
        }, 1200);
    };

    const filteredCandidates = candidates.filter(cand => {
        const matchSearch = (cand.candidato || "").toLowerCase().includes(searchTerm.toLowerCase()) || (cand.correo || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchOffer = filterOffer ? cand.ofertaId === filterOffer : true;
        const matchStatus = filterStatus ? (filterStatus === "Pendiente" ? (cand.estado === "Enviado" || cand.estado === "Revisado") : cand.estado === filterStatus) : true;
        return matchSearch && matchOffer && matchStatus;
    });

    const totalCount = filteredCandidates.length;
    const pendingCount = filteredCandidates.filter(c => c.estado === "Enviado" || c.estado === "Revisado").length;
    const interviewCount = filteredCandidates.filter(c => c.estado === "Entrevista").length;
    const approvedCount = filteredCandidates.filter(c => c.estado === "Aprobado").length;
    const rejectedCount = filteredCandidates.filter(c => c.estado === "Rechazado").length;

    if (loading) {
        return (
            <div className="space-y-6">
                <div><h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Registro de Postulantes</h1><p className="text-sm text-slate-400">Base de datos de candidatos</p></div>
                <div className="bg-white p-12 rounded-2xl border border-slate-200/60 shadow-3xs flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-3 border-[#123498]/20 border-t-[#123498] rounded-full animate-spin" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-slide">
            <div>
                <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Registro de Postulantes</h1>
                <p className="text-sm text-slate-400">Base de datos centralizada de candidatos</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center"><div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total</div><div className="text-lg font-black text-[#123498] mt-1">{totalCount}</div></div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 text-center"><div className="text-[9px] font-black text-amber-500 uppercase tracking-wider">Pendientes</div><div className="text-lg font-black text-amber-600 mt-1">{pendingCount}</div></div>
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/60 text-center"><div className="text-[9px] font-black text-purple-500 uppercase tracking-wider">Entrevistas</div><div className="text-lg font-black text-purple-600 mt-1">{interviewCount}</div></div>
                <div className="p-3 bg-green-50/50 rounded-xl border border-green-100/60 text-center"><div className="text-[9px] font-black text-green-500 uppercase tracking-wider">Aprobados</div><div className="text-lg font-black text-green-600 mt-1">{approvedCount}</div></div>
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100/60 text-center"><div className="text-[9px] font-black text-red-500 uppercase tracking-wider">Rechazados</div><div className="text-lg font-black text-red-600 mt-1">{rejectedCount}</div></div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Buscar postulante..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] placeholder:text-slate-400" />
                </div>
                <select value={filterOffer} onChange={(e) => setFilterOffer(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="">Todas las vacantes</option>
                    {offers.map(o => <option key={o.id} value={o.id}>{o.cargo} ({o.empresaNombre})</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Entrevista">Entrevista</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
                {filteredCandidates.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="mx-auto text-slate-300 mb-3" size={40} />
                        <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">Sin candidatos</h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#F7F8FA] text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-black">Candidato</th>
                                    <th className="px-6 py-4 font-black">Postulación</th>
                                    <th className="px-6 py-4 font-black">Fecha</th>
                                    <th className="px-6 py-4 font-black text-center">Filtros</th>
                                    <th className="px-6 py-4 font-black">Estado</th>
                                    <th className="px-6 py-4 font-black text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCandidates.map((cand) => {
                                    const details = getOfferDetail(offers, cand.ofertaId);
                                    const hasAnswers = cand.respuestas && Object.keys(cand.respuestas).length > 0;
                                    let stateLabel = cand.estado;
                                    let stateStyle = "bg-slate-50 text-slate-500 border border-slate-100";
                                    if (cand.estado === "Enviado" || cand.estado === "Revisado") { stateLabel = "Pendiente"; stateStyle = "bg-amber-50 text-amber-700 border border-amber-100"; }
                                    else if (cand.estado === "Entrevista") stateStyle = "bg-purple-50 text-purple-700 border border-purple-100";
                                    else if (cand.estado === "Aprobado") stateStyle = "bg-green-50 text-green-700 border border-green-100";
                                    else if (cand.estado === "Rechazado") stateStyle = "bg-red-50 text-red-700 border border-red-100";

                                    return (
                                        <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center text-[10px] font-black shrink-0 border border-[#123498]/10">{cand.candidato.substring(0, 2).toUpperCase()}</div>
                                                    <div>
                                                        <div className="font-extrabold text-slate-700 text-xs uppercase tracking-wide">{cand.candidato}</div>
                                                        <div className="text-[10px] text-slate-400 font-semibold">{cand.correo}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-extrabold text-slate-600 text-xs">{details.cargo}</div>
                                                <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-0.5 uppercase"><Building2 size={11} /><span>{details.empresa}</span></div>
                                            </td>
                                            <td className="px-6 py-4"><div className="text-slate-600 font-bold flex items-center gap-1"><Calendar size={12} className="text-slate-400" /><span>{cand.fecha}</span></div></td>
                                            <td className="px-6 py-4 text-center">
                                                {hasAnswers ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-50 text-[#123498] border border-blue-100"><HelpCircle size={10} />Sí</span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 border border-slate-100">No</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${stateStyle}`}>{stateLabel}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button onClick={() => setActiveCandidate(cand)} className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg transition-all" title="Ver"><Eye size={13} /></button>
                                                    {cand.estado !== "Aprobado" && <button onClick={() => handleUpdateStage(cand.id, "Aprobado")} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Aprobar"><Check size={13} strokeWidth={3} /></button>}
                                                    {cand.estado !== "Rechazado" && <button onClick={() => handleUpdateStage(cand.id, "Rechazado")} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Rechazar"><X size={13} strokeWidth={3} /></button>}
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

            {activeCandidate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in" onClick={(e) => e.target === e.currentTarget && setActiveCandidate(null)}>
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-xl shadow-2xl overflow-hidden animate-scale-up my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center text-sm font-black shadow-3xs border border-[#123498]/10 shrink-0">{activeCandidate.candidato.substring(0, 2).toUpperCase()}</div>
                                <div><h2 className="text-sm font-black text-slate-700 uppercase tracking-wide">Expediente de {activeCandidate.candidato}</h2><p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{getOfferDetail(offers, activeCandidate.ofertaId).cargo}</p></div>
                            </div>
                            <button onClick={() => setActiveCandidate(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><X size={16} /></button>
                        </div>
                        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                                <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /><div className="min-w-0"><div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Correo</div><div className="text-slate-700 font-bold truncate">{activeCandidate.correo}</div></div></div>
                                <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /><div><div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Teléfono</div><div className="text-slate-700 font-bold">{activeCandidate.telefono}</div></div></div>
                                <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-400" /><div><div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Postulado</div><div className="text-slate-700 font-bold">{activeCandidate.fecha}</div></div></div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-[#123498]/10 bg-[#123498]/5">
                                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0 shadow-3xs"><FileText size={20} /></div><div><div className="font-black text-slate-700">Currículum Vitae.pdf</div><div className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">Archivo digital</div></div></div>
                                <button onClick={() => handleDownloadCV(activeCandidate)} disabled={downloadingId !== null} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#123498] hover:bg-[#096ACC] disabled:bg-slate-400 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0"><Download size={12} /><span>{downloadingId === activeCandidate.id ? "Descargando..." : "Descargar CV"}</span></button>
                            </div>
                            <div><h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1.5">Carta de Presentación</h3><p className="text-slate-500 bg-[#F7F8FA] p-3.5 rounded-xl border border-slate-200/60 leading-relaxed font-semibold italic">"{activeCandidate.presentacion || "Sin carta."}"</p></div>
                            <div>
                                <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-2 flex items-center gap-1.5"><HelpCircle size={13} className="text-[#F46F0B]" />Respuestas de Pre-filtrado</h3>
                                {!activeCandidate.respuestas || Object.keys(activeCandidate.respuestas).length === 0 ? (<p className="text-slate-400 font-bold bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 text-center uppercase tracking-wider">Sin preguntas.</p>) : (
                                    <div className="space-y-3">{Object.entries(activeCandidate.respuestas).map(([q, a], idx) => (<div key={idx} className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60"><div className="font-extrabold text-slate-700 flex items-start gap-1"><span className="text-[#F46F0B] font-black w-4">Q.</span><span>{q}</span></div><div className="mt-2 text-slate-500 font-semibold pl-4 flex items-start gap-1"><span className="text-green-600 font-black w-4">A.</span><span>{a}</span></div></div>))}</div>
                                )}
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Etapa: <span className="text-[#123498] font-black">{activeCandidate.estado}</span></div>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeCandidate.estado !== "Rechazado" && <button onClick={() => handleUpdateStage(activeCandidate.id, "Rechazado")} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"><XCircle size={13} />Rechazar</button>}
                                    {activeCandidate.estado !== "Aprobado" && <button onClick={() => handleUpdateStage(activeCandidate.id, "Aprobado")} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"><CheckCircle2 size={13} />Aprobar</button>}
                                    {(activeCandidate.estado === "Aprobado" || activeCandidate.estado === "Rechazado") && <button onClick={() => handleUpdateStage(activeCandidate.id, "Enviado")} className="flex items-center gap-1.5 px-4 py-2 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"><AlertCircle size={13} />Marcar Pendiente</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL: ADMIN
// ═══════════════════════════════════════════════════════════
const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Vista general" },
    { id: "empresas", label: "Empresas", icon: Building2, desc: "Empresas clientes" },
    { id: "ofertas", label: "Ofertas", icon: Briefcase, desc: "Convocatorias laborales" },
    { id: "postulantes", label: "Postulantes", icon: Users, desc: "Base de candidatos" }
];

const SECTIONS = {
    dashboard: SectionDashboard,
    empresas: SectionEmpresas,
    ofertas: SectionOfertas,
    postulantes: SectionPostulantes
};

export default function Admin() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const ActiveComponent = SECTIONS[activeSection];

    const handleNav = (id) => {
        setActiveSection(id);
        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col lg:flex-row">
            {/* Overlay móvil */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} shadow-xl lg:shadow-none`}>
                {/* Header Sidebar */}
                <div className="p-5 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <button onClick={() => navigate("/")} className="flex items-center gap-3 group" title="Ir al inicio">
                            <div className="w-10 h-10 rounded-xl bg-[#123498] flex items-center justify-center text-white font-black text-sm shadow-sm">JB</div>
                            <div className="text-left">
                                <h1 className="text-sm font-black text-[#123498] uppercase tracking-wide">Admin Panel</h1>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-[#F46F0B] transition-colors">
                                    <Home size={8} />Volver al sitio
                                </p>
                            </div>
                        </button>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 py-2">Módulos</p>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${isActive ? "bg-[#123498] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-[#123498]"}`}
                            >
                                <div className={`p-2 rounded-lg shrink-0 transition-colors ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-[#123498]/10"}`}>
                                    <Icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-black uppercase tracking-wide">{item.label}</div>
                                    <div className={`text-[9px] font-semibold mt-0.5 truncate ${isActive ? "text-white/70" : "text-slate-400"}`}>{item.desc}</div>
                                </div>
                                {isActive && <ChevronRight size={14} className="shrink-0 opacity-70" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer Sidebar */}
                <div className="p-3 border-t border-slate-100">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#F46F0B]/10 text-[#F46F0B] flex items-center justify-center text-xs font-black shrink-0 border border-[#F46F0B]/10">RM</div>
                            <div className="min-w-0">
                                <div className="text-[10px] font-black text-slate-700 truncate">Rodrigo Mendoza</div>
                                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Administrador</div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-slate-500 hover:text-[#F46F0B] hover:bg-[#F46F0B]/5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors border border-slate-200 hover:border-[#F46F0B]/30"
                    >
                        <Home size={14} />Volver al Inicio
                    </button>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 lg:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-500 hover:text-[#123498] hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wide">
                                {NAV_ITEMS.find(n => n.id === activeSection)?.label}
                            </h2>
                            <p className="text-[9px] text-slate-400 font-semibold hidden sm:block">
                                {NAV_ITEMS.find(n => n.id === activeSection)?.desc}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-[#123498] hover:bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors border border-slate-200 hover:border-[#123498]/30"
                        >
                            <Home size={13} />Inicio
                        </button>
                        <div className="hidden md:flex items-center gap-1.5">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`p-2 rounded-lg transition-all duration-200 ${isActive ? "bg-[#123498] text-white shadow-sm" : "text-slate-400 hover:text-[#123498] hover:bg-slate-100"}`}
                                        title={item.label}
                                    >
                                        <Icon size={16} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                {/* Contenido */}
                <div className="flex-1 p-4 lg:p-6">
                    {ActiveComponent ? (
                        <ActiveComponent onNavigate={handleNav} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-slate-400">
                            Sección no encontrada
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}