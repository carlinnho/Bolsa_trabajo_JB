// ─────────────────────────────────────────────────────────────
// PanelDetalle — Panel derecho con detalle de la oferta
//
// Props:
//   estado            : string → 'empty' | 'loading' | 'detail' | 'error'
//   vacante           : object
//   onPostular        : fn
//   onReintentar      : fn
//   onVolver          : fn
//   postulacionStep   : string | null → null | 'preguntas' | 'cv'
//   respuestasFiltro  : object
//   setRespuestasFiltro : fn
//   onPreguntasCompletadas : fn
//   onPostularConCV   : fn(cvFile)
//   onCancelarPostulacion : fn
//   onVolverAPreguntas : fn
//   postulando        : boolean
//   yaPostulada       : boolean
// ─────────────────────────────────────────────────────────────

import DetalleVacante from './DetalleVacante';
import PreguntasFiltro from './PreguntasFiltro';
import ConfirmacionCV from './ConfirmacionCV';

export default function PanelDetalle({
  estado,
  vacante,
  error,
  onPostular,
  onReintentar,
  onVolver,
  postulacionStep,
  respuestasFiltro,
  setRespuestasFiltro,
  onPreguntasCompletadas,
  onPostularConCV,
  onCancelarPostulacion,
  onVolverAPreguntas,
  postulando,
  yaPostulada = false,
}) {
  const tituloHeader = () => {
    if (postulacionStep === 'preguntas') return 'Preguntas de filtrado';
    if (postulacionStep === 'cv') return 'Confirmación de CV';
    if (estado === 'detail') return vacante?.titulo;
    return 'Detalle de la oferta';
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header fijo */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-gray-100 bg-white flex items-center gap-2">
        {(onVolver && !postulacionStep) && (
          <button
            type="button"
            onClick={onVolver}
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
            title="Volver a la lista"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h2 className="font-montserrat font-semibold text-azul text-sm truncate flex-1">
          {tituloHeader()}
        </h2>
        {estado === 'detail' && !postulacionStep && (
          yaPostulada ? (
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-400 font-semibold text-sm px-4 py-2 rounded-lg flex-shrink-0 cursor-default">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ya postulaste
            </span>
          ) : (
            <button
              type="button"
              onClick={onPostular}
              className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors shadow-sm flex-shrink-0 cursor-pointer"
            >
              Postularme
            </button>
          )
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex-1 overflow-y-auto">
        {postulacionStep === 'preguntas' && vacante && (
          <PreguntasFiltro
            preguntas={vacante.preguntas_filtro || []}
            respuestas={respuestasFiltro}
            onChange={(id, valor) =>
              setRespuestasFiltro((prev) => ({ ...prev, [id]: valor }))
            }
            onSiguiente={onPreguntasCompletadas}
            onAtras={onCancelarPostulacion}
          />
        )}

        {postulacionStep === 'cv' && (
          <ConfirmacionCV
            onPostular={onPostularConCV}
            onAtras={onVolverAPreguntas}
            postulando={postulando}
          />
        )}

        {!postulacionStep && estado === 'empty' && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <svg className="w-10 h-10 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 text-xs">Selecciona una vacante</p>
          </div>
        )}

        {!postulacionStep && estado === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <svg className="animate-spin h-5 w-5 text-naranja" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs text-gray-400">Cargando...</p>
          </div>
        )}

        {!postulacionStep && estado === 'detail' && vacante && <DetalleVacante vacante={vacante} />}

        {!postulacionStep && estado === 'error' && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <svg className="w-8 h-8 text-red-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xs text-red-500 font-medium">{error || 'Error al cargar'}</p>
            {onReintentar && (
              <button type="button" onClick={onReintentar} className="mt-2 text-xs text-azul-marino hover:underline font-semibold">
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
