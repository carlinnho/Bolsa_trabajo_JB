import { useState, useMemo } from "react";
import { mockApplications } from "../data/mockApplications";

// Cuando llegue el backend, solo cambias esta importación
// por una llamada a services/ y el resto del hook no se toca.
const FILTROS = ["Todas", "Enviadas", "Vistas", "Contratado"];

const ESTADO_A_FILTRO = {
  enviada: "Enviadas",
  vista: "Vistas",
  contratado: "Contratado",
  no_seleccionado: "Todas",
};

export function useApplications() {
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const aplicacionesFiltradas = useMemo(() => {
    return mockApplications.filter((item) => {
      const coincideFiltro =
        filtroActivo === "Todas" ||
        ESTADO_A_FILTRO[item.estado] === filtroActivo;

      const coincideBusqueda =
        busqueda.trim() === "" ||
        item.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.empresa.toLowerCase().includes(busqueda.toLowerCase());

      return coincideFiltro && coincideBusqueda;
    });
  }, [filtroActivo, busqueda]);

  return {
    filtros: FILTROS,
    filtroActivo,
    setFiltroActivo,
    busqueda,
    setBusqueda,
    aplicaciones: aplicacionesFiltradas,
    total: mockApplications.length,
  };
}