// ─────────────────────────────────────────────────────────────
// FiltrosVacantes — Barra de filtros (estilo Indeed)
//
// Props:
//   filtros     : object → { cargo, ubicacion, fecha_rango }
//   onFilterChange : fn  → recibe los nuevos filtros
//
// Layout:
//   Fila 1: [Cargo input] [Ubicación input] [Buscar]
//   Fila 2: [📅 Fecha: Últ. 7 días ▾]  ← dropdown con opciones
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';

const OPCIONES_FECHA = [
  { value: '', label: 'Todas las fechas' },
  { value: '24h', label: 'Últimas 24 horas' },
  { value: '3d', label: 'Últimos 3 días' },
  { value: '7d', label: 'Últimos 7 días' },
];

const OPCIONES_TIPO = [
  { value: '', label: 'Todos los tipos' },
  { value: 'Tiempo completo', label: 'Jornada Completa' },
  { value: 'Medio tiempo', label: 'Part Time' },
  { value: 'Prácticas', label: 'Prácticas' },
];

export default function FiltrosVacantes({ filtros, onFilterChange }) {
  const [locales, setLocales] = useState(filtros);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuTipoAbierto, setMenuTipoAbierto] = useState(false);
  const menuRef = useRef(null);
  const menuTipoRef = useRef(null);

  // Cierra los menús al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
      if (menuTipoRef.current && !menuTipoRef.current.contains(e.target)) {
        setMenuTipoAbierto(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleInputChange = (campo, valor) => {
    setLocales((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleBuscar = () => {
    onFilterChange(locales);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBuscar();
  };

  const handleSeleccionarFecha = (value) => {
    const nuevos = { ...locales, fecha_rango: value };
    setLocales(nuevos);
    setMenuAbierto(false);
    onFilterChange(nuevos);
  };

  const handleSeleccionarTipo = (value) => {
    const nuevos = { ...locales, tipo_contrato: value };
    setLocales(nuevos);
    setMenuTipoAbierto(false);
    onFilterChange(nuevos);
  };

  const labelFecha = locales.fecha_rango
    ? OPCIONES_FECHA.find((o) => o.value === locales.fecha_rango)?.label
    : 'Fecha de publicación';
  const labelTipo = locales.tipo_contrato
    ? OPCIONES_TIPO.find((o) => o.value === locales.tipo_contrato)?.label
    : 'Tipo de empleo';
  const tieneFiltros = locales.cargo || locales.ubicacion || locales.fecha_rango || locales.tipo_contrato;

  return (
    <div className="space-y-2">
      {/* Fila 1: Cargo + Ubicación + Buscar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          placeholder="Cargo, puesto o palabra clave"
          value={locales.cargo}
          onChange={(e) => handleInputChange('cargo', e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
        />

        <input
          type="text"
          placeholder="Ciudad o ubicación"
          value={locales.ubicacion}
          onChange={(e) => handleInputChange('ubicacion', e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
        />

        <button
          type="button"
          onClick={handleBuscar}
          className="flex items-center gap-1.5 bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>

        {tieneFiltros && (
          <button
            type="button"
            onClick={() => {
              const limpios = { cargo: '', ubicacion: '', fecha_rango: '', tipo_contrato: '' };
              setLocales(limpios);
              onFilterChange(limpios);
            }}
            className="text-sm text-gray-400 hover:text-gray-600 font-medium whitespace-nowrap transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Fila 2: Dropdowns de fecha + tipo */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0 md:flex-none" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <span className="font-medium">{labelFecha}</span>
            <svg className={`w-3.5 h-3.5 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuAbierto && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {OPCIONES_FECHA.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => handleSeleccionarFecha(op.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    locales.fecha_rango === op.value
                      ? 'bg-orange-50 text-naranja font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 min-w-0 md:flex-none" ref={menuTipoRef}>
          <button
            type="button"
            onClick={() => setMenuTipoAbierto((v) => !v)}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <span className="font-medium">{labelTipo}</span>
            <svg className={`w-3.5 h-3.5 transition-transform ${menuTipoAbierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuTipoAbierto && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {OPCIONES_TIPO.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => handleSeleccionarTipo(op.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    locales.tipo_contrato === op.value
                      ? 'bg-orange-50 text-naranja font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
