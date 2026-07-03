import { useState } from "react";
import { authService } from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,_\-]).{8,}$/;
const PHONE_REGEX = /^\d{9}$/;

const INITIAL_FORM = {
  nombre: "",
  correo: "",
  password: "",
  telefono: "",
  cv: null,
};

export function useRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);

  const passwordChecks = {
    hasMinLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasSymbol: /[!@#$%^&*.,_\-]/.test(formData.password),
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!EMAIL_REGEX.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo válido.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = "La contraseña no cumple con los requisitos.";
    }

    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!PHONE_REGEX.test(formData.telefono)) {
      newErrors.telefono = "Debe contener exactamente 9 dígitos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Evitar doble clic

    setGeneralError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = {
        nombre_completo: formData.nombre,
        correo: formData.correo,
        password: formData.password,
        telefono: formData.telefono,
      };

      const response = await authService.register(userData);

      if (response.success) {
        setSuccessMessage(
          "¡Cuenta creada! Por favor revisa tu bandeja de entrada para verificar tu correo.",
        );
        setFormData(INITIAL_FORM);
      }
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    generalError,
    successMessage,
    isLoading,
    showPassword,
    setShowPassword,
    passwordChecks,
    handleChange,
    handleSubmit,
  };
}
