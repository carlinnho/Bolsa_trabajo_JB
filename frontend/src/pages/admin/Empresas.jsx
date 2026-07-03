import React, { useState, useEffect } from "react";
import {
    getCompanies,
    saveCompany,
    deleteCompany,
    getOffers
} from "../../services/adminService";
import {
    Building2,
    Plus,
    Edit3,
    Trash2,
    X,
    Search,
    Briefcase
} from "lucide-react";

export default function Empresas() {
    const [companies, setCompanies] = useState([]);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);

    // Form states
    const [formNombre, setFormNombre] = useState("");
    const [formSector, setFormSector] = useState("");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formColor, setFormColor] = useState("#123498");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCompanies(getCompanies());
        setOffers(getOffers());
    };

    const handleOpenAdd = () => {
        setEditingCompany(null);
        setFormNombre("");
        setFormSector("");
        setFormDescripcion("");
        setFormColor("#123498");
        setModalOpen(true);
    };

    const handleOpenEdit = (comp) => {
        setEditingCompany(comp);
        setFormNombre(comp.nombre);
        setFormSector(comp.sector);
        setFormDescripcion(comp.descripcion);
        setFormColor(comp.logoColor || "#123498");
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formNombre || !formSector) return;

        const updated = {
            nombre: formNombre,
            sector: formSector,
            descripcion: formDescripcion,
            logoColor: formColor,
            ...(editingCompany ? { id: editingCompany.id } : {})
        };

        saveCompany(updated);
        loadData();
        setModalOpen(false);
    };

    const handleDelete = (id, name) => {
        const associatedOffers = offers.filter(o => o.empresaId === id);
        let msg = `¿Está seguro de eliminar la empresa "${name}"?`;
        if (associatedOffers.length > 0) {
            msg += `\n⚠️ ¡Atención! Se eliminarán también las ${associatedOffers.length} ofertas asociadas a esta empresa.`;
        }

        if (window.confirm(msg)) {
            deleteCompany(id);
            loadData();
        }
    };

    const filteredCompanies = companies.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const PRESET_COLORS = ['#123498', '#F46F0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];

    const getOffersCount = (compId) => {
        return offers.filter(o => o.empresaId === compId && o.estado === 'Activa').length;
    };

    return (
        <div className="space-y-6 animate-fade-slide">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">
                        Gestión de Empresas
                    </h1>
                    <p className="text-sm text-slate-400">
                        Administra las empresas y clientes integrados en la bolsa de trabajo
                    </p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-[#F46F0B] hover:bg-[#d85f05] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow transition-all shrink-0"
                >
                    <Plus size={14} strokeWidth={2.8} />
                    Registrar Empresa
                </button>
            </div>

            {/* Search filter bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs flex items-center justify-between gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar empresa por nombre o sector..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all placeholder:text-slate-400"
                    />
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
                    Mostrando {filteredCompanies.length} de {companies.length} empresas
                </div>
            </div>

            {/* Grid of companies */}
            {filteredCompanies.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-3xs">
                    <Building2 className="mx-auto text-slate-300 mb-3" size={40} />
                    <h3 className="text-sm font-black text-[#123498] uppercase tracking-wider">No se encontraron empresas</h3>
                    <p className="text-xs text-slate-400 mt-1">Prueba a buscar con otros términos o registra una nueva empresa.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredCompanies.map((comp) => {
                        const initLetters = comp.nombre.substring(0, 2).toUpperCase();
                        const activeVacancies = getOffersCount(comp.id);

                        return (
                            <div
                                key={comp.id}
                                className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs hover:shadow-xs transition-shadow flex flex-col justify-between relative group"
                                style={{ borderLeftWidth: '4px', borderLeftColor: comp.logoColor || '#123498' }}
                            >
                                <div>
                                    {/* Company Icon & Sector */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-3xs shrink-0"
                                            style={{ backgroundColor: comp.logoColor || '#123498' }}
                                        >
                                            {initLetters}
                                        </div>
                                        <span className="text-[9px] font-black text-[#123498] bg-[#123498]/5 border border-[#123498]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                                            {comp.sector}
                                        </span>
                                    </div>

                                    {/* Company Info */}
                                    <h3 className="text-sm font-black text-[#1A1A1A] group-hover:text-[#123498] transition-colors uppercase tracking-wide">
                                        {comp.nombre}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-semibold mt-2.5 line-clamp-3 leading-relaxed">
                                        {comp.descripcion || "Sin descripción disponible."}
                                    </p>
                                </div>

                                {/* Card Footer */}
                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        <Briefcase size={13} className="text-slate-400" />
                                        <span>{activeVacancies} vacante{activeVacancies !== 1 ? 's' : ''} activa{activeVacancies !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleOpenEdit(comp)}
                                            className="p-2 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all"
                                            title="Editar"
                                        >
                                            <Edit3 size={13} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comp.id, comp.nombre)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-scale-up">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <h2 className="text-xs font-black text-[#123498] uppercase tracking-widest flex items-center gap-2">
                                <Building2 size={14} className="text-[#F46F0B]" />
                                {editingCompany ? "Editar Empresa" : "Registrar Nueva Empresa"}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Nombre de la Empresa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. I.seg, TechSolutions"
                                    value={formNombre}
                                    onChange={(e) => setFormNombre(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Sector / Rubro *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. Seguridad, Recursos Humanos, Tecnología"
                                    value={formSector}
                                    onChange={(e) => setFormSector(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Descripción de la Empresa
                                </label>
                                <textarea
                                    placeholder="Resume a qué se dedica la empresa..."
                                    rows="3"
                                    value={formDescripcion}
                                    onChange={(e) => setFormDescripcion(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all bg-slate-50 placeholder:text-slate-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                    Color de Identificación (Logo)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {PRESET_COLORS.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormColor(c)}
                                            className={`w-7 h-7 rounded-full transition-transform shrink-0 border border-slate-200 flex items-center justify-center ${formColor === c ? 'scale-110 ring-2 ring-[#123498]/30 ring-offset-1' : ''}`}
                                            style={{ backgroundColor: c }}
                                        >
                                            {formColor === c && (
                                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                            )}
                                        </button>
                                    ))}
                                </div>
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
                                    {editingCompany ? "Guardar" : "Crear Empresa"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
