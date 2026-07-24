import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, Briefcase, Users, LogOut,
  ChevronRight, ChevronDown, ChevronUp, Menu, X, PlusCircle, ArrowRight,
  CheckCircle2, XCircle, Download, Mail, Phone,
  Eye, Check, FileText, HelpCircle, Edit3, Trash2, Search, ToggleLeft,
  ToggleRight, Plus, Sparkles, User, AlertCircle, Home, MessageCircle, Lock, Star, EyeOff
} from "lucide-react";
import StatCard from "../components/admin/StatCard";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import {
  getStatsSummary, getOffers,
  getCompanies, saveCompany, deleteCompany, saveOffer, deleteOffer, toggleOfferStatus, closeOffer,
  saveCategory, getQuestions, saveQuestion, deleteQuestionsByOffer,
  getPostulaciones, getPostulacionDetalle, changePostulacionEstado, savePostulacionNota
} from "../services/adminService";

import SectionEvaluaciones from "../components/admin/SectionEvaluaciones";
import SectionEmpresas from "../components/admin/SectionEmpresas";

const STAGES = ["recibido", "revisado", "entrevista", "aprobado", "rechazado"];

const STAGE_LABELS = {
  recibido: "Recibido", revisado: "Revisado", entrevista: "Entrevista",
  aprobado: "Aprobado", rechazado: "Rechazado"
};

const ESTADO_STYLES = {
  recibido: "text-[#123498] bg-blue-50 border border-blue-100",
  revisado: "text-purple-600 bg-purple-50 border border-purple-100",
  entrevista: "text-amber-600 bg-amber-50 border border-amber-100",
  aprobado: "text-green-600 bg-green-50 border border-green-100",
  rechazado: "text-red-600 bg-red-50 border border-red-100"
};

// ═══════════════════════════════════════════════════════════
// SECCIÓN: DASHBOARD
// ═══════════════════════════════════════════════════════════
function SectionDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const load = async () => {
      try { setSummary(await getStatsSummary()); } catch (e) { setSummary(null); }
    };
    load();
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

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nombre_completo || "Administrador";
  const userRole = user.rol_nombre || "Administrador";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getInitials = (name) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Saludo */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 border-l-[#F46F0B]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#123498]/15 text-[#123498] flex items-center justify-center text-sm font-black shrink-0 border border-[#123498]/10">
            {getInitials(userName)}
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">{getGreeting()},</h1>
            <p className="text-xl font-black text-[#123498] mt-1.5">{userName} <span className="text-base">👋</span></p>
            <p className="text-[9px] font-black text-[#F46F0B] uppercase tracking-wider mt-1">💻 {userRole}</p>
          </div>
        </div>
        <div className="text-right sm:border-l border-slate-100 sm:pl-6 leading-tight shrink-0">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatDay(time)}</div>
          <div className="text-xl font-black text-[#123498] mt-1">{formatTime(time)}</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Fila media */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
          <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">Embudo de Reclutamiento</h2>
          <p className="text-[10px] text-slate-400 font-semibold mb-4">Estado de todos los postulantes activos</p>
          <div className="space-y-4">
            {summary.funnelStages?.map(stage => (
              <div key={stage.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1A1A1A]">{stage.label}</span>
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
                          {STAGE_LABELS[row.estado] || row.estado}
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
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between">
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
// SECCIÓN: OFERTAS
// ═══════════════════════════════════════════════════════════
function SectionOfertas() {
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmpresa, setFilterEmpresa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titulo: "", empresa_id: "", ubicacion: "", salario_min: "", salario_max: "",
    tipo_contrato: "indefinido", modalidad: "presencial", nivel_experiencia: "",
    categoria_id: "", descripcion: "", requisitos: "",
    fecha_publicacion: "", fecha_expiracion: ""
  });
  const [preguntas, setPreguntas] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const reload = async () => {
    try { setOffers(await getOffers()); } catch (e) { setOffers([]); }
    try { setCompanies(await getCompanies()); } catch (e) { setCompanies([]); }
    try {
      const res = await import("../services/api").then(m => m.apiFetch("/admin/?resource=categorias&action=listar"));
      setCategories(res.data || []);
    } catch (e) { setCategories([]); }
  };

  useEffect(() => { reload(); }, []);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await saveCategory({ nombre: newCategoryName.trim() });
      const created = res.data;
      setCategories(prev => [...prev, created]);
      setForm(prev => ({ ...prev, categoria_id: created.id }));
      setNewCategoryName("");
      setShowNewCategory(false);
    } catch (err) {
      alert(err.message || "Error al crear categoría");
    }
  };

  const openNew = () => {
    setEditingOffer(null);
    setForm({
      titulo: "", empresa_id: companies[0]?.id || "", ubicacion: "", salario_min: "", salario_max: "",
      tipo_contrato: "indefinido", modalidad: "presencial", nivel_experiencia: "",
      categoria_id: "", descripcion: "", requisitos: "",
      fecha_publicacion: "", fecha_expiracion: ""
    });
    setPreguntas([]);
    setShowNewCategory(false);
    setNewCategoryName("");
    setModalOpen(true);
  };

  const openEdit = async (o) => {
    setEditingOffer(o);
    setForm({
      titulo: o.titulo || "",
      empresa_id: o.empresa_id || "",
      ubicacion: o.ubicacion || "",
      salario_min: o.salario_min || "",
      salario_max: o.salario_max || "",
      tipo_contrato: o.tipo_contrato || "indefinido",
      modalidad: o.modalidad || "presencial",
      nivel_experiencia: o.nivel_experiencia || "",
      categoria_id: o.categoria_id || "",
      descripcion: o.descripcion || "",
      requisitos: o.requisitos || "",
      fecha_publicacion: o.fecha_publicacion ? o.fecha_publicacion.slice(0, 16) : "",
      fecha_expiracion: o.fecha_expiracion ? o.fecha_expiracion.slice(0, 16) : ""
    });
    try {
      const qs = await getQuestions(o.id);
      setPreguntas(qs.map(q => ({ ...q, opciones: q.opciones ? (typeof q.opciones === 'string' ? JSON.parse(q.opciones) : q.opciones) : [] })));
    } catch (e) {
      setPreguntas([]);
    }
    setShowNewCategory(false);
    setNewCategoryName("");
    setModalOpen(true);
  };

  const addPregunta = () => {
    setPreguntas(prev => [...prev, { pregunta: "", tipo: "texto", obligatoria: 0, opciones: [], _new: true }]);
  };

  const updatePregunta = (index, field, value) => {
    setPreguntas(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const removePregunta = (index) => {
    setPreguntas(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.empresa_id) return;
    setLoading(true);
    try {
      const offerData = { ...form, ...(editingOffer ? { id: editingOffer.id } : {}) };
      const res = await saveOffer(offerData);
      const offerId = editingOffer ? editingOffer.id : res.data.id;

      if (editingOffer) {
        await deleteQuestionsByOffer(offerId);
      }
      for (const q of preguntas) {
        if (q.pregunta.trim()) {
          await saveQuestion({ oferta_id: offerId, pregunta: q.pregunta, tipo: q.tipo, obligatoria: q.obligatoria, opciones: q.tipo === 'opciones' ? q.opciones : null });
        }
      }

      await reload();
      setModalOpen(false);
    } catch (err) {
      alert(err.message || "Error al guardar oferta");
    }
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar la oferta "${name}"?`)) return;
    try {
      await deleteOffer(id);
      await reload();
    } catch (err) {
      alert(err.message || "Error al eliminar oferta");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleOfferStatus(id);
      await reload();
    } catch (err) {
      alert(err.message || "Error al cambiar estado");
    }
  };

  const handleCerrar = async (id, name) => {
    if (!window.confirm(`¿Cerrar la oferta "${name}"? Ya no será visible en las búsquedas.`)) return;
    try {
      await closeOffer(id);
      await reload();
    } catch (err) {
      alert(err.message || "Error al cerrar oferta");
    }
  };

  const isExpired = (o) => o.fecha_expiracion && new Date(o.fecha_expiracion) <= new Date();

  const filteredOffers = offers.filter(o =>
    (o.titulo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.empresa_nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(o => !filterEmpresa || o.empresa_nombre === filterEmpresa);

  const MAP_MODALIDAD = { presencial: "Presencial", remoto: "Remoto", híbrido: "Híbrido" };
  const MAP_CONTRATO = { indefinido: "Indefinido", temporal: "Temporal", freelance: "Freelance", prácticas: "Prácticas", por_horas: "Por horas" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Gestión de Ofertas</h1>
          <p className="text-sm text-slate-400">Administra las convocatorias laborales</p>
        </div>
        <button onClick={openNew} className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0">
          <Plus size={14} strokeWidth={2.8} />Nueva Oferta
        </button>
      </div>

      {/* Buscador y filtro */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar oferta..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400" />
        </div>
        <select value={filterEmpresa} onChange={e => setFilterEmpresa(e.target.value)} className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] font-semibold text-slate-600">
          <option value="">Todas las empresas</option>
          {companies.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
        </select>
      </div>

      {/* Tabla de ofertas */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 font-black">Título</th>
                <th className="px-5 py-3.5 font-black">Empresa</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black">Ubicación</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black">Modalidad</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black">Contrato</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black text-center">Estado</th>
                <th className="px-5 py-3.5 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map(o => {
                const isExpanded = expandedRowId === o.id;
                return (
                  <React.Fragment key={o.id}>
                    <tr
                      className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer lg:cursor-default"
                      onClick={() => setExpandedRowId(isExpanded ? null : o.id)}
                    >
                      <td className="px-5 py-3.5 font-bold text-[#1A1A1A]">
                        <span className="flex items-center gap-2">
                          <span className="lg:hidden text-slate-300 transition-transform duration-200">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                          {o.titulo}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{o.empresa_nombre}</td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-slate-400">{o.ubicacion || "—"}</td>
                      <td className="hidden lg:table-cell px-5 py-3.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{MAP_MODALIDAD[o.modalidad] || o.modalidad}</span>
                      </td>
                      <td className="hidden lg:table-cell px-5 py-3.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{MAP_CONTRATO[o.tipo_contrato] || o.tipo_contrato}</span>
                      </td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-center">
                        {o.estado === 'activa' && isExpired(o) ? (
                          <span className="inline-flex items-center gap-1.5" title="Oferta cerrada (expirada)">
                            <span className="text-[9px] font-black uppercase tracking-wider text-amber-600">Cerrada</span>
                          </span>
                        ) : (
                          <button onClick={(e) => { e.stopPropagation(); handleToggle(o.id); }} className="inline-flex items-center gap-1.5" title="Toggle estado">
                            {o.estado === 'activa' ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} className="text-slate-400" />}
                            <span className={`text-[9px] font-black uppercase tracking-wider ${o.estado === 'activa' ? 'text-green-600' : 'text-slate-400'}`}>{o.estado === 'activa' ? 'Activa' : 'Pausada'}</span>
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {!isExpired(o) && o.estado === 'activa' && (
                            <button onClick={() => handleCerrar(o.id, o.titulo)} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors" title="Cerrar oferta"><Lock size={13} /></button>
                          )}
                          <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#123498] transition-colors"><Edit3 size={13} /></button>
                          <button onClick={() => handleDelete(o.id, o.titulo)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="lg:hidden border-t border-slate-100 bg-slate-50/80">
                        <td colSpan="3" className="px-5 py-4">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Ubicación</span>
                              <p className="text-slate-600 font-semibold mt-0.5">{o.ubicacion || "—"}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Modalidad</span>
                              <p className="mt-0.5"><span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{MAP_MODALIDAD[o.modalidad] || o.modalidad}</span></p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Contrato</span>
                              <p className="mt-0.5"><span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{MAP_CONTRATO[o.tipo_contrato] || o.tipo_contrato}</span></p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Estado</span>
                              <p className="mt-0.5">
                                {o.estado === 'activa' && isExpired(o) ? (
                                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-600">Cerrada</span>
                                ) : (
                                  <button onClick={(e) => { e.stopPropagation(); handleToggle(o.id); }} className="inline-flex items-center gap-1.5" title="Toggle estado">
                                    {o.estado === 'activa' ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} className="text-slate-400" />}
                                    <span className={`text-[9px] font-black uppercase tracking-wider ${o.estado === 'activa' ? 'text-green-600' : 'text-slate-400'}`}>{o.estado === 'activa' ? 'Activa' : 'Pausada'}</span>
                                  </button>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {filteredOffers.length === 0 && (
                <tr><td colSpan="3" className="lg:col-span-7 py-12 text-center text-slate-400 text-sm">No se encontraron ofertas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-black text-[#123498] uppercase tracking-wider">{editingOffer ? "Editar Oferta" : "Nueva Oferta"}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Título del puesto</label>
                <input type="text" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Ej: Desarrollador Frontend" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Empresa</label>
                <select value={form.empresa_id} onChange={e => setForm({ ...form, empresa_id: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" required>
                  <option value="">Seleccionar empresa</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Ubicación</label>
                  <input type="text" value={form.ubicacion} onChange={e => setForm({ ...form, ubicacion: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Lima, Perú" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Categoría</label>
                  {showNewCategory ? (
                    <div className="flex gap-1.5">
                      <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleCreateCategory())} className="flex-1 min-w-0 px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Nombre de categoría" autoFocus />
                      <button type="button" onClick={handleCreateCategory} className="px-2.5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold shrink-0">✓</button>
                      <button type="button" onClick={() => { setShowNewCategory(false); setNewCategoryName(""); }} className="px-2.5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl text-xs font-bold shrink-0">✕</button>
                    </div>
                  ) : (
                    <div className="flex gap-1.5">
                      <select value={form.categoria_id} onChange={e => setForm({ ...form, categoria_id: e.target.value })} className="flex-1 min-w-0 px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                        <option value="">Sin categoría</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                      </select>
                      <button type="button" onClick={() => setShowNewCategory(true)} className="px-2.5 py-2.5 bg-[#123498] hover:bg-[#0f2b7a] text-white rounded-xl text-xs font-bold shrink-0" title="Nueva categoría">+</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Salario mínimo (S/)</label>
                  <input type="number" value={form.salario_min} onChange={e => setForm({ ...form, salario_min: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Ej: 2500" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Salario máximo (S/)</label>
                  <input type="number" value={form.salario_max} onChange={e => setForm({ ...form, salario_max: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Ej: 4500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Fecha de publicación</label>
                  <input
                    type="datetime-local"
                    value={form.fecha_publicacion}
                    onChange={e => setForm({ ...form, fecha_publicacion: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]"
                  />
                  <p className="text-[9px] text-slate-400 mt-1">Vacío = publicación inmediata</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Fecha de cierre</label>
                  <input
                    type="datetime-local"
                    value={form.fecha_expiracion}
                    onChange={e => setForm({ ...form, fecha_expiracion: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]"
                  />
                  <p className="text-[9px] text-slate-400 mt-1">Vacío = 90 días desde hoy</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Tipo contrato</label>
                  <select value={form.tipo_contrato} onChange={e => setForm({ ...form, tipo_contrato: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="indefinido">Indefinido</option>
                    <option value="temporal">Temporal</option>
                    <option value="freelance">Freelance</option>
                    <option value="prácticas">Prácticas</option>
                    <option value="por_horas">Por horas</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Modalidad</label>
                  <select value={form.modalidad} onChange={e => setForm({ ...form, modalidad: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="híbrido">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Experiencia</label>
                  <select value={form.nivel_experiencia} onChange={e => setForm({ ...form, nivel_experiencia: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option value="">No especificar</option>
                    <option value="junior">Junior</option>
                    <option value="semisenior">Semi-Senior</option>
                    <option value="senior">Senior</option>
                    <option value="gerente">Gerente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] resize-none" placeholder="Descripción del puesto..." />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Requisitos</label>
                <textarea value={form.requisitos} onChange={e => setForm({ ...form, requisitos: e.target.value })} rows={3} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] resize-none" placeholder="• Requisito 1&#10;• Requisito 2" />
              </div>

              {/* PREGUNTAS DE FILTRO */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Preguntas de filtro ({preguntas.length})</label>
                  <button type="button" onClick={addPregunta} className="flex items-center gap-1 px-2.5 py-1.5 bg-[#123498] hover:bg-[#0f2b7a] text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors">
                    <Plus size={11} strokeWidth={2.8} />Agregar Pregunta
                  </button>
                </div>
                {preguntas.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic">Sin preguntas. Haz clic en "Agregar Pregunta" para crear una.</p>
                )}
                <div className="space-y-3">
                  {preguntas.map((q, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-black text-slate-400 mt-2.5 w-4 shrink-0">{idx + 1}.</span>
                        <div className="flex-1 space-y-2">
                          <input type="text" value={q.pregunta} onChange={e => updatePregunta(idx, 'pregunta', e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] bg-white" placeholder="Escribe la pregunta..." />
                          <div className="flex items-center gap-2">
                            <select value={q.tipo} onChange={e => { updatePregunta(idx, 'tipo', e.target.value); if (e.target.value !== 'opciones') updatePregunta(idx, 'opciones', []); }} className="px-2 py-1.5 text-[10px] rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#123498]/10 bg-white">
                              <option value="texto">Texto libre</option>
                              <option value="numero">Número</option>
                              <option value="si_no">Sí / No</option>
                              <option value="opciones">Opciones</option>
                            </select>
                            <label className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold cursor-pointer select-none">
                              <input type="checkbox" checked={q.obligatoria === 1} onChange={e => updatePregunta(idx, 'obligatoria', e.target.checked ? 1 : 0)} className="w-3.5 h-3.5 rounded border-slate-300 text-[#123498] focus:ring-[#123498]/10" />
                              Obligatoria
                            </label>
                          </div>
                          {q.tipo === 'opciones' && (
                            <div className="space-y-1.5 pl-1">
                              {(q.opciones || []).map((opt, oi) => (
                                <div key={oi} className="flex items-center gap-1.5">
                                  <input type="text" value={opt} onChange={e => { const newOpts = [...q.opciones]; newOpts[oi] = e.target.value; updatePregunta(idx, 'opciones', newOpts); }} className="flex-1 px-2.5 py-1.5 text-[10px] rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#123498]/10 bg-white" placeholder={`Opción ${oi + 1}`} />
                                  <button type="button" onClick={() => { const newOpts = q.opciones.filter((_, i) => i !== oi); updatePregunta(idx, 'opciones', newOpts); }} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={10} /></button>
                                </div>
                              ))}
                              <button type="button" onClick={() => updatePregunta(idx, 'opciones', [...(q.opciones || []), ""])} className="text-[10px] font-bold text-[#123498] hover:text-[#0f2b7a] transition-colors">+ Agregar opción</button>
                            </div>
                          )}
                        </div>
                        <button type="button" onClick={() => removePregunta(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0 mt-0.5"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#123498] hover:bg-[#0f2b7a] disabled:opacity-50 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">
                {loading ? "Guardando..." : editingOffer ? "Guardar Cambios" : "Publicar Oferta"}
              </button>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [filterEmpresa, setFilterEmpresa] = useState("");
  const [filterOferta, setFilterOferta] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loadingNota, setLoadingNota] = useState(false);
  const [notaText, setNotaText] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const reload = async () => {
    try { setCandidates(await getPostulaciones()); } catch (e) { setCandidates([]); }
  };

  useEffect(() => { reload(); }, []);

  const empresas = [...new Map(candidates.map(c => [c.empresa_nombre, c.empresa_nombre])).values()].sort();
  const ofertasDisponibles = filterEmpresa
    ? [...new Map(candidates.filter(c => c.empresa_nombre === filterEmpresa).map(c => [c.oferta_id, { id: c.oferta_id, titulo: c.oferta_titulo }])).values()].sort((a, b) => a.titulo.localeCompare(b.titulo))
    : [];

  const handleStageChange = async (id, newStage) => {
    try {
      await changePostulacionEstado(id, newStage);
      await reload();
      if (selectedCandidate && selectedCandidate.id === id) {
        setSelectedCandidate(prev => ({ ...prev, estado: newStage }));
      }
    } catch (err) {
      alert(err.message || "Error al cambiar estado");
    }
  };

  const openDetail = async (c) => {
    try {
      const detalle = await getPostulacionDetalle(c.id);
      setSelectedCandidate(detalle);
      setNotaText(detalle.notas_internas || "");
    } catch (e) {
      setSelectedCandidate({ ...c, respuestas: [] });
      setNotaText(c.notas_internas || "");
    }
  };

  const handleSaveNota = async () => {
    if (!selectedCandidate) return;
    setLoadingNota(true);
    try {
      await savePostulacionNota(selectedCandidate.id, notaText);
      setSelectedCandidate(prev => ({ ...prev, notas_internas: notaText }));
    } catch (err) {
      alert(err.message || "Error al guardar nota");
    }
    setLoadingNota(false);
  };

  const filtered = candidates.filter(c => {
    const matchSearch = (c.candidato_nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.candidato_correo || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === "Todos" || c.estado === filterEstado;
    const matchEmpresa = !filterEmpresa || c.empresa_nombre === filterEmpresa;
    const matchOferta = !filterOferta || c.oferta_id == filterOferta;
    return matchSearch && matchEstado && matchEmpresa && matchOferta;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Gestión de Postulantes</h1>
          <p className="text-sm text-slate-400">Revisa y administra candidatos</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500">
          <Users size={14} className="text-[#123498]" />
          <span>{candidates.length} postulantes registrados</span>
        </div>
      </div>

      {/* Filtros superiores */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar candidato..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400" />
        </div>
        <select value={filterEmpresa} onChange={e => { setFilterEmpresa(e.target.value); setFilterOferta(""); }} className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
          <option value="">Todas las empresas</option>
          {empresas.map(emp => <option key={emp} value={emp}>{emp}</option>)}
        </select>
        {filterEmpresa && (
          <select value={filterOferta} onChange={e => setFilterOferta(e.target.value)} className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
            <option value="">Todas las ofertas</option>
            {ofertasDisponibles.map(o => <option key={o.id} value={o.id}>{o.titulo}</option>)}
          </select>
        )}
        <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)} className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
          <option value="Todos">Todos los estados</option>
          {STAGES.map(st => <option key={st} value={st}>{STAGE_LABELS[st]}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 font-black">Candidato</th>
                <th className="px-5 py-3.5 font-black">Oferta</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black">Empresa</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black">Fecha</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black text-center">Estado</th>
                <th className="hidden lg:table-cell px-5 py-3.5 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const isExpanded = expandedRowId === c.id;
                return (
                  <React.Fragment key={c.id}>
                    <tr
                      className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer lg:cursor-default"
                      onClick={() => setExpandedRowId(isExpanded ? null : c.id)}
                    >
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-2">
                          <span className="lg:hidden text-slate-300 transition-transform duration-200">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                          <span>
                            <div className="font-bold text-[#1A1A1A]">{c.candidato_nombre}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{c.candidato_correo}</div>
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{c.oferta_titulo}</td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-slate-400 font-bold">{c.empresa_nombre}</td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-slate-400">{c.fecha_postulacion ? new Date(c.fecha_postulacion).toLocaleDateString() : "—"}</td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-center">
                        <select value={c.estado} onChange={(e) => { e.stopPropagation(); handleStageChange(c.id, e.target.value); }} onClick={(e) => e.stopPropagation()} className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border-0 cursor-pointer focus:outline-none ${ESTADO_STYLES[c.estado] || "text-slate-500 bg-slate-50"}`}>
                          {STAGES.map(st => <option key={st} value={st}>{STAGE_LABELS[st]}</option>)}
                        </select>
                      </td>
                      <td className="hidden lg:table-cell px-5 py-3.5 text-right">
                        <button onClick={(e) => { e.stopPropagation(); openDetail(c); }} className="p-1.5 rounded-lg hover:bg-[#123498]/5 text-slate-400 hover:text-[#123498] transition-colors" title="Ver detalle">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="lg:hidden border-t border-slate-100 bg-slate-50/80">
                        <td colSpan="2" className="px-5 py-4">
                          <div className="space-y-3 text-xs">
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Empresa</span>
                              <p className="text-slate-600 font-bold mt-0.5">{c.empresa_nombre}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Fecha</span>
                              <p className="text-slate-600 font-semibold mt-0.5">{c.fecha_postulacion ? new Date(c.fecha_postulacion).toLocaleDateString() : "—"}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Estado</span>
                              <div className="mt-1">
                                <select value={c.estado} onChange={(e) => { e.stopPropagation(); handleStageChange(c.id, e.target.value); }} onClick={(e) => e.stopPropagation()} className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border-0 cursor-pointer focus:outline-none ${ESTADO_STYLES[c.estado] || "text-slate-500 bg-slate-50"}`}>
                                  {STAGES.map(st => <option key={st} value={st}>{STAGE_LABELS[st]}</option>)}
                                </select>
                              </div>
                            </div>
                            <div>
                              <button onClick={(e) => { e.stopPropagation(); openDetail(c); }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#123498]/5 hover:bg-[#123498]/10 text-[#123498] text-[10px] font-black uppercase tracking-wider transition-colors">
                                <Eye size={13} />Ver detalle
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="2" className="lg:col-span-6 py-12 text-center text-slate-400 text-sm">No se encontraron postulantes.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal detalle */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setSelectedCandidate(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-black text-[#123498] uppercase tracking-wider">Detalle del Postulante</h2>
              <button onClick={() => setSelectedCandidate(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center font-black text-sm shrink-0">
                  {(selectedCandidate.candidato_nombre || "?").split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A]">{selectedCandidate.candidato_nombre}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mt-1 ${ESTADO_STYLES[selectedCandidate.estado]}`}>{STAGE_LABELS[selectedCandidate.estado] || selectedCandidate.estado}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500"><Mail size={12} />{selectedCandidate.candidato_correo}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={12} />{selectedCandidate.candidato_telefono || "—"}</div>
              </div>

              {selectedCandidate.candidato_telefono && (
                <a
                  href={`https://wa.me/51${selectedCandidate.candidato_telefono.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-black uppercase tracking-wider transition-colors"
                >
                  <MessageCircle size={14} />Contactar por WhatsApp
                </a>
              )}

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Oferta Postulada</h4>
                <p className="text-xs font-bold text-[#1A1A1A]">{selectedCandidate.oferta_titulo}</p>
                <p className="text-[10px] text-slate-400">{selectedCandidate.empresa_nombre}</p>
              </div>

              {selectedCandidate.cv_enviado_url && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">CV Enviado</h4>
                  <a href={`${API_BASE_URL}${selectedCandidate.cv_enviado_url}`} target="_blank" rel="noreferrer" className="text-xs text-[#123498] font-bold hover:underline">Ver CV</a>
                </div>
              )}

              {selectedCandidate.texto_presentacion && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Presentación</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedCandidate.texto_presentacion}</p>
                </div>
              )}

              {selectedCandidate.respuestas && selectedCandidate.respuestas.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Respuestas a Preguntas de Filtro</h4>
                  <div className="space-y-3">
                    {selectedCandidate.respuestas.map((r, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-[#123498] mb-1 flex items-start gap-1"><HelpCircle size={11} className="shrink-0 mt-0.5" />{r.pregunta}</p>
                        <p className="text-xs text-slate-600 pl-4">{r.respuesta_texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Notas Internas</h4>
                <textarea value={notaText} onChange={e => setNotaText(e.target.value)} rows={3} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] resize-none" placeholder="Escribe notas internas sobre este candidato..." />
                <button onClick={handleSaveNota} disabled={loadingNota} className="mt-2 px-4 py-2 bg-[#123498] hover:bg-[#0f2b7a] disabled:opacity-50 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors">
                  {loadingNota ? "Guardando..." : "Guardar Nota"}
                </button>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Cambiar Estado</h4>
                <div className="flex gap-1.5 flex-wrap">
                  {STAGES.map(st => (
                    <button key={st} onClick={() => handleStageChange(selectedCandidate.id, st)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedCandidate.estado === st ? 'bg-[#123498] text-white' : 'bg-slate-100 text-slate-500 hover:bg-[#123498]/10 hover:text-[#123498]'}`}>
                      {STAGE_LABELS[st]}
                    </button>
                  ))}
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
export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determinar sección activa basándose en la URL
  const getSection = () => {
    const path = location.pathname.replace("/admin", "").replace(/^\//, "");
    if (path === "empresas") return "empresas";
    if (path === "ofertas") return "ofertas";
    if (path === "postulantes") return "postulantes";
    if (path === "evaluaciones") return "evaluaciones";
    return "dashboard";
  };

  const section = getSection();

  const handleNavigate = (sec) => {
    if (sec === "dashboard") navigate("/admin");
    else if (sec === "evaluaciones") navigate("/admin/evaluaciones");
    else navigate(`/admin/${sec}`);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-x-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-[248px]
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0 lg:shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SidebarAdmin onCloseMobile={() => setSidebarOpen(false)} />
      </aside>

      {/* Overlay oscuro móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 lg:ml-0">
        <TopbarAdmin onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main className="flex-1 min-h-0 p-6 overflow-y-auto overflow-x-hidden">
          {section === "dashboard" && <SectionDashboard onNavigate={handleNavigate} />}
          {section === "empresas" && <SectionEmpresas />}
          {section === "ofertas" && <SectionOfertas />}
          {section === "postulantes" && <SectionPostulantes />}
          {section === "evaluaciones" && <SectionEvaluaciones />}
        </main>
      </div>
    </div>
  );
}
