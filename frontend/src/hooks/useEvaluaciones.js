import { useState, useEffect, useMemo } from "react";
import { evaluacionesService } from "../services/evaluacionesService";

export function useEvaluaciones() {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setIsLoading(true);
      try {
        const data = await evaluacionesService.listarEmpresas();
        setEmpresas(data);
      } catch {
        setEmpresas([]);
      } finally {
        setIsLoading(false);
      }
    };
    cargar();
  }, []);

  // Filtrado local por busqueda para respuesta inmediata
  const empresasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return empresas;
    const q = busqueda.toLowerCase();
    return empresas.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      (e.sector || "").toLowerCase().includes(q)
    );
  }, [empresas, busqueda]);

  return {
    empresas: empresasFiltradas,
    total: empresas.length,
    isLoading,
    busqueda,
    setBusqueda,
  };
}