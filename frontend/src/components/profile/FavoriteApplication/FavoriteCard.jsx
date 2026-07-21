import {
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const MODALIDAD_COLOR = {
  presencial: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  remoto: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  "híbrido": "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Presencial: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Remoto: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Híbrido: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
};

const MAP_TIPO = {
  indefinido: "Tiempo completo",
  temporal: "Temporal",
  freelance: "Freelance",
  "prácticas": "Prácticas",
  por_horas: "Por horas",
};

function calcularTiempo(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `${diffMin} min`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h`;
  const diffDias = Math.floor(diffHrs / 24);
  if (diffDias < 7) return `${diffDias} día${diffDias > 1 ? "s" : ""}`;
  const diffSemanas = Math.floor(diffDias / 7);
  return `${diffSemanas} semana${diffSemanas > 1 ? "s" : ""}`;
}

function calcularCierraEn(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = fecha - ahora;
  if (diffMs <= 0) return "Ya cerró";
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return "Cierra hoy";
  if (diffDias === 1) return "Cierra mañana";
  return `Cierra en ${diffDias} días`;
}

function getIniciales(nombre) {
  if (!nombre) return "??";
  return nombre.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

function getColor(nombre) {
  if (!nombre) return "#6b7a9f";
  const colores = ["#123498", "#0e7490", "#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed"];
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  return colores[Math.abs(hash) % colores.length];
}

export default function FavoriteCard({ favorito, onEliminar }) {
  const navigate = useNavigate();

  const ofertaId = favorito.oferta_id || favorito.id;
  const titulo = favorito.titulo || favorito.cargo || "Sin título";
  const empresaNombre = favorito.empresa_nombre || favorito.empresa || "Empresa";
  const ubicacion = favorito.ubicacion || "Sin ubicación";
  const modalidad = favorito.modalidad || "";
  const tipoContrato = favorito.tipo_contrato || favorito.tipoEmpleo || "";
  const salarioMin = favorito.salario_min ?? favorito.salarioMin ?? 0;
  const salarioMax = favorito.salario_max ?? favorito.salarioMax ?? 0;
  const descripcion = favorito.descripcion || "";

  const inicialesLogo = getIniciales(empresaNombre);
  const colorLogo = getColor(empresaNombre);
  const guardadoHace = calcularTiempo(favorito.fecha_guardado);
  const cierraEn = calcularCierraEn(favorito.fecha_expiracion);
  const tipoLabel = MAP_TIPO[tipoContrato] || tipoContrato;

  return (
    <div className="rounded-2xl bg-white border border-[#e8edf5] px-6 py-5 shadow-sm flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_auto] gap-4 sm:flex sm:flex-row sm:gap-5 items-start">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white col-start-1 row-start-1"
          style={{ backgroundColor: colorLogo }}
        >
          {inicialesLogo}
        </div>

        <div className="flex flex-1 flex-col gap-1 min-w-0 col-span-2 row-start-2 sm:col-auto sm:row-auto">
          <span className="text-[15px] font-bold text-[#1c2a52]">{titulo}</span>
          <span className="text-xs text-[#6b7a9f]">
            {empresaNombre} · {ubicacion}
          </span>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {tipoLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e7edfb] px-3 py-1 text-xs font-medium text-azul-marino">
                <BuildingOfficeIcon className="h-3.5 w-3.5" />
                {tipoLabel}
              </span>
            )}
            {modalidad && (
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium ${MODALIDAD_COLOR[modalidad] ?? "text-[#6b7a9f] bg-[#f8fafc] border-[#e8edf5]"}`}>
                <MapPinIcon className="h-3.5 w-3.5" />
                {modalidad}
              </span>
            )}
            {salarioMin > 0 && (
              <span className="inline-flex items-center rounded-lg bg-[#eef1f8] px-3 py-1 text-xs font-medium text-[#7d8593]">
                S/ {Number(salarioMin).toLocaleString()} – {Number(salarioMax).toLocaleString()}
              </span>
            )}
          </div>

          {descripcion && (
            <p className="text-sm mt-3 leading-relaxed text-[#6b7a9f] line-clamp-2">{descripcion}</p>
          )}
        </div>

        <button
          type="button"
          aria-label="Quitar de favoritos"
          onClick={() => onEliminar(ofertaId)}
          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-400 transition hover:bg-red-100 col-start-2 row-start-1 justify-self-end"
        >
          <HeartSolid className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center sm:justify-between flex-wrap gap-3 border-t border-[#f1f5f9] pt-4">
        <div className="flex items-center gap-4 text-xs text-[#9aa3bd]">
          {guardadoHace && (
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5" />
              Guardado hace {guardadoHace}
            </span>
          )}

          {cierraEn && (
            <span className="flex items-center gap-1.5 text-naranja font-semibold">
              <ArrowPathIcon className="h-3.5 w-3.5" />
              {cierraEn}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 justify-center">
          <button
            type="button"
            onClick={() => navigate("/buscar-empleo")}
            className="rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-5 py-2.5 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc]"
          >
            Ver detalles
          </button>
          <button
            type="button"
            onClick={() => navigate("/buscar-empleo")}
            className="flex items-center gap-2 rounded-xl bg-[#f46f0b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d65f09]"
          >
            Postular
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
