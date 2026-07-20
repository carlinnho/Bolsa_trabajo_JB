import { apiFetch } from "./api";

const BASE_ENDPOINT = "/admin/?resource=empresas";

export const empresasService = {
  listar: () => apiFetch(`${BASE_ENDPOINT}&action=listar`),

  crear: (formData) =>
    apiFetch(`${BASE_ENDPOINT}&action=crear`, {
      method: "POST",
      body: formData,
    }),

  editar: (formData) =>
    apiFetch(`${BASE_ENDPOINT}&action=editar`, {
      method: "POST",
      body: formData,
    }),

  eliminar: (id) => {
    const formData = new FormData();
    formData.append("id", id);
    return apiFetch(`${BASE_ENDPOINT}&action=eliminar`, {
      method: "POST",
      body: formData,
    });
  },
};
