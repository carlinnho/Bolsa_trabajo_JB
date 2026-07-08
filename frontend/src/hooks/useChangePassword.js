import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,_\-]).{8,}$/;

export function useChangePassword() {
  const navigate = useNavigate();

  // Paso actual: "codigo" | "nueva_password"
  const [paso, setPaso] = useState("codigo");

  const [codigo, setCodigo] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordChecks = {
    hasMinLength: nuevaPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(nuevaPassword),
    hasSymbol: /[!@#$%^&*.,_\-]/.test(nuevaPassword),
  };

  // ── PASO 1: validar el código ingresado (solo presencia) ────────────────
  const validateCodigo = () => {
    const newErrors = {};
    if (!codigo.trim()) {
      newErrors.codigo = "El código es obligatorio.";
    } else if (!/^\d{6}$/.test(codigo.trim())) {
      newErrors.codigo = "El código debe tener exactamente 6 dígitos.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── PASO 2: validar la nueva contraseña ─────────────────────────────────
  const validatePassword = () => {
    const newErrors = {};
    if (!nuevaPassword) {
      newErrors.nuevaPassword = "La contraseña es obligatoria.";
    } else if (!PASSWORD_REGEX.test(nuevaPassword)) {
      newErrors.nuevaPassword = "La contraseña no cumple los requisitos.";
    }
    if (!confirmarPassword) {
      newErrors.confirmarPassword = "Debes confirmar la contraseña.";
    } else if (nuevaPassword !== confirmarPassword) {
      newErrors.confirmarPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // ── Avanzar del paso 1 al paso 2 ────────────────────────────────────────
  const handleSubmitCodigo = (e) => {
    e.preventDefault();
    if (!validateCodigo()) return;
    // No llamamos al backend aquí: el código se valida junto con la nueva
    // contraseña en verify_password_change (un solo endpoint para los dos datos).
    setPaso("nueva_password");
  };

  // ── Paso 2: enviar código + nueva contraseña al backend ─────────────────
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      await userService.verifyPasswordChange({
        codigo: codigo.trim(),
        nueva_password: nuevaPassword,
      });
      // Éxito: redirigir al perfil con flag de éxito en la URL
      navigate("/mi-perfil?password_updated=1");
    } catch (error) {
      // Si el error viene del código incorrecto/expirado, volvemos al paso 1
      setGeneralError(error.message);
      if (
        error.message.toLowerCase().includes("código") ||
        error.message.toLowerCase().includes("expirado")
      ) {
        setPaso("codigo");
        setCodigo("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    paso,
    codigo, setCodigo,
    nuevaPassword, setNuevaPassword,
    confirmarPassword, setConfirmarPassword,
    showPassword, setShowPassword,
    passwordChecks,
    errors,
    generalError,
    isLoading,
    clearError,
    handleSubmitCodigo,
    handleSubmitPassword,
  };
}