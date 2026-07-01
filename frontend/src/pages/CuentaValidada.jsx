import { Link, useSearchParams } from "react-router-dom";

export default function CuentaValidada() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center transform transition-all">
        {/* Renderizado Condicional según el estado de la URL */}
        {status === "success" ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-azul mb-4">
              ¡Cuenta validada con éxito!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bienvenido/a a la Bolsa de Trabajo JB. Tu correo electrónico ha
              sido verificado correctamente. Ya puedes acceder a todas nuestras
              ofertas laborales.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-naranja hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Ir al Inicio
            </Link>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-azul mb-4">
              El enlace ha expirado
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lo sentimos, el enlace de verificación es inválido o ya ha
              caducado. Por favor, intenta iniciar sesión para solicitar un
              nuevo correo de validación.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Ir al Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
