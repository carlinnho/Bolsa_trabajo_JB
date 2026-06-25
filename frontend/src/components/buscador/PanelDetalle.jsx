// ─────────────────────────────────────────────────────────────
// PanelDetalle — Panel derecho del split-plane
//
// Props:
//   estado    : string → 'empty' | 'loading' | 'detail' | 'error'
//   vacante   : object → datos de la vacante seleccionada (en estado 'detail')
//   error     : string → mensaje de error
//   onPostular: fn     → se dispara al hacer clic en "Postularme"
//   onReintentar: fn   → se dispara al hacer clic en "Reintentar"
//
// El botón "Postularme" está fijo en la parte superior del panel
// y solo se muestra cuando hay una vacante seleccionada.
// Si el usuario no está autenticado, onPostular redirige a /login.
//
// Estados del panel:
//   empty   → mensaje "Selecciona una vacante"
//   loading → spinner de carga
//   detail  → muestra <DetalleVacante>
//   error   → mensaje de error con botón reintentar
// ─────────────────────────────────────────────────────────────

import DetalleVacante from './DetalleVacante';

export default function PanelDetalle({ estado, vacante, error, onPostular, onReintentar }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header fijo con botón Postularme */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-azul text-sm uppercase tracking-wider">
          Detalle de la oferta
        </h2>
        {estado === 'detail' && (
          <button
            type="button"
            onClick={onPostular}
            className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Postularme
          </button>
        )}
      </div>

      {/* Cuerpo scrolleable */}
      <div className="flex-1 overflow-y-auto">
        {/* Estado: empty - sin selección */}
        {estado === 'empty' && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 font-medium text-sm">Selecciona una vacante</p>
            <p className="text-gray-300 text-xs mt-1">para ver sus detalles</p>
          </div>
        )}

        {/* Estado: loading */}
        {estado === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <svg className="animate-spin h-8 w-8 text-naranja" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm text-gray-400">Cargando detalles...</p>
          </div>
        )}

        {/* Estado: detail - muestra la información de la vacante */}
        {estado === 'detail' && vacante && <DetalleVacante vacante={vacante} />}

        {/* Estado: error */}
        {estado === 'error' && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <svg className="w-12 h-12 text-red-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-red-500 font-medium">{error || 'Error al cargar la vacante'}</p>
            {onReintentar && (
              <button
                type="button"
                onClick={onReintentar}
                className="mt-3 text-sm text-azul-marino hover:underline font-semibold"
              >
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
