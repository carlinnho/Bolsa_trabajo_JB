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
import BottomSheet from './BottomSheet';

const OPCIONES_FECHA = [
  { value: '', label: 'Todas las fechas' },
  { value: '24h', label: 'Últimas 24 horas' },
  { value: '3d', label: 'Últimos 3 días' },
  { value: '7d', label: 'Últimos 7 días' },
];

const OPCIONES_TIPO = [
  { value: '', label: 'Todos los tipos' },
  { value: 'Tiempo completo', label: 'Jornada Completa' },
  { value: 'Medio tiempo', label: 'Medio tiempo' },
  { value: 'Prácticas', label: 'Prácticas' },
  { value: 'Temporal', label: 'Temporal' },
  { value: 'Permanente', label: 'Permanente' },
  { value: 'Full Stack', label: 'Full Stack' },
];

const OPCIONES_MODALIDAD = [
  { value: '', label: 'Todas las modalidades' },
  { value: 'Presencial', label: 'Presencial' },
  { value: 'Remoto', label: 'Remoto' },
  { value: 'Híbrida', label: 'Híbrida' },
];

const CIUDADES = [
  'Remoto',
  'Lima, Perú',
  'Arequipa, Perú',
  'Cusco, Perú',
  'Trujillo, Perú',
  'Piura, Perú',
  'Chiclayo, Perú',
  'Huancayo, Perú',
  'Iquitos, Perú',
  'Tacna, Perú',
  'Ica, Perú',
  'Cajamarca, Perú',
  'Pucallpa, Perú',
  'Juliaca, Perú',
  'Ayacucho, Perú',
];

export default function FiltrosVacantes({ filtros, onFilterChange }) {
  const [locales, setLocales] = useState(filtros);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuTipoAbierto, setMenuTipoAbierto] = useState(false);
  const [menuModalidadAbierto, setMenuModalidadAbierto] = useState(false);
  const [menuActivo, setMenuActivo] = useState(null);
  const [sugerencias, setSugerencias] = useState([]);
  const [indiceSugerencia, setIndiceSugerencia] = useState(-1);
  const [inputUbicacionFoco, setInputUbicacionFoco] = useState(false);
  const menuRef = useRef(null);
  const menuTipoRef = useRef(null);
  const menuModalidadRef = useRef(null);

  // Cierra los menús al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
      if (menuTipoRef.current && !menuTipoRef.current.contains(e.target)) {
        setMenuTipoAbierto(false);
      }
      if (menuModalidadRef.current && !menuModalidadRef.current.contains(e.target)) {
        setMenuModalidadAbierto(false);
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

  const handleSeleccionarModalidad = (value) => {
    const nuevos = { ...locales, modalidad: value };
    setLocales(nuevos);
    setMenuModalidadAbierto(false);
    onFilterChange(nuevos);
  };

  const labelFecha = locales.fecha_rango
    ? OPCIONES_FECHA.find((o) => o.value === locales.fecha_rango)?.label
    : 'Fecha de publicación';
  const labelTipo = locales.tipo_contrato
    ? OPCIONES_TIPO.find((o) => o.value === locales.tipo_contrato)?.label
    : 'Tipo de empleo';
  const labelModalidad = locales.modalidad
    ? OPCIONES_MODALIDAD.find((o) => o.value === locales.modalidad)?.label
    : 'Modalidad';
  const tieneFiltros = locales.cargo || locales.ubicacion || locales.fecha_rango || locales.tipo_contrato || locales.modalidad;

  return (
    <div className="space-y-2">
      {/* Fila 1: Barra de búsqueda */}
      {/* Mobile: inputs separados */}
      <div className="flex md:hidden flex-col gap-2">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cargo, categoría o empresa"
            value={locales.cargo}
            onChange={(e) => handleInputChange('cargo', e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
          />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          <input
            type="text"
            placeholder="Lugar"
            value={locales.ubicacion}
            onChange={(e) => {
              const val = e.target.value;
              handleInputChange('ubicacion', val);
              if (val.length >= 1) {
                const filtradas = CIUDADES.filter((c) =>
                  c.toLowerCase().includes(val.toLowerCase())
                );
                setSugerencias(filtradas);
              } else {
                setSugerencias([]);
              }
              setIndiceSugerencia(-1);
            }}
            onFocus={() => {
              setInputUbicacionFoco(true);
              if (locales.ubicacion.length >= 1) {
                const filtradas = CIUDADES.filter((c) =>
                  c.toLowerCase().includes(locales.ubicacion.toLowerCase())
                );
                setSugerencias(filtradas);
              }
            }}
            onBlur={() => setTimeout(() => setInputUbicacionFoco(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIndiceSugerencia((i) => Math.min(i + 1, sugerencias.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIndiceSugerencia((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && indiceSugerencia >= 0) {
                handleInputChange('ubicacion', sugerencias[indiceSugerencia]);
                setSugerencias([]);
                setIndiceSugerencia(-1);
              } else {
                handleKeyDown(e);
              }
            }}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors"
          />
          {sugerencias.length > 0 && inputUbicacionFoco && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-48 overflow-y-auto">
              {sugerencias.map((ciudad, i) => (
                <button
                  key={ciudad}
                  type="button"
                  onMouseDown={() => {
                    handleInputChange('ubicacion', ciudad);
                    setSugerencias([]);
                    setIndiceSugerencia(-1);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    i === indiceSugerencia
                      ? 'bg-orange-50 text-naranja font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {ciudad}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleBuscar}
          className="w-full bg-naranja hover:bg-orange-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
        >
          Buscar empleos
        </button>
      </div>

      {/* Desktop: barra unificada */}
      <div className="hidden md:flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="relative flex-1 min-w-0">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cargo, categoría o empresa"
            value={locales.cargo}
            onChange={(e) => handleInputChange('cargo', e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none rounded-l-lg"
          />
        </div>

        <div className="w-px h-6 bg-gray-200 flex-shrink-0" />

        <div className="relative flex-1 min-w-0">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          <input
            type="text"
            placeholder="Lugar"
            value={locales.ubicacion}
            onChange={(e) => {
              const val = e.target.value;
              handleInputChange('ubicacion', val);
              if (val.length >= 1) {
                const filtradas = CIUDADES.filter((c) =>
                  c.toLowerCase().includes(val.toLowerCase())
                );
                setSugerencias(filtradas);
              } else {
                setSugerencias([]);
              }
              setIndiceSugerencia(-1);
            }}
            onFocus={() => {
              setInputUbicacionFoco(true);
              if (locales.ubicacion.length >= 1) {
                const filtradas = CIUDADES.filter((c) =>
                  c.toLowerCase().includes(locales.ubicacion.toLowerCase())
                );
                setSugerencias(filtradas);
              }
            }}
            onBlur={() => setTimeout(() => setInputUbicacionFoco(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIndiceSugerencia((i) => Math.min(i + 1, sugerencias.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIndiceSugerencia((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && indiceSugerencia >= 0) {
                handleInputChange('ubicacion', sugerencias[indiceSugerencia]);
                setSugerencias([]);
                setIndiceSugerencia(-1);
              } else {
                handleKeyDown(e);
              }
            }}
            className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none"
          />

          {sugerencias.length > 0 && inputUbicacionFoco && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-48 overflow-y-auto">
              {sugerencias.map((ciudad, i) => (
                <button
                  key={ciudad}
                  type="button"
                  onMouseDown={() => {
                    handleInputChange('ubicacion', ciudad);
                    setSugerencias([]);
                    setIndiceSugerencia(-1);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    i === indiceSugerencia
                      ? 'bg-orange-50 text-naranja font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {ciudad}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleBuscar}
          className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-r-lg transition-colors whitespace-nowrap flex-shrink-0"
        >
          Buscar empleos
        </button>
      </div>

      <div className="flex justify-end">
        {tieneFiltros && (
          <button
            type="button"
            onClick={() => {
              const limpios = { cargo: '', ubicacion: '', fecha_rango: '', tipo_contrato: '', modalidad: '' };
              setLocales(limpios);
              onFilterChange(limpios);
            }}
            className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Fila 2: Dropdowns de fecha + tipo */}
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <div className="relative flex-1 min-w-0 md:flex-none" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            className="w-full bg-white flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <span className="font-medium">{labelFecha}</span>
            <svg className={`w-3.5 h-3.5 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuAbierto && (
            <div className="absolute top-full left-0 right-0 mt-1 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
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
            className="w-full bg-white flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <span className="font-medium">{labelTipo}</span>
            <svg className={`w-3.5 h-3.5 transition-transform ${menuTipoAbierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuTipoAbierto && (
            <div className="absolute top-full left-0 right-0 mt-1 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
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

        <div className="relative flex-1 min-w-0 md:flex-none" ref={menuModalidadRef}>
          <button
            type="button"
            onClick={() => setMenuModalidadAbierto((v) => !v)}
            className="w-full bg-white flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <span className="font-medium">{labelModalidad}</span>
            <svg className={`w-3.5 h-3.5 transition-transform ${menuModalidadAbierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuModalidadAbierto && (
            <div className="absolute top-full left-0 right-0 mt-1 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {OPCIONES_MODALIDAD.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => handleSeleccionarModalidad(op.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    locales.modalidad === op.value
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

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setMenuActivo('fecha')}
          className="flex-shrink-0 bg-white flex items-center justify-between gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          <span className="font-medium truncate">{labelFecha}</span>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setMenuActivo('tipo')}
          className="flex-shrink-0 bg-white flex items-center justify-between gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          <span className="font-medium truncate">{labelTipo}</span>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setMenuActivo('modalidad')}
          className="flex-shrink-0 bg-white flex items-center justify-between gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          <span className="font-medium truncate">{labelModalidad}</span>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <BottomSheet
        open={menuActivo === 'fecha'}
        titulo="Fecha de publicación"
        opciones={OPCIONES_FECHA}
        valorSeleccionado={locales.fecha_rango}
        onSelect={handleSeleccionarFecha}
        onClose={() => setMenuActivo(null)}
      />
      <BottomSheet
        open={menuActivo === 'tipo'}
        titulo="Tipo de empleo"
        opciones={OPCIONES_TIPO}
        valorSeleccionado={locales.tipo_contrato}
        onSelect={handleSeleccionarTipo}
        onClose={() => setMenuActivo(null)}
      />
      <BottomSheet
        open={menuActivo === 'modalidad'}
        titulo="Modalidad"
        opciones={OPCIONES_MODALIDAD}
        valorSeleccionado={locales.modalidad}
        onSelect={handleSeleccionarModalidad}
        onClose={() => setMenuActivo(null)}
      />
    </div>
  );
}
