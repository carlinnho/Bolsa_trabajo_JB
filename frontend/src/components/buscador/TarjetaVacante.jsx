// ─────────────────────────────────────────────────────────────
// TarjetaVacante — Card resumen de una vacante
//
// Props:
//   vacante     : object  → { id, cargo, empresa, ubicacion, fecha_publicacion, ... }
//   seleccionada: boolean → true si esta tarjeta está activa
//   onClick     : fn      → se dispara al hacer clic
//
// Muestra: cargo, empresa, ubicación y fecha de publicación.
// El estado "seleccionada" resalta la tarjeta con un borde.
// ─────────────────────────────────────────────────────────────

export default function TarjetaVacante({ vacante, seleccionada = false, onClick }) {
  // Formatea la fecha a un formato más amigable
  const fechaFormateada = new Date(vacante.fecha_publicacion + 'T00:00:00').toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
        seleccionada
          ? 'border-naranja bg-orange-50 shadow-sm'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      {/* Cargo */}
      <h3 className="font-montserrat font-bold text-azul text-base mb-1 leading-tight">
        {vacante.cargo}
      </h3>

      {/* Empresa */}
      <p className="text-sm text-gray-600 font-medium mb-2">{vacante.empresa}</p>

      {/* Fila inferior: ubicación + fecha */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        {/* Ubicación */}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {vacante.ubicacion}
        </span>

        {/* Fecha */}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {fechaFormateada}
        </span>
      </div>
    </button>
  );
}
