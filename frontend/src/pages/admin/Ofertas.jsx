import React, { useState, useEffect } from "react";
import {
    getOffers,
    saveOffer,
    deleteOffer,
    toggleOfferStatus,
    getCompanies
} from "../../services/adminService";
import {
    Briefcase,
    Plus,
    Edit3,
    Trash2,
    X,
    Search,
    ToggleLeft,
    ToggleRight,
    HelpCircle,
    Building2,
    MapPin
} from "lucide-react";

export default function Ofertas() {
    const [offers, setOffers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    // Form states
    const [formCargo, setFormCargo] = useState("");
    const [formEmpresaId, setFormEmpresaId] = useState("");
    const [formUbicacion, setFormUbicacion] = useState("");
    const [formSalario, setFormSalario] = useState("");
    const [formTipoContrato, setFormTipoContrato] = useState("Tiempo completo");
    const [formModalidad, setFormModalidad] = useState("Presencial");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formRequisitos, setFormRequisitos] = useState("");
    const [formPreguntas, setFormPreguntas] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setOffers(getOffers());
        setCompanies(getCompanies());
    };

    const handleOpenAdd = () => {
        setEditingOffer(null);
        setFormCargo("");
        setFormEmpresaId(companies[0]?.id || "");
        setFormUbicacion("");
        setFormSalario("");
        setFormTipoContrato("Tiempo completo");
        setFormModalidad("Presencial");
        setFormDescripcion("");
        setFormRequisitos("");
        setFormPreguntas([]);
        setModalOpen(true);
    };

    const handleOpenEdit = (off) => {
        setEditingOffer(off);
        setFormCargo(off.cargo);
        setFormEmpresaId(off.empresaId);
        setFormUbicacion(off.ubicacion);
        setFormSalario(off.salario);
        setFormTipoContrato(off.tipo_contrato);
        setFormModalidad(off.modalidad);
        setFormDescripcion(off.descripcion);
        setFormRequisitos(off.requisitos);
        setFormPreguntas([...(off.preguntas || [])]);
        setModalOpen(true);
    };

    const handleAddQuestion = () => {
        setFormPreguntas([...formPreguntas, ""]);
    };

    const handleQuestionChange = (index, value) => {
        const updated = [...formPreguntas];
        updated[index] = value;
        setFormPreguntas(updated);
    };

    const handleRemoveQuestion = (index) => {
        setFormPreguntas(formPreguntas.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formCargo || !formEmpresaId) return;

        const cleanPreguntas = formPreguntas.filter(q => q.trim() !== "");

        const updated = {
            cargo: formCargo,
            empresaId: formEmpresaId,
            ubicacion: formUbicacion,
            salario: formSalario,
            tipo_contrato: formTipoContrato,
            modalidad: formModalidad,
            descripcion: formDescripcion,
            requisitos: formRequisitos,
            preguntas: cleanPreguntas,
            ...(editingOffer ? { id: editingOffer.id, estado: editingOffer.estado } : { estado: 'Activa' })
        };

        saveOffer(updated);
        loadData();
        setModalOpen(false);
    };

    const handleToggleStatus = (id) => {
        toggleOfferStatus(id);
        loadData();
    };

    const handleDelete = (id, cargo) => {
        if (window.confirm(`¿Está seguro de eliminar la oferta de empleo "${cargo}"?\nEsta acción es irreversible y eliminará también a los postulantes asociados.`)) {
            deleteOffer(id);
            loadData();
        }
    };

    const filteredOffers = offers.filter(o => {
        const matchesSearch = o.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCompany = filterCompany ? o.empresaId === filterCompany : true;
        const matchesStatus = filterStatus ? o.estado === filterStatus : true;
        return matchesSearch && matchesCompany && matchesStatus;
    });

    return (
        <div className="space-y-6 animate-fade-slide">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">
                        Gestión de Ofertas (Vacantes)
                    </h1>
                    <p className="text-sm text-slate-400">
                        Crea, edita, pausa o elimina las convocatorias laborales y sus preguntas filtro
                    </p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow transition-all shrink-0"
                >
                    <Plus size={14} strokeWidth={2.8} />
                    Crear Vacante
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar por puesto o empresa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <select
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all"
                    >
                        <option value="">Todas las empresas</option>
                        {companies.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
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
                        <option value="Activa">Activa</option>
                        <option value="Pausada">Pausada</option>
                    </select>
                </div>

                <div className="flex items-center justify-end text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
                    Total: {filteredOffers.length} de {offers.length} ofertas
                </div>
            </div>

            {/* List / Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
                {filteredOffers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Briefcase className="mx-auto text-slate-300 mb-3" size={40} />
                        <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">No se encontraron vacantes</h3>
                        <p className="text-xs text-slate-400 mt-1">Intente ajustar los filtros de búsqueda o cree una oferta nueva.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#F7F8FA] text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-black">Puesto / Empresa</th>
                                    <th className="px-6 py-4 font-black">Detalles</th>
                                    <th className="px-6 py-4 font-black">Salario</th>
                                    <th className="px-6 py-4 font-black text-center">Filtros (Preguntas)</th>
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
                                                <Building2 size={12} />
                                                <span>{off.empresaNombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-slate-500 font-extrabold uppercase">{off.tipo_contrato}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-1">
                                                <MapPin size={11} />
                                                <span>{off.ubicacion} ({off.modalidad})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-extrabold text-xs">
                                            {off.salario || "No especificado"}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${off.preguntas?.length > 0
                                                    ? 'bg-blue-50 text-[#123498] border border-blue-100'
                                                    : 'bg-slate-50 text-slate-400 border border-slate-100'
                                                    }`}
                                                title={off.preguntas?.join('\n')}
                                            >
                                                <HelpCircle size={11} />
                                                <span>{off.preguntas?.length || 0} pregunta{off.preguntas?.length !== 1 ? 's' : ''}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${off.estado === 'Activa'
                                                    ? 'bg-green-50 text-green-700 border border-green-100'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                    }`}
                                            >
                                                {off.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleToggleStatus(off.id)}
                                                    className="p-2 text-slate-400 hover:text-[#123498] rounded-lg transition-colors"
                                                    title={off.estado === 'Activa' ? 'Pausar Oferta' : 'Activar Oferta'}
                                                >
                                                    {off.estado === 'Activa' ? <ToggleRight size={22} className="text-green-500" /> : <ToggleLeft size={22} className="text-slate-300" />}
                                                </button>
                                                <button
                                                    onClick={() => handleOpenEdit(off)}
                                                    className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all"
                                                    title="Editar"
                                                >
                                                    <Edit3 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(off.id, off.cargo)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl shadow-2xl my-8 overflow-hidden animate-scale-up">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <h2 className="text-xs font-black text-[#123498] uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={14} className="text-[#F46F0B]" />
                                {editingOffer ? "Editar Convocatoria" : "Crear Convocatoria"}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                            {/* Grid 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Cargo / Puesto de Trabajo *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. Desarrollador Frontend, Analista Financiero"
                                        value={formCargo}
                                        onChange={(e) => setFormCargo(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Empresa Cliente *
                                    </label>
                                    <select
                                        value={formEmpresaId}
                                        onChange={(e) => setFormEmpresaId(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50"
                                    >
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Grid 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Modalidad de Trabajo
                                    </label>
                                    <select
                                        value={formModalidad}
                                        onChange={(e) => setFormModalidad(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50"
                                    >
                                        <option value="Presencial">Presencial</option>
                                        <option value="Remoto">Remoto</option>
                                        <option value="Híbrida">Híbrida</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Tipo de Contrato
                                    </label>
                                    <select
                                        value={formTipoContrato}
                                        onChange={(e) => setFormTipoContrato(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50"
                                    >
                                        <option value="Tiempo completo">Tiempo completo</option>
                                        <option value="Medio tiempo">Medio tiempo</option>
                                        <option value="Prácticas">Prácticas</option>
                                        <option value="Temporal">Temporal</option>
                                        <option value="Por proyecto">Por proyecto</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Rango Salarial
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej. S/ 3,000 - S/ 4,500, A convenir"
                                        value={formSalario}
                                        onChange={(e) => setFormSalario(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                        Ubicación de la Vacante
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej. Lima, Perú"
                                        value={formUbicacion}
                                        onChange={(e) => setFormUbicacion(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            {/* Textareas */}
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Descripción del Puesto
                                </label>
                                <textarea
                                    required
                                    placeholder="Indique las funciones del puesto..."
                                    rows="3"
                                    value={formDescripcion}
                                    onChange={(e) => setFormDescripcion(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Requisitos (Uno por línea)
                                </label>
                                <textarea
                                    required
                                    placeholder="• Experiencia previa&#10;• Bachiller en carrera afín"
                                    rows="3"
                                    value={formRequisitos}
                                    onChange={(e) => setFormRequisitos(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400 resize-none"
                                />
                            </div>

                            {/* Pre-filtering Questions */}
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest">
                                            Preguntas de Pre-filtrado para Candidatos
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                                            Los postulantes deberán responder estas preguntas al enviar su CV.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddQuestion}
                                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#123498]/20 hover:bg-[#123498]/5 text-[#123498] rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors"
                                    >
                                        <Plus size={12} />
                                        Agregar
                                    </button>
                                </div>

                                {formPreguntas.length === 0 ? (
                                    <div className="bg-[#F7F8FA] border border-dashed border-slate-200 rounded-xl p-5 text-center text-slate-400 text-xs font-semibold">
                                        No hay preguntas de filtrado añadidas. Los candidatos podrán postular directamente subiendo su CV.
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {formPreguntas.map((q, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-400 w-5 shrink-0 text-right">
                                                    #{index + 1}
                                                </span>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Escribe la pregunta aquí (Ej. ¿Cuenta con brevete?)"
                                                    value={q}
                                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQuestion(index)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-black text-slate-500 uppercase tracking-wider transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                                >
                                    {editingOffer ? "Guardar" : "Crear"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
