import { useState } from "react";

const PHONE_REGEX = /^9\d{8}$/;

export function useInformationForm() {
  const [telefono, setTelefono] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [cvArchivo, setCvArchivo] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Guardando datos...", { telefono, presentacion, cvArchivo });
  };

  const handleDescartar = () => {
    setTelefono("");
    setPresentacion("");
    setErrors({});
  };

  return {
    telefono, setTelefono,
    presentacion, setPresentacion,
    cvArchivo, setCvArchivo,
    errors,
    clearError,
    isDirty,
    handleGuardar,
    handleDescartar,
  };
}