// ─────────────────────────────────────────────────────────────
// FiltrosVacantes — Panel de filtros dinámicos
//
// Props:
//   filtros     : object → { cargo, empresa, fecha_desde, fecha_hasta }
//   onFilterChange : fn  → recibe los nuevos filtros cada vez que cambian
//
// Los inputs tienen debounce (300ms) en cargo y empresa para no
// disparar búsquedas innecesarias. El botón "Limpiar" restablece
// todos los filtros a su valor por defecto.
// ─────────────────────────────────────────────────────────────

import { useState, useRef } from 'react';

const FILTROS_INICIALES = {
  cargo: '',
  empresa: '',
  fecha_desde: '',
  fecha_hasta: '',
};

export default function FiltrosVacantes({ filtros, onFilterChange }) {
  const [locales, setLocales] = useState(filtros);
  const timerRef = useRef(null);

  // Actualiza un campo y aplica debounce para notificar al padre
  const handleChange = (campo, valor) => {
    const nuevos = { ...locales, [campo]: valor };
    setLocales(nuevos);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onFilterChange(nuevos);
    }, 300);
  };

  // Limpia todos los filtros
  const handleLimpiar = () => {
    setLocales(FILTROS_INICIALES);
    if (timerRef.current) clearTimeout(timerRef.current);
    onFilterChange(FILTROS_INICIALES);
  };

  // Calcula cuántos filtros activos hay (para mostrar un badge)
  const filtrosActivos = Object.values(locales).filter((v) => v !== '').length;

  return (
    <div className="space-y-3">
      {/* Encabezado con botón limpiar */}
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-azul text-sm uppercase tracking-wider">
          Filtros
          {filtrosActivos > 0 && (
            <span className="ml-2 text-xs bg-naranja text-white px-2 py-0.5 rounded-full">
              {filtrosActivos}
            </span>
          )}
        </h2>
        {filtrosActivos > 0 && (
          <button
            type="button"
            onClick={handleLimpiar}
            className="text-xs text-naranja hover:text-orange-700 font-semibold transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Filtro por cargo */}
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
          Cargo
        </label>
        <input
          type="text"
          placeholder="Ej: Desarrollador"
          value={locales.cargo}
          onChange={(e) => handleChange('cargo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
        />
      </div>

      {/* Filtro por empresa */}
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
          Empresa
        </label>
        <input
          type="text"
          placeholder="Ej: Consultora JB"
          value={locales.empresa}
          onChange={(e) => handleChange('empresa', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
        />
      </div>

      {/* Filtro por rango de fechas */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Desde
          </label>
          <input
            type="date"
            value={locales.fecha_desde}
            onChange={(e) => handleChange('fecha_desde', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={locales.fecha_hasta}
            onChange={(e) => handleChange('fecha_hasta', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
