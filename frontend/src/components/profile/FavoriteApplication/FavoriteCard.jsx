import { useState, useCallback } from "react";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { vacantesService } from "../../../services/vacantesService";
import DetalleVacante from "../../buscador/DetalleVacante";
import PreguntasFiltro from "../../buscador/PreguntasFiltro";
import ConfirmacionCV from "../../buscador/ConfirmacionCV";

const MODALIDAD_COLOR = {
  presencial: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  remoto: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  "híbrido": "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Presencial: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Remoto: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
  Híbrido: "text-[#0e7490] bg-[#ecfeff] border-[#a5f3fc]",
};

const MAP_TIPO = {
  indefinido: "Tiempo completo",
  temporal: "Temporal",
  freelance: "Freelance",
  "prácticas": "Prácticas",
  por_horas: "Por horas",
};

function calcularTiempo(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `${diffMin} min`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h`;
  const diffDias = Math.floor(diffHrs / 24);
  if (diffDias < 7) return `${diffDias} día${diffDias > 1 ? "s" : ""}`;
  const diffSemanas = Math.floor(diffDias / 7);
  return `${diffSemanas} semana${diffSemanas > 1 ? "s" : ""}`;
}

function calcularCierraEn(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = fecha - ahora;
  if (diffMs <= 0) return "Ya cerró";
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return "Cierra hoy";
  if (diffDias === 1) return "Cierra mañana";
  return `Cierra en ${diffDias} días`;
}

function getIniciales(nombre) {
  if (!nombre) return "??";
  return nombre.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

function getColor(nombre) {
  if (!nombre) return "#6b7a9f";
  const colores = ["#123498", "#0e7490", "#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed"];
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  return colores[Math.abs(hash) % colores.length];
}

export default function FavoriteCard({ favorito, onEliminar }) {
  const navigate = useNavigate();

  const ofertaId = favorito.oferta_id || favorito.id;
  const titulo = favorito.titulo || favorito.cargo || "Sin título";
  const empresaNombre = favorito.empresa_nombre || favorito.empresa || "Empresa";
  const ubicacion = favorito.ubicacion || "Sin ubicación";
  const modalidad = favorito.modalidad || "";
  const tipoContrato = favorito.tipo_contrato || favorito.tipoEmpleo || "";
  const salarioMin = favorito.salario_min ?? favorito.salarioMin ?? 0;
  const salarioMax = favorito.salario_max ?? favorito.salarioMax ?? 0;
  const descripcion = favorito.descripcion || "";

  const inicialesLogo = getIniciales(empresaNombre);
  const colorLogo = getColor(empresaNombre);
  const guardadoHace = calcularTiempo(favorito.fecha_guardado);
  const cierraEn = calcularCierraEn(favorito.fecha_expiracion);
  const tipoLabel = MAP_TIPO[tipoContrato] || tipoContrato;

  // ── Modal de Detalles ──────────────────────────────────────
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [vacanteDetalle, setVacanteDetalle] = useState(null);
  const [detalleLoading, setDetalleLoading] = useState(false);
  const [detalleError, setDetalleError] = useState("");

  const abrirDetalle = useCallback(async () => {
    setDetalleAbierto(true);
    setDetalleLoading(true);
    setDetalleError("");
    try {
      const data = await vacantesService.detalle(ofertaId);
      if (data.fecha_creacion && !data.fecha_publicacion) {
        data.fecha_publicacion = data.fecha_creacion.split(" ")[0];
      }
      setVacanteDetalle(data);
    } catch (e) {
      setDetalleError(e.message || "Error al cargar detalles");
    } finally {
      setDetalleLoading(false);
    }
  }, [ofertaId]);

  const cerrarDetalle = useCallback(() => {
    setDetalleAbierto(false);
    setVacanteDetalle(null);
    setDetalleError("");
  }, []);

  // ── Modal de Postulación ───────────────────────────────────
  const [postulacionAbierta, setPostulacionAbierta] = useState(false);
  const [vacantePostulacion, setVacantePostulacion] = useState(null);
  const [postulacionLoading, setPostulacionLoading] = useState(false);
  const [postulacionStep, setPostulacionStep] = useState(null);
  const [respuestasFiltro, setRespuestasFiltro] = useState({});
  const [postulando, setPostulando] = useState(false);
  const [exitoPostulacion, setExitoPostulacion] = useState(false);
  const [errorPostulacion, setErrorPostulacion] = useState("");

  const abrirPostulacion = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setPostulacionAbierta(true);
    setPostulacionLoading(true);
    setErrorPostulacion("");
    setExitoPostulacion(false);
    try {
      const data = await vacantesService.detalle(ofertaId);
      setVacantePostulacion(data);
      setRespuestasFiltro({});
      setPostulacionStep("preguntas");
    } catch (e) {
      setErrorPostulacion(e.message || "Error al cargar la oferta");
    } finally {
      setPostulacionLoading(false);
    }
  }, [ofertaId, navigate]);

  const cerrarPostulacion = useCallback(() => {
    setPostulacionAbierta(false);
    setVacantePostulacion(null);
    setPostulacionStep(null);
    setRespuestasFiltro({});
    setPostulando(false);
    setExitoPostulacion(false);
    setErrorPostulacion("");
  }, []);

  const handlePreguntasCompletadas = useCallback(() => {
    setPostulacionStep("cv");
  }, []);

  const handleVolverAPreguntas = useCallback(() => {
    setPostulacionStep("preguntas");
  }, []);

  const handleCancelarPostulacion = useCallback(() => {
    setPostulacionStep(null);
    setRespuestasFiltro({});
  }, []);

  const handlePostularConCV = useCallback(async (cvFile) => {
    if (!ofertaId || postulando) return;
    setPostulando(true);
    setErrorPostulacion("");
    try {
      await vacantesService.postular(ofertaId, respuestasFiltro, cvFile);
      setExitoPostulacion(true);
      setPostulacionStep("exito");
      setRespuestasFiltro({});
    } catch (e) {
      if (e.message === "Debes iniciar sesión para postularte") {
        cerrarPostulacion();
        navigate("/login");
      } else {
        setErrorPostulacion(e.message || "Error al postular");
      }
    } finally {
      setPostulando(false);
    }
  }, [ofertaId, respuestasFiltro, postulando, cerrarPostulacion, navigate]);

  const renderWizardPostulacion = () => {
    if (postulacionStep === "preguntas") {
      return (
        <PreguntasFiltro
          preguntas={vacantePostulacion?.preguntas_filtro || []}
          respuestas={respuestasFiltro}
          onChange={(id, val) => setRespuestasFiltro((prev) => ({ ...prev, [id]: val }))}
          onSiguiente={handlePreguntasCompletadas}
          onAtras={handleCancelarPostulacion}
        />
      );
    }
    if (postulacionStep === "cv") {
      return (
        <ConfirmacionCV
          onPostular={handlePostularConCV}
          onAtras={handleVolverAPreguntas}
          postulando={postulando}
        />
      );
    }
    if (postulacionStep === "exito") {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-montserrat font-bold text-lg text-azul mb-2">¡Postulación enviada!</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">
            Tu postulación para <strong>{vacantePostulacion?.titulo}</strong> fue enviada exitosamente. El empleador revisará tu perfil.
          </p>
          <button
            type="button"
            onClick={cerrarPostulacion}
            className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Cerrar
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="rounded-2xl bg-white border border-[#e8edf5] px-6 py-5 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_auto] gap-4 sm:flex sm:flex-row sm:gap-5 items-start">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white col-start-1 row-start-1"
            style={{ backgroundColor: colorLogo }}
          >
            {inicialesLogo}
          </div>

          <div className="flex flex-1 flex-col gap-1 min-w-0 col-span-2 row-start-2 sm:col-auto sm:row-auto">
            <span className="text-[15px] font-bold text-[#1c2a52]">{titulo}</span>
            <span className="text-xs text-[#6b7a9f]">
              {empresaNombre} · {ubicacion}
            </span>

            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {tipoLabel && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e7edfb] px-3 py-1 text-xs font-medium text-azul-marino">
                  <BuildingOfficeIcon className="h-3.5 w-3.5" />
                  {tipoLabel}
                </span>
              )}
              {modalidad && (
                <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium ${MODALIDAD_COLOR[modalidad] ?? "text-[#6b7a9f] bg-[#f8fafc] border-[#e8edf5]"}`}>
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {modalidad}
                </span>
              )}
              {salarioMin > 0 && (
                <span className="inline-flex items-center rounded-lg bg-[#eef1f8] px-3 py-1 text-xs font-medium text-[#7d8593]">
                  S/ {Number(salarioMin).toLocaleString()} – {Number(salarioMax).toLocaleString()}
                </span>
              )}
            </div>

            {descripcion && (
              <p className="text-sm mt-3 leading-relaxed text-[#6b7a9f] line-clamp-2">{descripcion}</p>
            )}
          </div>

          <button
            type="button"
            aria-label="Quitar de favoritos"
            onClick={() => onEliminar(ofertaId)}
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-400 transition hover:bg-red-100 col-start-2 row-start-1 justify-self-end"
          >
            <HeartSolid className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-3 border-t border-[#f1f5f9] pt-4">
          <div className="flex items-center gap-4 text-xs text-[#9aa3bd]">
            {guardadoHace && (
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5" />
                Guardado hace {guardadoHace}
              </span>
            )}

            {cierraEn && (
              <span className="flex items-center gap-1.5 text-naranja font-semibold">
                <ArrowPathIcon className="h-3.5 w-3.5" />
                {cierraEn}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 justify-center">
            <button
              type="button"
              onClick={abrirDetalle}
              className="rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-5 py-2.5 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc]"
            >
              Ver detalles
            </button>
            <button
              type="button"
              onClick={abrirPostulacion}
              className="flex items-center gap-2 rounded-xl bg-[#f46f0b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d65f09]"
            >
              Postular
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal Detalles ────────────────────────────────────── */}
      {detalleAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={cerrarDetalle} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h2 className="font-montserrat font-bold text-azul text-base">Detalles de la oferta</h2>
              <button type="button" onClick={cerrarDetalle} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {detalleLoading && (
                <div className="flex items-center justify-center p-12 text-sm text-gray-400">
                  <svg className="animate-spin h-5 w-5 mr-2 text-naranja" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cargando detalles...
                </div>
              )}
              {detalleError && (
                <div className="p-12 text-center text-sm text-red-500">{detalleError}</div>
              )}
              {vacanteDetalle && !detalleLoading && (
                <DetalleVacante vacante={vacanteDetalle} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Postulación ─────────────────────────────────── */}
      {postulacionAbierta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={cerrarPostulacion} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="font-montserrat font-bold text-azul text-base">
                  {postulacionStep === "exito" ? "Postulación" : `Postular a ${vacantePostulacion?.titulo || "..."}`}
                </h2>
                {postulacionStep && postulacionStep !== "exito" && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`w-2 h-2 rounded-full ${postulacionStep === "preguntas" ? "bg-naranja" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-400">Preguntas</span>
                    <span className={`w-2 h-2 rounded-full ${postulacionStep === "cv" ? "bg-naranja" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-400">CV</span>
                  </div>
                )}
              </div>
              <button type="button" onClick={cerrarPostulacion} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {postulacionLoading && (
                <div className="flex items-center justify-center p-12 text-sm text-gray-400">
                  <svg className="animate-spin h-5 w-5 mr-2 text-naranja" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cargando...
                </div>
              )}
              {errorPostulacion && !postulacionLoading && (
                <div className="p-12 text-center text-sm text-red-500">{errorPostulacion}</div>
              )}
              {!postulacionLoading && renderWizardPostulacion()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
