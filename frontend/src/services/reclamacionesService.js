import { apiFetch } from "./api";

export const reclamacionesService = {
  crear: (datos) =>
    apiFetch("/reclamaciones/?action=crear", {
      method: "POST",
      body: JSON.stringify(datos),
    }),

  adminListar: () =>
    apiFetch("/reclamaciones/?action=admin_listar").then(r => r.data),

  adminDetalle: (id) =>
    apiFetch(`/reclamaciones/?action=admin_detalle&id=${id}`).then(r => r.data),

  adminActualizar: ({ id, estado, respuesta_admin }) =>
    apiFetch("/reclamaciones/?action=admin_actualizar", {
      method: "POST",
      body: JSON.stringify({ id, estado, respuesta_admin }),
    }),
};