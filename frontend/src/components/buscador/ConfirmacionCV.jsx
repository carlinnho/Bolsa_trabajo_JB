import { useState } from "react";

export default function ConfirmacionCV({ onPostular, onAtras, postulando }) {
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");

  const userData = (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const cvUrl = userData?.cv_url || null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handleSubmit = () => {
    setErrorValidacion("");
    if (!cvFile && !cvUrl) {
      setErrorValidacion("Debes tener un CV en tu perfil o subir uno nuevo para postularte.");
      return;
    }
    onPostular(cvFile);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="font-montserrat font-bold text-azul text-sm">
            Confirma tu CV
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Revisa tus datos y adjunta tu CV antes de postular
          </p>
        </div>

        {/* Datos del usuario */}
        <div className="bg-[#eef3f9] rounded-lg p-4 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Tus datos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400">Nombre completo</p>
              <p className="text-sm text-gray-700 font-medium">
                {userData?.nombre_completo || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Correo</p>
              <p className="text-sm text-gray-700 font-medium">
                {userData?.correo || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Teléfono</p>
              <p className="text-sm text-gray-700 font-medium">
                {userData?.telefono || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* CV actual */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Currículum Vitae
          </p>

          {cvUrl ? (
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
              <svg className="w-6 h-6 text-naranja flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 font-medium truncate">
                  CV actual
                </p>
                <p className="text-xs text-gray-400 truncate">{cvUrl}</p>
              </div>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-azul-marino hover:underline font-semibold flex-shrink-0"
              >
                Ver CV
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
              <svg className="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-400">
                No has subido tu CV aún
              </p>
            </div>
          )}

          {/* Input file */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">
              {cvUrl ? "¿Deseas reemplazar tu CV?" : "Sube tu CV (PDF)"}
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-naranja/10 file:text-naranja hover:file:bg-naranja/20 file:cursor-pointer cursor-pointer"
            />
            {cvFileName && (
              <p className="text-xs text-green-600 font-medium">
                Archivo seleccionado: {cvFileName}
              </p>
            )}
          </div>
        </div>

        {/* Resumen de postulación */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-700">
              Al hacer clic en "Postular ahora", tus respuestas a las preguntas de filtrado y tu CV serán enviados al empleador.
            </p>
          </div>
        </div>
      </div>

      {errorValidacion && (
        <div className="flex-shrink-0 px-6 py-2 bg-red-50 border-t border-red-200">
          <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorValidacion}
          </p>
        </div>
      )}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onAtras}
          disabled={postulando}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={postulando}
          className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-default flex items-center gap-2"
        >
          {postulando ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Postulando...
            </>
          ) : (
            "Postular ahora"
          )}
        </button>
      </div>
    </div>
  );
}
