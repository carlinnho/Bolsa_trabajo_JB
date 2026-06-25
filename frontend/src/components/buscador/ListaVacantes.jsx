// ─────────────────────────────────────────────────────────────
// ListaVacantes — Panel izquierdo del split-plane
//
// Props:
//   vacantes      : array   → lista de vacantes a mostrar
//   seleccionadaId: string  → id de la vacante activa
//   onSelect      : fn(id)  → se llama al hacer clic en una tarjeta
//   loading       : boolean → muestra skeleton mientras carga
//   error         : string  → mensaje de error si algo falló
//
// Contiene los filtros en la parte superior y la lista scrolleable
// de tarjetas debajo. Maneja estados: carga, error, vacío y datos.
// ─────────────────────────────────────────────────────────────

import FiltrosVacantes from './FiltrosVacantes';
import TarjetaVacante from './TarjetaVacante';

function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl border-2 border-gray-100 animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="flex justify-between">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function ListaVacantes({ vacantes, seleccionadaId, onSelect, onFilterChange, filtros, loading, error }) {
  return (
    <div className="h-full flex flex-col">
      {/* Filtros */}
      <div className="p-4 border-b border-gray-100">
        <FiltrosVacantes filtros={filtros} onFilterChange={onFilterChange} />
      </div>

      {/* Lista scrolleable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Estado: carga */}
        {loading && (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Estado: error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-12 h-12 text-red-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* Estado: vacío (sin resultados) */}
        {!loading && !error && vacantes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm text-gray-400 font-medium">No se encontraron vacantes</p>
            <p className="text-xs text-gray-300 mt-1">Intenta con otros filtros</p>
          </div>
        )}

        {/* Estado: datos */}
        {!loading && !error && vacantes.map((v) => (
          <TarjetaVacante
            key={v.id}
            vacante={v}
            seleccionada={v.id === seleccionadaId}
            onClick={() => onSelect(v.id)}
          />
        ))}
      </div>
    </div>
  );
}
