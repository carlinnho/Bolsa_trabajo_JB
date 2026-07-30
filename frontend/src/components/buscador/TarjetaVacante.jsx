import { MapPinIcon, HeartIcon } from "@heroicons/react/24/outline";

const MAP_TIPO_ETIQUETA = {
  'Tiempo completo': { label: 'Jornada Completa', clase: 'bg-blue-50 text-blue-700' },
  'Medio tiempo':    { label: 'Medio tiempo',      clase: 'bg-orange-50 text-orange-700' },
  'Prácticas':       { label: 'Prácticas',         clase: 'bg-teal-50 text-teal-700' },
  'Temporal':        { label: 'Temporal',          clase: 'bg-purple-50 text-purple-700' },
  'Permanente':      { label: 'Permanente',        clase: 'bg-green-50 text-green-700' },
};

const MAP_MODALIDAD_ETIQUETA = {
  'Presencial': { label: 'Presencial', clase: 'bg-amber-50 text-amber-700' },
  'Remoto':     { label: 'Remoto',     clase: 'bg-sky-50 text-sky-700' },
  'Híbrida':    { label: 'Híbrida',    clase: 'bg-indigo-50 text-indigo-700' },
};

export default function TarjetaVacante({ vacante, seleccionada = false, onClick, esGuardada = false, onGuardar }) {
  const fechaPublicacion = vacante.fecha_publicacion
    ? new Date(vacante.fecha_publicacion.replace(" ", "T")).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    : "No especificada";

  const etiqueta = MAP_TIPO_ETIQUETA[vacante.tipo_contrato];
  const modalidadEtiqueta = MAP_MODALIDAD_ETIQUETA[vacante.modalidad];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer relative shadow-sm ${
        seleccionada
          ? 'border-naranja bg-orange-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-montserrat font-semibold text-azul text-base leading-snug mb-1.5 truncate">
            {vacante.titulo}
          </h3>

          <p className="text-base text-gray-700 mb-2.5">{vacante.empresa_nombre || vacante.empresa}</p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4 shrink-0" strokeWidth={2}/>
              {vacante.ubicacion}
            </span>
            <span className="text-gray-300">|</span>
            <span>{fechaPublicacion}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {modalidadEtiqueta && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full leading-none ${modalidadEtiqueta.clase}`}>
              {modalidadEtiqueta.label}
            </span>
          )}
          {etiqueta && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full leading-none ${etiqueta.clase}`}>
              {etiqueta.label}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onGuardar?.(vacante.id); }}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            title={esGuardada ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <HeartIcon className="w-5 h-5" fill={esGuardada ? 'red' : 'none'} strokeWidth={2}/>
          </button>
        </div>
      </div>
    </div>
  );
}
