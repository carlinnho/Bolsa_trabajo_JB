// src/services/userService.js
import { apiFetch } from "./api";

const BASE_URL = "http://localhost/backend-bolsajb/api";

export const userService = {

  // ─── ACTUALIZAR PERFIL Y SUBIR CV ───────────────────────────────────────
  // Usa fetch manual (no apiFetch) porque el backend espera multipart-form,
  // no JSON. Si ponemos Content-Type: application/json, PHP no lee $_FILES ni $_POST.
  updateProfile: async ({ nombre_completo, telefono, texto_presentacion, cv }) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (nombre_completo) formData.append("nombre_completo", nombre_completo);
    if (telefono)        formData.append("telefono", telefono);
    if (texto_presentacion !== undefined) formData.append("texto_presentacion", texto_presentacion);
    if (cv instanceof File) formData.append("cv", cv);

    const response = await fetch(`${BASE_URL}/users/?action=update_profile`, {
      method: "POST",
      headers: {
        // NO ponemos Content-Type aquí: el navegador lo genera automáticamente
        // con el boundary correcto para multipart/form-data.
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al actualizar el perfil.");
    return data;
  },

  // ─── SOLICITAR CÓDIGO DE CAMBIO DE CONTRASEÑA ───────────────────────────
  // Solo necesita el JWT (ya lo adjunta apiFetch). Sin body.
  requestPasswordChange: async () => {
    return apiFetch("/users/?action=request_password_change", {
      method: "POST",
    });
  },

  // ─── VERIFICAR CÓDIGO Y GUARDAR NUEVA CONTRASEÑA ────────────────────────
  verifyPasswordChange: async ({ codigo, nueva_password }) => {
    return apiFetch("/users/?action=verify_password_change", {
      method: "POST",
      body: JSON.stringify({ codigo, nueva_password }),
    });
  },
};