import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

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
        navigate("/"); // Redirigir al Home o Dashboard tras éxito
      }
    } catch (error) {
      // Mostrar el error real que manda el backend PHP
      setGeneralError(error.message);
    }
  };

  return {
    formData,
    errors,
    generalError,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
