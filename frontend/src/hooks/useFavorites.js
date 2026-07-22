import { useState, useEffect, useCallback } from "react";
import { favoritosService } from "../services/favoritosService";

export function useFavorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarFavoritos = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFavoritos([]);
      setCargando(false);
      return;
    }
    try {
      setCargando(true);
      const data = await favoritosService.listar();
      setFavoritos(data);
    } catch {
      setFavoritos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  const toggleFavorito = useCallback(async (ofertaId) => {
    const resultado = await favoritosService.toggle(ofertaId);
    if (resultado.accion === "agregado") {
      setFavoritos((prev) => {
        const yaExiste = prev.some((f) => f.oferta_id === ofertaId);
        if (yaExiste) return prev;
        return [{ oferta_id: ofertaId, fecha_guardado: new Date().toISOString() }, ...prev];
      });
    } else {
      setFavoritos((prev) => prev.filter((f) => f.oferta_id !== ofertaId));
    }
    return resultado;
  }, []);

  const eliminarFavorito = useCallback(async (ofertaId) => {
    await favoritosService.toggle(ofertaId);
    setFavoritos((prev) => prev.filter((f) => f.oferta_id !== ofertaId));
  }, []);

  const esFavorito = useCallback((ofertaId) => {
    return favoritos.some((f) => f.oferta_id === ofertaId);
  }, [favoritos]);

  return {
    favoritos,
    total: favoritos.length,
    cargando,
    toggleFavorito,
    eliminarFavorito,
    esFavorito,
    recargar: cargarFavoritos,
  };
}
