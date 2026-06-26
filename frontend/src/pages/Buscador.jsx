
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { listar, detalle, postular } from '../services/vacantesService';
import FiltrosVacantes from '../components/buscador/FiltrosVacantes';
import ListaVacantes from '../components/buscador/ListaVacantes';
import PanelDetalle from '../components/buscador/PanelDetalle';

const FILTROS_INICIALES = {
  cargo: '',
  ubicacion: '',
  fecha_rango: '',
  tipo_contrato: '',
};

export default function Buscador() {
  const navigate = useNavigate();

  const [vacantes, setVacantes] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const [vacanteDetalle, setVacanteDetalle] = useState(null);
  const [panelEstado, setPanelEstado] = useState('empty');
  const [listaLoading, setListaLoading] = useState(false);
  const [listaError, setListaError] = useState('');
  const [postulando, setPostulando] = useState(false);
  const [mensajePostulacion, setMensajePostulacion] = useState('');
  const [guardados, setGuardados] = useState(new Set());

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
    cargarLista(FILTROS_INICIALES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = useCallback(async (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    await cargarLista(nuevosFiltros);
  }, [cargarLista]);

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

  const handleVolver = useCallback(() => {
    setSeleccionadaId(null);
    setVacanteDetalle(null);
    setPanelEstado('empty');
  }, []);

  const handleGuardar = useCallback((id) => {
    setGuardados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handlePostular = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
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

  const handleReintentar = useCallback(() => {
    if (seleccionadaId) handleSelect(seleccionadaId);
  }, [seleccionadaId, handleSelect]);

  return (
    <div className="min-h-dvh bg-gray-100 flex flex-col">
      {mensajePostulacion && (
        <div className="fixed top-4 right-4 z-50 animate-fade-slide">
          <div className={`px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${
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

      <header className="bg-white border-b border-gray-200 h-14 flex-shrink-0 flex items-center px-6">
        <p className="text-sm text-gray-300 italic">Header — Navegación (en desarrollo)</p>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full p-4 flex flex-col min-h-0">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
          <FiltrosVacantes filtros={filtros} onFilterChange={handleFilterChange} />
        </div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <aside className={`w-full lg:w-[38%] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col ${
            seleccionadaId ? 'hidden lg:flex' : 'flex'
          }`}>
            <ListaVacantes
              vacantes={vacantes}
              seleccionadaId={seleccionadaId}
              onSelect={handleSelect}
              loading={listaLoading}
              error={listaError}
              guardados={guardados}
              onGuardar={handleGuardar}
            />
          </aside>

          <main className={`w-full lg:flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col ${
            seleccionadaId ? 'flex' : 'hidden lg:flex'
          }`}>
            <PanelDetalle
              estado={panelEstado}
              vacante={vacanteDetalle}
              error={listaError && panelEstado === 'error' ? listaError : ''}
              onPostular={handlePostular}
              onReintentar={handleReintentar}
              onVolver={handleVolver}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
