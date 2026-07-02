import { useState } from "react";

function PreguntaSiNo({ id, pregunta, valor, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700 font-medium">{pregunta}</p>
      <div className="flex gap-3">
        {["Sí", "No"].map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
              valor === opt
                ? "border-naranja bg-naranja/10 text-naranja font-semibold"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={`pregunta_${id}`}
              value={opt}
              checked={valor === opt}
              onChange={() => onChange(id, opt)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function PreguntaOpciones({ id, pregunta, opciones, valor, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700 font-medium">{pregunta}</p>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
              valor === opt
                ? "border-naranja bg-naranja/10 text-naranja font-semibold"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={`pregunta_${id}`}
              value={opt}
              checked={valor === opt}
              onChange={() => onChange(id, opt)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function PreguntaTexto({ id, pregunta, valor, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700 font-medium">{pregunta}</p>
      <textarea
        value={valor || ""}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="Escribe tu respuesta..."
        rows={3}
        className="w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors px-3 py-2.5 resize-none"
      />
    </div>
  );
}

function PreguntaNumero({ id, pregunta, valor, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700 font-medium">{pregunta}</p>
      <input
        type="number"
        min={0}
        value={valor ?? ""}
        onChange={(e) => onChange(id, e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="0"
        className="w-32 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-azul focus:ring-azul transition-colors px-3 py-2.5"
      />
    </div>
  );
}

export default function PreguntasFiltro({ preguntas, respuestas, onChange, onSiguiente, onAtras }) {
  const [errores, setErrores] = useState({});

  const ordenadas = [...preguntas].sort((a, b) => (a.orden || 0) - (b.orden || 0));

  const handleSubmit = () => {
    const nuevosErrores = {};
    ordenadas.forEach((p) => {
      if (!p.obligatoria) return;
      const val = respuestas[p.id];
      if (val === undefined || val === null || val === "") {
        nuevosErrores[p.id] = "Esta pregunta es obligatoria";
      }
    });

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    onSiguiente();
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="font-montserrat font-bold text-azul text-sm">
            Preguntas de filtrado
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Responde las preguntas obligatorias para continuar con tu postulación
          </p>
        </div>

        {ordenadas.map((p) => (
          <div key={p.id}>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-700 font-medium">{p.pregunta}</p>
              {!p.obligatoria && (
                <span className="text-xs text-gray-400">(opcional)</span>
              )}
            </div>
            {p.tipo === "si_no" && (
              <PreguntaSiNo
                id={p.id}
                pregunta=""
                valor={respuestas[p.id]}
                onChange={onChange}
              />
            )}
            {p.tipo === "opciones" && (
              <PreguntaOpciones
                id={p.id}
                pregunta=""
                opciones={p.opciones}
                valor={respuestas[p.id]}
                onChange={onChange}
              />
            )}
            {p.tipo === "texto" && (
              <PreguntaTexto
                id={p.id}
                pregunta=""
                valor={respuestas[p.id]}
                onChange={onChange}
              />
            )}
            {p.tipo === "numero" && (
              <PreguntaNumero
                id={p.id}
                pregunta=""
                valor={respuestas[p.id]}
                onChange={onChange}
              />
            )}
            {errores[p.id] && (
              <p className="text-xs text-red-500 mt-1">{errores[p.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onAtras}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-naranja hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
