// ─────────────────────────────────────────────────────────────
// TarjetaVacante — Card compacta de vacante
//
// Props:
//   vacante     : object
//   seleccionada: boolean
//   onClick     : fn
//   esGuardada  : boolean
//   onGuardar   : fn
// ─────────────────────────────────────────────────────────────

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
  const fecha = new Date(vacante.fecha_publicacion + 'T00:00:00').toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
  });

  const etiqueta = MAP_TIPO_ETIQUETA[vacante.tipo_contrato];
  const modalidadEtiqueta = MAP_MODALIDAD_ETIQUETA[vacante.modalidad];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer relative shadow-sm ${
        seleccionada
          ? 'border-naranja bg-orange-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-montserrat font-semibold text-azul text-base leading-snug mb-1.5 truncate">
            {vacante.cargo}
          </h3>

          <p className="text-base text-gray-700 mb-2.5">{vacante.empresa}</p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vacante.ubicacion}
            </span>
            <span className="text-gray-300">|</span>
            <span>{fecha}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
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
            title={esGuardada ? 'Quitar de guardados' : 'Guardar vacante'}
          >
            <svg className="w-5 h-5" fill={esGuardada ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </button>
  );
}
