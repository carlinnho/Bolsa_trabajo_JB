import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useLoginForm() {
  const navigate = useNavigate();

  const savedEmail = localStorage.getItem("remembered_email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    correo: savedEmail,
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(!!savedEmail);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.correo) newErrors.correo = "El correo es obligatorio.";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    try {
      const response = await authService.login({
        correo: formData.correo,
        password: formData.password,
      });

      if (response.success) {
        if (rememberMe) {
          localStorage.setItem("remembered_email", formData.correo);
        } else {
          localStorage.removeItem("remembered_email");
        }
        const user = response.data?.user;
        navigate(user?.rol_nombre === "admin" ? "/admin" : "/");
      }
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  return {
    formData,
    errors,
    generalError,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit,
  };
}