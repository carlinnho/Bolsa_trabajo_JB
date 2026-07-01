const ESTADOS = {
  contratado: {
    label: "Contratado",
    dot: "bg-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  vista: {
    label: "Postulación vista",
    dot: "bg-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  enviada: {
    label: "Postulación enviada",
    dot: "bg-slate-400",
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
  no_seleccionado: {
    label: "No seleccionado",
    dot: "bg-red-400",
    bg: "bg-red-50",
    text: "text-red-600",
  },
};

export default function ApplicationStatusBadge({ estado }) {
  const config = ESTADOS[estado] ?? ESTADOS.enviada;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}