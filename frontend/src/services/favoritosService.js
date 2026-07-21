import { apiFetch } from "./api";

export const favoritosService = {
  listar: async () => {
    const data = await apiFetch("/favoritos/?action=listar");
    return data.data;
  },

  toggle: async (ofertaId) => {
    const data = await apiFetch("/favoritos/?action=toggle", {
      method: "POST",
      body: JSON.stringify({ oferta_id: ofertaId }),
    });
    return data.data;
  },

  verificar: async (ofertaId) => {
    const data = await apiFetch(`/favoritos/?action=verificar&oferta_id=${ofertaId}`);
    return data.data.es_favorito;
  },

  verificarMultiples: async (ofertaIds) => {
    const data = await apiFetch("/favoritos/?action=verificar_multiples", {
      method: "POST",
      body: JSON.stringify({ oferta_ids: ofertaIds }),
    });
    return data.data;
  },
};
