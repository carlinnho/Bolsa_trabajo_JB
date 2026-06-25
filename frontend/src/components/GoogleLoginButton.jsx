export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {/* Ícono de Google genérico (puedes cambiarlo luego por un SVG oficial) */}
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Logo de Google"
        className="w-5 h-5"
      />
      Continuar con Google
    </button>
  );
}
