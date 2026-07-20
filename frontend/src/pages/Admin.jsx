import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, Briefcase, Users, LogOut,
  ChevronRight, Menu, X, Calendar, PlusCircle, ArrowRight,
  Clock, Video, MapPin, CheckCircle2, XCircle, Download, Mail, Phone,
  Eye, Check, FileText, HelpCircle, Edit3, Trash2, Search, ToggleLeft,
  ToggleRight, Plus, Sparkles, User, UserCheck, AlertCircle, Home
} from "lucide-react";
import StatCard from "../components/admin/StatCard";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import {
  getStatsSummary, getCandidates, getOffers, updateCandidateStage,
  getCompanies, saveCompany, deleteCompany, saveOffer, deleteOffer, toggleOfferStatus
} from "../services/adminService";

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

const PRESET_COLORS = ['#123498', '#F46F0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];
const STAGES = ["Enviado", "Revisado", "Entrevista", "Aprobado", "Rechazado"];

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
                  <span className="text-xs font-bold text-[#1A1A1A]">{stage.label === "Enviado" ? "CV Recibido" : stage.label === "Revisado" ? "CV Revisado" : stage.label}</span>
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

  const reload = () => {
    try { setCompanies(getCompanies()); } catch (e) { }
    try { setOffers(getOffers()); } catch (e) { }
  };

  useEffect(() => { reload(); }, []);

  const openNew = () => {
    setEditingCompany(null);
    setFormNombre(""); setFormSector(""); setFormDescripcion(""); setFormColor("#123498");
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditingCompany(c);
    setFormNombre(c.nombre); setFormSector(c.sector); setFormDescripcion(c.descripcion || ""); setFormColor(c.logoColor || "#123498");
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formNombre || !formSector) return;
    try {
      saveCompany({ nombre: formNombre, sector: formSector, descripcion: formDescripcion, logoColor: formColor, ...(editingCompany ? { id: editingCompany.id } : {}) });
    } catch (e) { }
    reload();
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Eliminar la empresa "${name}"?`)) {
      try { deleteCompany(id); } catch (e) { }
      reload();
    }
  };

  const filteredCompanies = companies.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOffersCount = (compId) => offers.filter(o => o.empresaId === compId && o.estado === 'Activa').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">Gestión de Empresas</h1>
          <p className="text-sm text-slate-400">Administra las empresas clientes</p>
        </div>
        <button onClick={openNew} className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all shrink-0">
          <Plus size={14} strokeWidth={2.8} />Registrar Empresa
        </button>
      </div>

      {/* Buscador */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Buscar empresa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400" />
      </div>

      {/* Grid de empresas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0" style={{ backgroundColor: c.logoColor || '#123498' }}>
                  {c.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A]">{c.nombre}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{c.sector}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-[#123498] transition-colors"><Edit3 size={13} /></button>
                <button onClick={() => handleDelete(c.id, c.nombre)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{c.descripcion || "Sin descripción"}</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#123498]">
              <Briefcase size={11} />
              <span>{getOffersCount(c.id)} ofertas activas</span>
            </div>
          </div>
        ))}
        {filteredCompanies.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400 text-sm">No se encontraron empresas.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-black text-[#123498] uppercase tracking-wider">{editingCompany ? "Editar Empresa" : "Nueva Empresa"}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Nombre</label>
                <input type="text" value={formNombre} onChange={e => setFormNombre(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Nombre de la empresa" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Sector</label>
                <input type="text" value={formSector} onChange={e => setFormSector(e.target.value)} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Ej: Tecnología, Seguridad..." required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Descripción</label>
                <textarea value={formDescripcion} onChange={e => setFormDescripcion(e.target.value)} rows={3} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] resize-none" placeholder="Breve descripción..." />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Color</label>
                <div className="flex gap-2">
                  {PRESET_COLORS.map(color => (
                    <button key={color} type="button" onClick={() => setFormColor(color)} className={`w-7 h-7 rounded-full border-2 transition-all ${formColor === color ? 'border-slate-800 scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-[#123498] hover:bg-[#0f2b7a] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">
                {editingCompany ? "Guardar Cambios" : "Registrar Empresa"}
              </button>
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [form, setForm] = useState({ cargo: "", empresaId: "", ubicacion: "", salario: "", tipo_contrato: "Tiempo completo", modalidad: "Presencial", descripcion: "", requisitos: "" });

  const reload = () => {
    try { setOffers(getOffers()); } catch (e) { }
    try { setCompanies(getCompanies()); } catch (e) { }
  };

  useEffect(() => { reload(); }, []);

  const openNew = () => {
    setEditingOffer(null);
    setForm({ cargo: "", empresaId: companies[0]?.id || "", ubicacion: "", salario: "", tipo_contrato: "Tiempo completo", modalidad: "Presencial", descripcion: "", requisitos: "" });
    setModalOpen(true);
  };

  const openEdit = (o) => {
    setEditingOffer(o);
    setForm({ cargo: o.cargo, empresaId: o.empresaId, ubicacion: o.ubicacion || "", salario: o.salario || "", tipo_contrato: o.tipo_contrato || "Tiempo completo", modalidad: o.modalidad || "Presencial", descripcion: o.descripcion || "", requisitos: o.requisitos || "" });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cargo || !form.empresaId) return;
    try { saveOffer({ ...form, ...(editingOffer ? { id: editingOffer.id } : {}) }); } catch (e) { }
    reload();
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Eliminar la oferta "${name}"?`)) {
      try { deleteOffer(id); } catch (e) { }
      reload();
    }
  };

  const handleToggle = (id) => {
    try { toggleOfferStatus(id); } catch (e) { }
    reload();
  };

  const filteredOffers = offers.filter(o =>
    o.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.empresaNombre || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Buscador */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Buscar oferta..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400" />
      </div>

      {/* Tabla de ofertas */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 font-black">Cargo</th>
                <th className="px-5 py-3.5 font-black">Empresa</th>
                <th className="px-5 py-3.5 font-black">Ubicación</th>
                <th className="px-5 py-3.5 font-black">Modalidad</th>
                <th className="px-5 py-3.5 font-black text-center">Estado</th>
                <th className="px-5 py-3.5 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map(o => (
                <tr key={o.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#1A1A1A]">{o.cargo}</td>
                  <td className="px-5 py-3.5 text-slate-500">{o.empresaNombre}</td>
                  <td className="px-5 py-3.5 text-slate-400">{o.ubicacion || "—"}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{o.modalidad || "—"}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button onClick={() => handleToggle(o.id)} className="inline-flex items-center gap-1.5" title="Toggle estado">
                      {o.estado === 'Activa' ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} className="text-slate-400" />}
                      <span className={`text-[9px] font-black uppercase tracking-wider ${o.estado === 'Activa' ? 'text-green-600' : 'text-slate-400'}`}>{o.estado}</span>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#123498] transition-colors"><Edit3 size={13} /></button>
                      <button onClick={() => handleDelete(o.id, o.cargo)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOffers.length === 0 && (
                <tr><td colSpan="6" className="py-12 text-center text-slate-400 text-sm">No se encontraron ofertas.</td></tr>
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
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Cargo</label>
                <input type="text" value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="Ej: Desarrollador Frontend" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Empresa</label>
                <select value={form.empresaId} onChange={e => setForm({ ...form, empresaId: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" required>
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
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Salario</label>
                  <input type="text" value={form.salario} onChange={e => setForm({ ...form, salario: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]" placeholder="S/ 3,000 - S/ 5,000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Tipo contrato</label>
                  <select value={form.tipo_contrato} onChange={e => setForm({ ...form, tipo_contrato: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option>Tiempo completo</option><option>Medio tiempo</option><option>Por proyecto</option><option>Prácticas</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 block">Modalidad</label>
                  <select value={form.modalidad} onChange={e => setForm({ ...form, modalidad: e.target.value })} className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498]">
                    <option>Presencial</option><option>Remoto</option><option>Híbrida</option>
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
              <button type="submit" className="w-full bg-[#123498] hover:bg-[#0f2b7a] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">
                {editingOffer ? "Guardar Cambios" : "Publicar Oferta"}
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
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const reload = () => {
    try { setCandidates(getCandidates()); } catch (e) { }
    try { setOffers(getOffers()); } catch (e) { }
  };

  useEffect(() => { reload(); }, []);

  const handleStageChange = (id, newStage) => {
    try { updateCandidateStage(id, newStage); } catch (e) { }
    reload();
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, estado: newStage }));
    }
  };

  const getOfferInfo = (ofertaId) => {
    const off = offers.find(o => o.id === ofertaId);
    return off ? { cargo: off.cargo, empresa: off.empresaNombre } : { cargo: "Eliminada", empresa: "N/A" };
  };

  const filtered = candidates.filter(c => {
    const matchSearch = c.candidato.toLowerCase().includes(searchTerm.toLowerCase()) || c.correo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === "Todos" || c.estado === filterEstado;
    return matchSearch && matchEstado;
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

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Buscar candidato..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["Todos", ...STAGES].map(est => (
            <button key={est} onClick={() => setFilterEstado(est)} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filterEstado === est ? 'bg-[#123498] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:border-[#123498] hover:text-[#123498]'}`}>
              {est}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 font-black">Candidato</th>
                <th className="px-5 py-3.5 font-black">Oferta</th>
                <th className="px-5 py-3.5 font-black">Empresa</th>
                <th className="px-5 py-3.5 font-black">Fecha</th>
                <th className="px-5 py-3.5 font-black text-center">Estado</th>
                <th className="px-5 py-3.5 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const info = getOfferInfo(c.ofertaId);
                return (
                  <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#1A1A1A]">{c.candidato}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.correo}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{info.cargo}</td>
                    <td className="px-5 py-3.5 text-slate-400 font-bold">{info.empresa}</td>
                    <td className="px-5 py-3.5 text-slate-400">{c.fecha}</td>
                    <td className="px-5 py-3.5 text-center">
                      <select value={c.estado} onChange={e => handleStageChange(c.id, e.target.value)} className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border-0 cursor-pointer focus:outline-none ${ESTADO_STYLES[c.estado] || "text-slate-500 bg-slate-50"}`}>
                        {STAGES.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => setSelectedCandidate(c)} className="p-1.5 rounded-lg hover:bg-[#123498]/5 text-slate-400 hover:text-[#123498] transition-colors" title="Ver detalle">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="py-12 text-center text-slate-400 text-sm">No se encontraron postulantes.</td></tr>
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
                  {selectedCandidate.candidato.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A]">{selectedCandidate.candidato}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mt-1 ${ESTADO_STYLES[selectedCandidate.estado]}`}>{selectedCandidate.estado}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500"><Mail size={12} />{selectedCandidate.correo}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={12} />{selectedCandidate.telefono}</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Oferta Postulada</h4>
                <p className="text-xs font-bold text-[#1A1A1A]">{getOfferInfo(selectedCandidate.ofertaId).cargo}</p>
                <p className="text-[10px] text-slate-400">{getOfferInfo(selectedCandidate.ofertaId).empresa}</p>
              </div>

              {selectedCandidate.presentacion && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Presentación</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedCandidate.presentacion}</p>
                </div>
              )}

              {selectedCandidate.respuestas && Object.keys(selectedCandidate.respuestas).length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Respuestas</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedCandidate.respuestas).map(([q, a], i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-[#123498] mb-1 flex items-start gap-1"><HelpCircle size={11} className="shrink-0 mt-0.5" />{q}</p>
                        <p className="text-xs text-slate-600 pl-4">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Cambiar Estado</h4>
                <div className="flex gap-1.5 flex-wrap">
                  {STAGES.map(st => (
                    <button key={st} onClick={() => handleStageChange(selectedCandidate.id, st)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedCandidate.estado === st ? 'bg-[#123498] text-white' : 'bg-slate-100 text-slate-500 hover:bg-[#123498]/10 hover:text-[#123498]'}`}>
                      {st}
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

  // Determinar sección activa basándose en la URL
  const getSection = () => {
    const path = location.pathname.replace("/admin", "").replace(/^\//, "");
    if (path === "empresas") return "empresas";
    if (path === "ofertas") return "ofertas";
    if (path === "postulantes") return "postulantes";
    return "dashboard";
  };

  const section = getSection();

  const handleNavigate = (sec) => {
    if (sec === "dashboard") navigate("/admin");
    else navigate(`/admin/${sec}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col ml-[248px]">
        <TopbarAdmin />
        <main className="flex-1 p-6 overflow-auto">
          {section === "dashboard" && <SectionDashboard onNavigate={handleNavigate} />}
          {section === "empresas" && <SectionEmpresas />}
          {section === "ofertas" && <SectionOfertas />}
          {section === "postulantes" && <SectionPostulantes />}
        </main>
      </div>
    </div>
  );
}
