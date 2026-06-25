// ─────────────────────────────────────────────────────────────
// DetalleVacante — Contenido completo de la oferta (estado 1)
//
// Props:
//   vacante: object → datos completos de la vacante
//
// Muestra toda la información disponible de la vacante:
// cargo, empresa, ubicación, fecha, descripción, requisitos,
// salario, tipo de contrato, horario y contacto.
// ─────────────────────────────────────────────────────────────

export default function DetalleVacante({ vacante }) {
  const fechaFormateada = new Date(vacante.fecha_publicacion + 'T00:00:00').toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="font-montserrat font-bold text-2xl text-azul leading-tight">
          {vacante.cargo}
        </h2>
        <p className="text-naranja font-semibold text-lg mt-1">{vacante.empresa}</p>
      </div>

      {/* Metadatos en grilla */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ubicación</p>
          <p className="text-sm text-gray-700 font-medium mt-0.5">{vacante.ubicacion}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Publicado</p>
          <p className="text-sm text-gray-700 font-medium mt-0.5">{fechaFormateada}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tipo de contrato</p>
          <p className="text-sm text-gray-700 font-medium mt-0.5">{vacante.tipo_contrato}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Horario</p>
          <p className="text-sm text-gray-700 font-medium mt-0.5">{vacante.horario}</p>
        </div>
        {vacante.salario && (
          <div className="col-span-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Salario</p>
            <p className="text-sm text-gray-700 font-medium mt-0.5">{vacante.salario}</p>
          </div>
        )}
      </div>

      {/* Descripción */}
      <div>
        <h3 className="font-montserrat font-bold text-azul text-sm uppercase tracking-wider mb-2">
          Descripción del puesto
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {vacante.descripcion}
        </p>
      </div>

      {/* Requisitos */}
      {vacante.requisitos && (
        <div>
          <h3 className="font-montserrat font-bold text-azul text-sm uppercase tracking-wider mb-2">
            Requisitos
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {vacante.requisitos}
          </p>
        </div>
      )}

      {/* Contacto */}
      {vacante.contacto_correo && (
        <div className="pt-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contacto</p>
          <a
            href={`mailto:${vacante.contacto_correo}`}
            className="text-sm text-azul-marino hover:underline font-medium"
          >
            {vacante.contacto_correo}
          </a>
        </div>
      )}
    </div>
  );
}
