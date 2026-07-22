import { apiFetch } from "./api";

const BASE_ENDPOINT = "/admin/?resource=ofertas";

export const ofertasService = {
  listar: () => apiFetch(`${BASE_ENDPOINT}&action=listar`),

  crear: (data) =>
    apiFetch(`${BASE_ENDPOINT}&action=crear`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  editar: (data) =>
    apiFetch(`${BASE_ENDPOINT}&action=editar`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  eliminar: (id) =>
    apiFetch(`${BASE_ENDPOINT}&action=eliminar`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }),

  toggleEstado: (id) =>
    apiFetch(`${BASE_ENDPOINT}&action=toggle_estado`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }),

  cerrar: (id) =>
    apiFetch(`${BASE_ENDPOINT}&action=cerrar`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }),
};
