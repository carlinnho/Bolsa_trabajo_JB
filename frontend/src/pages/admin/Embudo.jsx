import React, { useState, useEffect } from "react";
import {
    getCandidates,
    getOffers,
    updateCandidateStage
} from "../../services/adminService";
import {
    GitBranch,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Download,
    Mail,
    Phone,
    Calendar,
    Eye,
    X,
    Briefcase,
    Building2,
    HelpCircle,
    User,
    Check,
    FileText
} from "lucide-react";

const STAGES = [
    { id: "Enviado", label: "CV Recibido", color: "border-t-blue-500 text-blue-600 bg-blue-50/40 border-l-blue-500" },
    { id: "Revisado", label: "CV Revisado", color: "border-t-purple-500 text-purple-600 bg-purple-50/40 border-l-purple-500" },
    { id: "Entrevista", label: "Entrevista", color: "border-t-amber-500 text-amber-600 bg-amber-50/40 border-l-amber-500" },
    { id: "Aprobado", label: "Aprobado", color: "border-t-green-500 text-green-600 bg-green-50/40 border-l-green-500" },
    { id: "Rechazado", label: "Rechazado", color: "border-t-red-500 text-red-600 bg-red-50/40 border-l-red-500" }
];

const STAGE_BORDERS = {
    Enviado: "border-l-blue-500",
    Revisado: "border-l-purple-500",
    Entrevista: "border-l-amber-500",
    Aprobado: "border-l-green-500",
    Rechazado: "border-l-red-500",
};

export default function Embudo() {
    const [candidates, setCandidates] = useState([]);
    const [offers, setOffers] = useState([]);
    const [selectedOfferId, setSelectedOfferId] = useState("");
    const [activeCandidate, setActiveCandidate] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCandidates(getCandidates());
        setOffers(getOffers());
    };

    const handleStageChange = (candidateId, currentStage, direction) => {
        const currentIndex = STAGES.findIndex(s => s.id === currentStage);
        let nextIndex = currentIndex;

        if (direction === "next" && currentIndex < STAGES.length - 2) {
            nextIndex = currentIndex + 1;
        } else if (direction === "prev" && currentIndex > 0 && currentStage !== "Rechazado") {
            nextIndex = currentIndex - 1;
        } else if (direction === "reject") {
            nextIndex = STAGES.findIndex(s => s.id === "Rechazado");
        } else if (direction === "approve") {
            nextIndex = STAGES.findIndex(s => s.id === "Aprobado");
        } else if (direction === "reset") {
            nextIndex = STAGES.findIndex(s => s.id === "Enviado");
        }

        if (nextIndex !== currentIndex) {
            updateCandidateStage(candidateId, STAGES[nextIndex].id);
            loadData();
            if (activeCandidate && activeCandidate.id === candidateId) {
                const updatedList = getCandidates();
                setActiveCandidate(updatedList.find(c => c.id === candidateId));
            }
        }
    };

    const handleDownloadCV = (candidato) => {
        setDownloadingId(candidato.id);
        setTimeout(() => {
            setDownloadingId(null);
            alert(`📥 Descargando currículum de ${candidato.candidato} en formato PDF...`);
        }, 1200);
    };

    const filteredCandidates = selectedOfferId
        ? candidates.filter(c => c.ofertaId === selectedOfferId)
        : candidates;

    const getOfferDetail = (ofertaId) => {
        const off = offers.find(o => o.id === ofertaId);
        return off ? { cargo: off.cargo, empresa: off.empresaNombre } : { cargo: "Convocatoria Eliminada", empresa: "N/A" };
    };

    return (
        <div className="space-y-6 animate-fade-slide">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-[#123498] uppercase tracking-wide">
                        Embudo de Reclutamiento
                    </h1>
                    <p className="text-sm text-slate-400">
                        Gestiona las etapas de los postulantes por oferta en tiempo real
                    </p>
                </div>

                {/* Offer selector filter */}
                <div className="w-full sm:w-80">
                    <select
                        value={selectedOfferId}
                        onChange={(e) => setSelectedOfferId(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#123498]/10 focus:border-[#123498] transition-all"
                    >
                        <option value="">Todas las ofertas activas</option>
                        {offers.map(o => (
                            <option key={o.id} value={o.id}>
                                {o.cargo} ({o.empresaNombre})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Kanban Board Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
                {STAGES.map((stage) => {
                    const stageCandidates = filteredCandidates.filter(c => c.estado === stage.id);

                    return (
                        <div
                            key={stage.id}
                            className="bg-[#F7F8FA] rounded-2xl border border-slate-200/40 p-3 min-h-[600px] flex flex-col shadow-3xs"
                        >
                            {/* Column Header */}
                            <div className={`border-t-4 px-3 py-2.5 rounded-lg mb-4 flex items-center justify-between shadow-2xs ${stage.color}`}>
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {stage.label}
                                </span>
                                <span className="text-[10px] font-black bg-white/80 px-2.5 py-0.5 rounded-full shadow-3xs border border-slate-100">
                                    {stageCandidates.length}
                                </span>
                            </div>

                            {/* Candidate List */}
                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-0.5">
                                {stageCandidates.length === 0 ? (
                                    <div className="border border-dashed border-slate-200/80 rounded-xl p-5 text-center text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-white/40">
                                        Sin candidatos
                                    </div>
                                ) : (
                                    stageCandidates.map((cand) => {
                                        const details = getOfferDetail(cand.ofertaId);
                                        const hasAnswers = cand.respuestas && Object.keys(cand.respuestas).length > 0;
                                        const lBorder = STAGE_BORDERS[cand.estado] || "border-l-blue-500";

                                        return (
                                            <div
                                                key={cand.id}
                                                className={`bg-white rounded-xl border border-slate-200/60 p-4 shadow-3xs hover:shadow-xs transition-shadow relative flex flex-col justify-between border-l-4 ${lBorder}`}
                                            >
                                                <div>
                                                    {/* Candidate Name */}
                                                    <h3 className="text-xs font-black text-[#1A1A1A] leading-tight uppercase tracking-wide">
                                                        {cand.candidato}
                                                    </h3>

                                                    {/* Cargo / Empresa */}
                                                    <p className="text-[10px] text-slate-400 font-bold mt-1">
                                                        {details.cargo}
                                                    </p>
                                                    <p className="text-[9px] text-[#123498] bg-[#123498]/5 border border-[#123498]/10 inline-block px-1.5 py-0.5 rounded-md mt-1.5 font-black uppercase tracking-widest">
                                                        {details.empresa}
                                                    </p>

                                                    <div className="mt-3 space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                                            <Calendar size={11} />
                                                            <span>{cand.fecha}</span>
                                                        </div>
                                                        {hasAnswers && (
                                                            <div className="flex items-center gap-1.5 text-[9px] text-[#F46F0B] font-black uppercase tracking-wider">
                                                                <HelpCircle size={11} />
                                                                <span>Filtro respondido</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                                    <button
                                                        onClick={() => setActiveCandidate(cand)}
                                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-150 text-slate-500 hover:text-[#123498] text-[10px] font-black uppercase tracking-wider transition-colors"
                                                    >
                                                        <Eye size={12} />
                                                        Expediente
                                                    </button>

                                                    <div className="flex items-center gap-0.5">
                                                        {stage.id !== "Enviado" && stage.id !== "Rechazado" && (
                                                            <button
                                                                onClick={() => handleStageChange(cand.id, stage.id, "prev")}
                                                                className="p-1.5 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded"
                                                                title="Retroceder"
                                                            >
                                                                <ArrowLeft size={12} />
                                                            </button>
                                                        )}

                                                        {stage.id !== "Rechazado" && stage.id !== "Aprobado" && (
                                                            <button
                                                                onClick={() => handleStageChange(cand.id, stage.id, "reject")}
                                                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"
                                                                title="Rechazar"
                                                            >
                                                                <XCircle size={12} />
                                                            </button>
                                                        )}

                                                        {stage.id !== "Aprobado" && stage.id !== "Rechazado" && (
                                                            <button
                                                                onClick={() => handleStageChange(cand.id, stage.id, "next")}
                                                                className="p-1.5 text-slate-400 hover:text-[#123498] hover:bg-slate-50 rounded"
                                                                title="Avanzar"
                                                            >
                                                                <ArrowRight size={12} />
                                                            </button>
                                                        )}

                                                        {(stage.id === "Rechazado" || stage.id === "Aprobado") && (
                                                            <button
                                                                onClick={() => handleStageChange(cand.id, stage.id, "reset")}
                                                                className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                                                            >
                                                                Reabrir
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Candidate Details Modal */}
            {activeCandidate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
                    <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-xl shadow-2xl overflow-hidden animate-scale-up">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F7F8FA]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#123498]/10 text-[#123498] flex items-center justify-center text-sm font-black shadow-3xs border border-[#123498]/10 shrink-0">
                                    {activeCandidate.candidato.substring(0, 2).toUpperCase()}
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

                        {/* Body */}
                        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
                            {/* Contact Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-slate-400" />
                                    <div className="min-w-0">
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Correo</div>
                                        <div className="text-slate-700 font-bold truncate">{activeCandidate.correo}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    <div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Teléfono</div>
                                        <div className="text-slate-700 font-bold">{activeCandidate.telefono}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-slate-400" />
                                    <div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Postulado</div>
                                        <div className="text-slate-700 font-bold">{activeCandidate.fecha}</div>
                                    </div>
                                </div>
                            </div>

                            {/* CV PDF Download */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-[#123498]/10 bg-[#123498]/2">
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

                            {/* Presentation Text */}
                            <div>
                                <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1.5">
                                    Carta de Presentación
                                </h3>
                                <p className="text-slate-500 bg-[#F7F8FA] p-3.5 rounded-xl border border-slate-200/60 leading-relaxed font-semibold italic">
                                    "{activeCandidate.presentacion || "El candidato no redactó una carta de presentación."}"
                                </p>
                            </div>

                            {/* Answers to Questions */}
                            <div>
                                <h3 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <HelpCircle size={13} className="text-[#F46F0B]" />
                                    Respuestas de Pre-filtrado
                                </h3>
                                {!activeCandidate.respuestas || Object.keys(activeCandidate.respuestas).length === 0 ? (
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

                            {/* Change State controls */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                                    Etapa Actual: <span className="text-[#123498] font-black">{activeCandidate.stage || activeCandidate.estado}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeCandidate.estado !== "Rechazado" && (
                                        <button
                                            onClick={() => handleStageChange(activeCandidate.id, activeCandidate.estado, "reject")}
                                            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                                        >
                                            <XCircle size={13} />
                                            Rechazar
                                        </button>
                                    )}
                                    {activeCandidate.estado !== "Aprobado" && (
                                        <button
                                            onClick={() => handleStageChange(activeCandidate.id, activeCandidate.estado, "approve")}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                                        >
                                            <CheckCircle2 size={13} />
                                            Aprobar
                                        </button>
                                    )}
                                    {(activeCandidate.estado === "Rechazado" || activeCandidate.estado === "Aprobado") && (
                                        <button
                                            onClick={() => handleStageChange(activeCandidate.id, activeCandidate.estado, "reset")}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-[#123498] hover:bg-[#096ACC] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                                        >
                                            <Check size={13} />
                                            Reabrir Proceso
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
