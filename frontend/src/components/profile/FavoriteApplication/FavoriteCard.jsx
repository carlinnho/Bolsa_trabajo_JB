import {
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowPathIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const MODALIDAD_COLOR = {
  Presencial: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Remoto: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Híbrido: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
};

export default function FavoriteCard({ favorito, onEliminar }) {
  const {
    id,
    cargo,
    empresa,
    inicialesLogo,
    colorLogo,
    ubicacion,
    tipoEmpleo,
    modalidad,
    salarioMin,
    salarioMax,
    descripcion,
    guardadoHace,
    cierraEn,
  } = favorito;

  return (
    <div className="rounded-2xl bg-white border border-[#e8edf5] px-6 py-5 shadow-sm flex flex-col gap-4">

      {/* Fila superior: avatar + info + corazón */}
      <div className="grid grid-cols-[1fr_auto] gap-4 sm:flex sm:flex-row sm:gap-5 items-start">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white col-start-1 row-start-1"
          style={{ backgroundColor: colorLogo }}
        >
          {inicialesLogo}
        </div>

        <div className="flex flex-1 flex-col gap-1 min-w-0 col-span-2 row-start-2 sm:col-auto sm:row-auto">
          <span className="text-[15px] font-bold text-[#1c2a52]">{cargo}</span>
          <span className="text-xs text-[#6b7a9f]">
            {empresa} · {ubicacion}
          </span>

          {/* Badges */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e7edfb] px-3 py-1 text-xs font-medium text-azul-marino">
              <BuildingOfficeIcon className="h-3.5 w-3.5" />
              {tipoEmpleo}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium ${MODALIDAD_COLOR[modalidad] ?? "text-[#6b7a9f] bg-[#f8fafc] border-[#e8edf5]"}`}>
              <MapPinIcon className="h-3.5 w-3.5" />
              {modalidad}
            </span>
            <span className="inline-flex items-center rounded-lg bg-[#eef1f8] px-3 py-1 text-xs font-medium text-[#7d8593]">
              S/ {salarioMin.toLocaleString()} – {salarioMax.toLocaleString()}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-sm mt-3 leading-relaxed text-[#6b7a9f]">{descripcion}</p>
        </div>

        {/* Botón eliminar favorito */}
        <button
          type="button"
          aria-label="Quitar de favoritos"
          onClick={() => onEliminar(id)}
          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-400 transition hover:bg-red-100 col-start-2 row-start-1 justify-self-end"
        >
          <HeartSolid className="h-5 w-5" />
        </button>
      </div>

      {/* Fila inferior: guardado + cierra + botones */}
      <div className="flex items-center justify-center sm:justify-between flex-wrap gap-3 border-t border-[#f1f5f9] pt-4">
        <div className="flex items-center gap-4 text-xs text-[#9aa3bd]">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            Guardado hace {guardadoHace}
          </span>

          {cierraEn && (
            <span className="flex items-center gap-1.5 text-naranja font-semibold">
              <ArrowPathIcon className="h-3.5 w-3.5" />
              Cierra en {cierraEn}
            </span>
          )}
        </div>

        {/* Botones — sin funcionalidad por ahora */}
        <div className="flex items-center gap-2 justify-center">
          <button
            type="button"
            className="rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-5 py-2.5 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc]"
          >
            Ver detalles
          </button>
          <button
            type="button"
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