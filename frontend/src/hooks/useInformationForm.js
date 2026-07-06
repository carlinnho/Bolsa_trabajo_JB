import { useState } from "react";
import { userService } from "../services/userService";

const PHONE_REGEX = /^9\d{8}$/;

export function useInformationForm() {
  const [telefono, setTelefono] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [cvArchivo, setCvArchivo] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  const isDirty = telefono !== "" || presentacion !== "";

  const validateForm = () => {
    const newErrors = {};

    if (!telefono.trim()) {
      newErrors.telefono = "El número de teléfono es obligatorio.";
    } else if (!PHONE_REGEX.test(telefono.trim())) {
      newErrors.telefono = "Debe empezar con 9 y contener 9 dígitos en total.";
    }

    if (presentacion.trim() !== "" && presentacion.trim().length < 20) {
      newErrors.presentacion = "La presentación debe tener al menos 20 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");

    try {
      // Leemos el nombre del usuario guardado en localStorage por authService
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      await userService.updateProfile({
        nombre_completo: user.nombre_completo,
        telefono: telefono.trim(),
        texto_presentacion: presentacion.trim(),
        cv: cvArchivo instanceof File ? cvArchivo : undefined,
      });

      setSuccessMessage("¡Perfil actualizado correctamente!");
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDescartar = () => {
    setTelefono("");
    setPresentacion("");
    setErrors({});
    setSuccessMessage("");
    setGeneralError("");
  };

  return {
    telefono, setTelefono,
    presentacion, setPresentacion,
    cvArchivo, setCvArchivo,
    errors,
    clearError,
    isDirty,
    isLoading,
    successMessage,
    generalError,
    handleGuardar,
    handleDescartar,
  };
}