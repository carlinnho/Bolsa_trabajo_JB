// src/services/authService.js
import { apiFetch } from "./api";

export const authService = {
  login: async (credentials) => {
    const data = await apiFetch("/auth/?action=login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    // Guardar token y usuario en localStorage al loguearse
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }
    return data;
  },

  googleLogin: async (credential) => {
    const data = await apiFetch("/auth/?action=google_login", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }
    return data;
  },

  register: async (userData) => {
    const data = await apiFetch("/auth/?action=register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirigir al login
  },
};
