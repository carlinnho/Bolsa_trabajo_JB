// ─────────────────────────────────────────────────────────────
// DetalleVacante — Contenido completo de la oferta (estado 1)
//
// Props:
//   vacante: object → datos completos
// ─────────────────────────────────────────────────────────────

export default function DetalleVacante({ vacante }) {
  const fecha = new Date(vacante.fecha_publicacion + 'T00:00:00').toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Encabezado */}
      <div>
        <h2 className="font-montserrat font-bold text-lg text-azul leading-tight">
          {vacante.cargo}
        </h2>
        <p className="text-naranja font-semibold text-sm mt-0.5">{vacante.empresa}</p>
      </div>

      {/* Metadatos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#eef3f9] rounded-lg p-2.5">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Ubicación</p>
          <p className="text-xs text-gray-700 mt-0.5">{vacante.ubicacion}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Publicado</p>
          <p className="text-xs text-gray-700 mt-0.5">{fecha}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Contrato</p>
          <p className="text-xs text-gray-700 mt-0.5">{vacante.tipo_contrato}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Horario</p>
          <p className="text-xs text-gray-700 mt-0.5">{vacante.horario}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Modalidad</p>
          <p className="text-xs text-gray-700 mt-0.5">{vacante.modalidad}</p>
        </div>
        {vacante.salario && (
          <div className="col-span-2 sm:col-span-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Salario</p>
            <p className="text-xs text-gray-700 mt-0.5 font-medium text-azul">{vacante.salario}</p>
          </div>
        )}
      </div>

      {/* Descripción */}
      <div>
        <h3 className="font-montserrat font-bold text-azul text-[11px] uppercase tracking-wider mb-1">
          Descripción
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
          {vacante.descripcion}
        </p>
      </div>

      {/* Requisitos */}
      {vacante.requisitos && (
        <div>
          <h3 className="font-montserrat font-bold text-azul text-[11px] uppercase tracking-wider mb-1">
            Requisitos
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
            {vacante.requisitos}
          </p>
        </div>
      )}

      {/* Contacto */}
      {vacante.contacto_correo && (
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Contacto</p>
          <a
            href={`mailto:${vacante.contacto_correo}`}
            className="text-xs text-azul-marino hover:underline font-medium"
          >
            {vacante.contacto_correo}
          </a>
        </div>
      )}
    </div>
  );
}
