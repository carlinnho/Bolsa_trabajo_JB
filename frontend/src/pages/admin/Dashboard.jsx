import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import { getStatsSummary } from "../../services/adminService";
import {
    Calendar,
    PlusCircle,
    ArrowRight,
    Clock,
    Video,
    MapPin,
    Building2,
    Briefcase,
    GitBranch,
    Sparkles,
    User,
    UserCheck
} from "lucide-react";

// Mock upcoming interviews list
const UPCOMING_INTERVIEWS = [
    {
        candidato: "Sofía Castro",
        puesto: "Desarrollador Frontend React",
        tipo: "Virtual (Zoom)",
        fecha: "Hoy, 4:00 PM",
        entrevistador: "Rodrigo M. (JB)",
        icon: Video,
        color: "bg-blue-50 text-blue-600 border border-blue-100"
    },
    {
        candidato: "Diego Herrera",
        puesto: "Backend Developer Node.js",
        tipo: "Presencial",
        fecha: "Mañana, 10:00 AM",
        entrevistador: "Carlos S. (TechSolutions)",
        icon: MapPin,
        color: "bg-purple-50 text-purple-600 border border-purple-100"
    },
    {
        candidato: "Ana Torres",
        puesto: "Analista Contable",
        tipo: "Presencial",
        fecha: "Lunes 6, 9:30 AM",
        entrevistador: "Diana L. (I.seg)",
        icon: MapPin,
        color: "bg-emerald-50 text-emerald-600 border border-emerald-100"
    }
];

const ESTADO_STYLES = {
    Enviado: "text-[#123498] bg-blue-50 border border-blue-100",
    Revisado: "text-purple-600 bg-purple-50 border border-purple-100",
    Entrevista: "text-amber-600 bg-amber-50 border border-amber-100",
    Aprobado: "text-green-600 bg-green-50 border border-green-100",
    Rechazado: "text-red-600 bg-red-50 border border-red-100",
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setSummary(getStatsSummary());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!summary) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 font-bold">
                Cargando resumen del panel...
            </div>
        );
    }

    const stats = [
        { label: "Postulantes hoy", value: summary.todayCount, delta: "12%", accent: "#123498" },
        { label: "Ofertas activas", value: summary.activeOffersCount, delta: "3%", accent: "#F46F0B" },
        { label: "Empresas registradas", value: summary.companiesCount, accent: "#3B5BDB" },
        { label: "Tasa de aprobación", value: `${summary.approvalRate}%`, delta: "2%", accent: "#16A34A" },
    ];

    const formatDay = (date) => {
        const days = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
        const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        return `${days[date.getDay()]}, ${date.getDate()} DE ${months[date.getMonth()]}`;
    };

    const formatTime = (date) => {
        let hrs = date.getHours();
        let mins = date.getMinutes();
        let ampm = hrs >= 12 ? 'p. m.' : 'a. m.';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        mins = mins < 10 ? '0' + mins : mins;
        return `${hrs}:${mins} ${ampm}`;
    };

    return (
        <div className="space-y-6">
            {/* Greeting Card - Modeled exactly like Asistencia JB top widget */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 border-l-[#F46F0B]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shadow-2xs shrink-0">
                        <UserCheck size={22} className="text-[#123498]" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">
                            Buenos días,
                        </h1>
                        <p className="text-xl font-heading font-black text-[#123498] mt-1.5 flex items-center gap-1.5">
                            Rodrigo Mendoza <span className="text-base">👋</span>
                        </p>
                        <p className="text-[9px] font-black text-[#F46F0B] uppercase tracking-wider mt-1">
                            💻 Administrador de Sistemas
                        </p>
                    </div>
                </div>
                <div className="text-right sm:border-l border-slate-100 sm:pl-6 leading-tight shrink-0 self-start sm:self-center">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {formatDay(time)}
                    </div>
                    <div className="text-xl font-heading font-black text-[#123498] mt-1">
                        {formatTime(time)}
                    </div>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Middle Row: Funnel and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Funnel chart widget */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">
                        Embudo de Reclutamiento
                    </h2>
                    <p className="text-[10px] text-slate-400 font-semibold mb-4">
                        Estado de todos los postulantes activos
                    </p>

                    <div className="space-y-4">
                        {summary.funnelStages.map((stage) => (
                            <div key={stage.label}>
                                <div className="flex items-baseline justify-between mb-1.5">
                                    <span className="text-xs font-bold text-[#1A1A1A]">
                                        {stage.label === "Enviado" ? "CV Recibido" : stage.label === "Revisado" ? "CV Revisado" : stage.label}
                                    </span>
                                    <span className="text-xs font-black text-slate-500">
                                        {stage.count}
                                    </span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: stage.width, backgroundColor: stage.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent activity widget */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">
                        Actividad Reciente
                    </h2>
                    <p className="text-[10px] text-slate-400 font-semibold mb-4">
                        Últimas postulaciones ingresadas al sistema
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                    <th className="pb-3 font-black">Candidato</th>
                                    <th className="pb-3 font-black">Oferta</th>
                                    <th className="pb-3 font-black">Empresa</th>
                                    <th className="pb-3 font-black text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.recentActivity.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-6 text-center text-slate-400 italic">
                                            Sin actividad de postulación registrada.
                                        </td>
                                    </tr>
                                ) : (
                                    summary.recentActivity.map((row, i) => (
                                        <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3 font-bold text-[#1A1A1A]">{row.candidato}</td>
                                            <td className="py-3 text-slate-500 font-medium">{row.oferta}</td>
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

            {/* Bottom Row: Upcoming interviews and Quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Upcoming interviews */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">
                                Próximas Entrevistas Programadas
                            </h2>
                            <p className="text-[10px] text-slate-400 font-semibold">
                                Evaluaciones en agenda para el equipo de reclutamiento
                            </p>
                        </div>
                        <Calendar size={15} className="text-slate-400" />
                    </div>

                    <div className="space-y-3">
                        {UPCOMING_INTERVIEWS.map((interview, index) => {
                            const Icon = interview.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg shrink-0 ${interview.color}`}>
                                            <Icon size={14} />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-xs text-[#1A1A1A]">{interview.candidato}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                                                Cargo: {interview.puesto}
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-bold">
                                                <span>Entrevistador:</span>
                                                <span className="text-[#123498]">{interview.entrevistador}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-150 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-center">
                                        <Clock size={11} className="text-[#F46F0B]" />
                                        <span className="text-[10px] text-slate-700 font-black uppercase tracking-wider">{interview.fecha}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                        <h2 className="text-[10px] font-black text-[#123498] uppercase tracking-widest mb-1">
                            Accesos Rápidos Admin
                        </h2>
                        <p className="text-[10px] text-slate-400 font-semibold mb-4">
                            Accesos directos para la administración del portal
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={() => navigate("/admin/ofertas")}
                            className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-[#F46F0B]/5 hover:border-[#F46F0B]/30 group transition-all text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#F46F0B]/10 rounded-lg group-hover:bg-[#F46F0B]/20 text-[#F46F0B] transition-colors shrink-0">
                                    <PlusCircle size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-slate-700">Crear Convocatoria</div>
                                    <div className="text-[9px] text-slate-400 font-semibold mt-0.5">Añade una vacante o puesto al buscador</div>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-[#F46F0B] group-hover:translate-x-0.5 transition-all" />
                        </button>

                        <button
                            onClick={() => navigate("/admin/empresas")}
                            className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-[#123498]/5 hover:border-[#123498]/30 group transition-all text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#123498]/10 rounded-lg group-hover:bg-[#123498]/20 text-[#123498] transition-colors shrink-0">
                                    <Building2 size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-slate-700">Registrar Cliente</div>
                                    <div className="text-[9px] text-slate-400 font-semibold mt-0.5">Inserta una nueva empresa y logotipo</div>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-[#123498] group-hover:translate-x-0.5 transition-all" />
                        </button>

                        <button
                            onClick={() => navigate("/admin/embudo")}
                            className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-purple-50 hover:border-purple-200 group transition-all text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 text-purple-600 transition-colors shrink-0">
                                    <GitBranch size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-slate-700">Revisar Convocatorias</div>
                                    <div className="text-[9px] text-slate-400 font-semibold mt-0.5">Ve el avance de candidatos en el Kanban</div>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                        </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-[9px] text-slate-400 font-bold italic">
                        <Sparkles size={11} className="text-[#F46F0B]" />
                        <span>Reclutamiento activo: JB Consultores en línea</span>
                    </div>
                </div>
            </div>
        </div>
    );
}