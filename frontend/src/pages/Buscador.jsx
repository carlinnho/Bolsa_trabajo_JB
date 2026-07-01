import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { listar, detalle, postular } from "../services/vacantesService";
import FiltrosVacantes from "../components/buscador/FiltrosVacantes";
import ListaVacantes from "../components/buscador/ListaVacantes";
import PanelDetalle from "../components/buscador/PanelDetalle";

const ITEMS_POR_PAGINA = 15;

const FILTROS_INICIALES = {
  cargo: "",
  ubicacion: "",
  fecha_rango: "",
  tipo_contrato: "",
  modalidad: "",
};

export default function Buscador() {
  const navigate = useNavigate();

  const [vacantes, setVacantes] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const [vacanteDetalle, setVacanteDetalle] = useState(null);
  const [panelEstado, setPanelEstado] = useState("empty");
  const [listaLoading, setListaLoading] = useState(false);
  const [listaError, setListaError] = useState("");
  const [postulando, setPostulando] = useState(false);
  const [mensajePostulacion, setMensajePostulacion] = useState("");
  const [guardados, setGuardados] = useState(new Set());
  const [pagina, setPagina] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  const cargarLista = useCallback(async (filtrosActuales) => {
    setListaLoading(true);
    setListaError("");
    try {
      const data = await listar(filtrosActuales);
      setVacantes(data);
    } catch (e) {
      setListaError(e.message || "Error al cargar vacantes");
    } finally {
      setListaLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarLista(FILTROS_INICIALES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPagina(0);
  }, [vacantes.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalPaginas = Math.ceil(vacantes.length / ITEMS_POR_PAGINA);
  const inicio = pagina * ITEMS_POR_PAGINA;
  const visibles = vacantes.slice(inicio, inicio + ITEMS_POR_PAGINA);

  const handleFilterChange = useCallback(
    async (nuevosFiltros) => {
      setFiltros(nuevosFiltros);
      await cargarLista(nuevosFiltros);
    },
    [cargarLista],
  );

  const handleSelect = useCallback(async (id) => {
    setSeleccionadaId(id);
    setPanelEstado("loading");
    setVacanteDetalle(null);
    setMensajePostulacion("");

    try {
      const data = await detalle(id);
      setVacanteDetalle(data);
      setPanelEstado("detail");
    } catch {
      setPanelEstado("error");
      setVacanteDetalle(null);
    }
  }, []);

  const handleVolver = useCallback(() => {
    setSeleccionadaId(null);
    setVacanteDetalle(null);
    setPanelEstado("empty");
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!seleccionadaId || postulando) return;

    setPostulando(true);
    setMensajePostulacion("");

    try {
      const result = await postular(seleccionadaId);
      setMensajePostulacion(result.message);
    } catch (err) {
      if (err.message === "Debes iniciar sesión para postularte") {
        navigate("/login");
      } else {
        setMensajePostulacion(err.message || "Error al postularte");
      }
    } finally {
      setPostulando(false);
    }
  }, [seleccionadaId, postulando, navigate]);

  const handleReintentar = useCallback(() => {
    if (seleccionadaId) handleSelect(seleccionadaId);
  }, [seleccionadaId, handleSelect]);

  return (
    <div className="min-h-dvh bg-[#eef3f9] flex flex-col overflow-x-clip">
      {mensajePostulacion && (
        <div className="fixed top-4 right-4 z-50 animate-fade-slide">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${
              mensajePostulacion.includes("Error") ||
              mensajePostulacion.includes("error")
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mensajePostulacion.includes("Error") ||
                mensajePostulacion.includes("error") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
              </svg>
              {mensajePostulacion}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full p-6 flex flex-col">
        <div className="p-5 mb-5 flex-shrink-0">
          <FiltrosVacantes
            filtros={filtros}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          <div
            className={`w-full lg:w-[42%] flex flex-col ${
              seleccionadaId ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex items-center gap-3 bg-[#eef3f9] border-b border-gray-200/50 py-3 px-5 sticky top-0 z-40">
              <svg className="w-5 h-5 text-naranja flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-montserrat font-bold text-azul text-base">EMPLEOS PARA TI</span>
            </div>
            <aside className="flex flex-col bg-[#eef3f9] rounded-lg shadow-sm">
              <ListaVacantes
                vacantes={visibles}
                seleccionadaId={seleccionadaId}
                onSelect={handleSelect}
                loading={listaLoading}
                error={listaError}
                guardados={guardados}
                onGuardar={handleGuardar}
              />

              {totalPaginas > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setPagina((p) => Math.max(0, p - 1))}
                    disabled={pagina === 0}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-default transition-all shadow-sm cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Anterior
                  </button>

                  {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPagina(i)}
                      className={`w-9 h-9 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                        pagina === i
                          ? "bg-naranja text-white shadow-sm"
                          : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setPagina((p) => Math.min(totalPaginas - 1, p + 1))
                    }
                    disabled={pagina >= totalPaginas - 1}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-default transition-all shadow-sm cursor-pointer"
                  >
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </aside>
          </div>

          <main
            className={`w-full lg:flex-1 bg-white rounded-lg shadow-sm flex flex-col lg:sticky lg:overflow-y-auto ${
              seleccionadaId ? "flex" : "hidden lg:flex"
            } ${
              headerHidden
                ? "lg:top-0 lg:max-h-screen"
                : "lg:top-20 lg:max-h-[calc(100vh-5rem)]"
            }`}
          >
            <PanelDetalle
              estado={panelEstado}
              vacante={vacanteDetalle}
              error={listaError && panelEstado === "error" ? listaError : ""}
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
