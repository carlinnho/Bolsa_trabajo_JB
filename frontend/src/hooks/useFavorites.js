import { useState } from "react";
import { mockFavorites } from "../data/mockFavorites";

// Cuando llegue el backend, solo cambias esta importación
// por una llamada a services/ y el resto del hook no se toca.
export function useFavorites() {
  const [favoritos, setFavoritos] = useState(mockFavorites);

  const eliminarFavorito = (id) => {
    setFavoritos((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    favoritos,
    total: favoritos.length,
    eliminarFavorito,
  };
}