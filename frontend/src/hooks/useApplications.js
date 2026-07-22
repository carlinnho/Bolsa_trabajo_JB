import { useState, useMemo, useEffect } from "react";
import { vacantesService } from "../services/vacantesService";

const FILTROS = ["Todas", "Enviadas", "Vistas", "Contratado", "No seleccionado"];

const ESTADO_A_FILTRO = {
  recibido: "Enviadas",
  revisado: "Enviadas",
  entrevista: "Vistas",
  aprobado: "Contratado",
  rechazado: "No seleccionado",
};

export function useApplications() {
  const [aplicaciones, setAplicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // Carga las postulaciones reales del usuario al montar
  useEffect(() => {
    const cargar = async () => {
      setIsLoading(true);
      try {
        // mis_postulaciones devuelve solo los IDs, necesitamos el detalle completo
        const token = localStorage.getItem("token");
        if (!token) { setAplicaciones([]); return; }

        const response = await vacantesService.misPostulacionesDetalle();
        setAplicaciones(response || []);
      } catch {
        setAplicaciones([]);
      } finally {
        setIsLoading(false);
      }
    };
    cargar();
  }, []);

  const aplicacionesFiltradas = useMemo(() => {
    return aplicaciones.filter((item) => {
      const coincideFiltro =
        filtroActivo === "Todas" ||
        ESTADO_A_FILTRO[item.estado] === filtroActivo;

      const coincideBusqueda =
        busqueda.trim() === "" ||
        item.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.empresa.toLowerCase().includes(busqueda.toLowerCase());

      return coincideFiltro && coincideBusqueda;
    });
  }, [aplicaciones, filtroActivo, busqueda]);

  return {
    filtros: FILTROS,
    filtroActivo,
    setFiltroActivo,
    busqueda,
    setBusqueda,
    aplicaciones: aplicacionesFiltradas,
    total: aplicaciones.length,
    isLoading,
  };
}