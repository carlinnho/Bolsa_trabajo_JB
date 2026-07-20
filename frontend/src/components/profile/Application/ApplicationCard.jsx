import { BuildingOfficeIcon, MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

// Convierte "2025-06-15" → "15 de junio"
const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr + "T00:00:00");
  return fecha.toLocaleDateString("es-PE", { day: "numeric", month: "long" });
};

export default function ApplicationCard({ aplicacion }) {
  const {
    cargo,
    empresa,
    inicialesLogo,
    colorLogo,
    ubicacion,
    fechaPostulacion,
    estado,
  } = aplicacion;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-white px-6 py-5 shadow-sm border border-[#e8edf5]">
      
      {/* Avatar con iniciales */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: colorLogo }}
      >
        {inicialesLogo}
      </div>

      {/* Info principal */}
      <div className="flex flex-1 flex-col gap-4 sm:gap-2 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[15px] font-bold text-[#1c2a52]">{cargo}</span>
          <ApplicationStatusBadge estado={estado} />
        </div>

        <div className="flex items-center gap-4 text-xs text-[#6b7a9f] flex-wrap">
          <span className="flex items-center gap-1">
            <BuildingOfficeIcon className="h-3.5 w-3.5" />
            {empresa}
          </span>
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            {ubicacion}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            Postulaste el {formatearFecha(fechaPostulacion)}
          </span>
        </div>
      </div>

      {/* Botón Ver detalles — sin funcionalidad por ahora */}
      <button
        type="button"
        aria-label={`Ver detalles de la aplicación para ${cargo} en ${empresa}`}
        className="shrink-0 flex items-center gap-2 rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-5 py-2.5 text-sm font-semibold text-[#123498] transition hover:bg-naranja hover:shadow hover:shadow-amarillo-hansa hover:border-naranja hover:text-white"
      >
        Ver detalles
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}