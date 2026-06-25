import { GoogleLogin } from "@react-oauth/google";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hiddenButtonWrapperRef = useRef(null);

  const handleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await authService.googleLogin(
        credentialResponse.credential,
      );
      if (response.success) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Error al autenticar con Google");
    } finally {
      setIsLoading(false);
    }
  };

  // Al hacer click en nuestro botón visual, disparamos el click
  // del botón real de Google que está oculto debajo.
  const handleCustomClick = () => {
    const realButton =
      hiddenButtonWrapperRef.current?.querySelector('div[role="button"]');
    realButton?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}

      {/* Contenedor relativo: nuestro botón visible + el botón real de Google invisible encima */}
      <div className="relative w-full">
        <button
          type="button"
          onClick={handleCustomClick}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          {isLoading ? (
            <span className="text-sm">Conectando con Google...</span>
          ) : (
            <>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Logo de Google"
                className="w-5 h-5"
              />
              Continuar con Google
            </>
          )}
        </button>

        {/* Botón real de Google: invisible pero clickeable, superpuesto exactamente encima */}
        <div
          ref={hiddenButtonWrapperRef}
          className="absolute inset-0 opacity-0 overflow-hidden"
          aria-hidden="true"
        >
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() =>
              setError("El inicio de sesión con Google fue cancelado.")
            }
            width="320"
            text="continue_with"
            locale="es"
          />
        </div>
      </div>
    </div>
  );
}
