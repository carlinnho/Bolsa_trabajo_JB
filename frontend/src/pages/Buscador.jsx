// ─────────────────────────────────────────────────────────────
// Buscador — Página principal del buscador interactivo (Split-Plane)
//
// Layout: panel izquierdo (lista + filtros) | panel derecho (detalle)
//   - Left: 40% ancho, scrollable, contiene Filtros + Lista de tarjetas
//   - Right: 60% ancho, header fijo con botón Postularme + contenido dinámico
//
// Flujo:
//   1. Al montar, llama a listar() para cargar las vacantes
//   2. Los filtros llaman a listar() con parámetros
//   3. Al seleccionar una tarjeta, llama a detalle(id)
//   4. "Postularme" verifica auth, si no hay token redirige a /login
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { listar, detalle, postular } from '../services/vacantesService';
import ListaVacantes from '../components/buscador/ListaVacantes';
import PanelDetalle from '../components/buscador/PanelDetalle';

const FILTROS_INICIALES = {
  cargo: '',
  empresa: '',
  fecha_desde: '',
  fecha_hasta: '',
};

export default function Buscador() {
  const navigate = useNavigate();

  // ─── Estados ─────────────────────────────────────────────
  const [vacantes, setVacantes] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const [vacanteDetalle, setVacanteDetalle] = useState(null);
  const [panelEstado, setPanelEstado] = useState('empty'); // 'empty' | 'loading' | 'detail' | 'error'
  const [listaLoading, setListaLoading] = useState(true);
  const [listaError, setListaError] = useState('');
  const [postulando, setPostulando] = useState(false);
  const [mensajePostulacion, setMensajePostulacion] = useState('');

  // ─── Carga inicial de la lista ───────────────────────────
  const cargarLista = useCallback(async (filtrosActuales) => {
    setListaLoading(true);
    setListaError('');
    try {
      const data = await listar(filtrosActuales);
      setVacantes(data);
    } catch (e) {
      setListaError(e.message || 'Error al cargar vacantes');
    } finally {
      setListaLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarLista(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Manejo de filtros ───────────────────────────────────
  const handleFilterChange = useCallback(async (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    await cargarLista(nuevosFiltros);
  }, [cargarLista]);

  // ─── Selección de vacante ────────────────────────────────
  const handleSelect = useCallback(async (id) => {
    setSeleccionadaId(id);
    setPanelEstado('loading');
    setVacanteDetalle(null);
    setMensajePostulacion('');

    try {
      const data = await detalle(id);
      setVacanteDetalle(data);
      setPanelEstado('detail');
    } catch {
      setPanelEstado('error');
      setVacanteDetalle(null);
    }
  }, []);

  // ─── Postulación ─────────────────────────────────────────
  const handlePostular = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!seleccionadaId || postulando) return;

    setPostulando(true);
    setMensajePostulacion('');

    try {
      const result = await postular(seleccionadaId);
      setMensajePostulacion(result.message);
    } catch (err) {
      if (err.message === 'Debes iniciar sesión para postularte') {
        navigate('/login');
      } else {
        setMensajePostulacion(err.message || 'Error al postularte');
      }
    } finally {
      setPostulando(false);
    }
  }, [seleccionadaId, postulando, navigate]);

  // ─── Reintentar carga de detalle ─────────────────────────
  const handleReintentar = useCallback(() => {
    if (seleccionadaId) handleSelect(seleccionadaId);
  }, [seleccionadaId, handleSelect]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Mensaje flotante de postulación */}
      {mensajePostulacion && (
        <div className="fixed top-4 right-4 z-50 animate-fade-slide">
          <div className={`px-5 py-3 rounded-xl shadow-lg text-sm font-medium ${
            mensajePostulacion.includes('Error') || mensajePostulacion.includes('error')
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mensajePostulacion.includes('Error') || mensajePostulacion.includes('error') ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              {mensajePostulacion}
            </div>
          </div>
        </div>
      )}

      {/* Split-plane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Panel izquierdo: lista + filtros (40%) */}
        <aside className="w-full md:w-[40%] border-r border-gray-100 bg-gray-50 overflow-hidden">
          <ListaVacantes
            vacantes={vacantes}
            seleccionadaId={seleccionadaId}
            filtros={filtros}
            onSelect={handleSelect}
            onFilterChange={handleFilterChange}
            loading={listaLoading}
            error={listaError}
          />
        </aside>

        {/* Panel derecho: detalle (60%) */}
        <main className="flex-1 overflow-hidden">
          <PanelDetalle
            estado={panelEstado}
            vacante={vacanteDetalle}
            error={listaError && panelEstado === 'error' ? listaError : ''}
            onPostular={handlePostular}
            onReintentar={handleReintentar}
          />
        </main>
      </div>
    </div>
  );
}
