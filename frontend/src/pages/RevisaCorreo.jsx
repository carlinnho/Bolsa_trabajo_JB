import { Link } from "react-router-dom";

export default function RevisaCorreo() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-naranja"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-azul mb-4">
          ¡Casi listo! Revisa tu correo
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Hemos enviado un enlace de validación a tu bandeja de entrada. Por
          favor, ábrelo para activar tu cuenta. Si no lo encuentras, recuerda
          revisar tu carpeta de SPAM o correo no deseado.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center justify-center w-full bg-naranja hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
