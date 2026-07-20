import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useApplications } from "../../../hooks/useApplications";
import ApplicationCard from "./ApplicationCard";
import PageHeader from "../shared/PageHeader";

export default function Applications() {
  const {
    filtros,
    filtroActivo,
    setFiltroActivo,
    busqueda,
    setBusqueda,
    aplicaciones,
    total,
    isDirty,
  } = useApplications();

  return (
    <div className="w-full pt-2">

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start justify-between">
        <PageHeader
          title="Mis Postulaciones"
          description="Haz seguimiento del estado de los empleos a los que te postulaste."
          isDirty={isDirty}
        />
        <span className="shrink-0 rounded-xl border border-turquesa bg-white px-4 py-2 text-sm font-bold text-turquesa shadow-sm">
          {total} postulaciones
        </span>
      </div>

      {/* Filtros + Buscador */}
      <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              type="button"
              aria-label={`Filtrar postulaciones por estado: ${filtro}`}
              onClick={() => setFiltroActivo(filtro)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filtroActivo === filtro
                  ? "bg-[#123498] text-white"
                  : "bg-white border border-[#e8edf5] text-[#6b7a9f] hover:bg-[#f2f5fc] hover:text-[#123498]"
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="flex items-center gap-2 rounded-xl border border-[#e8edf5] bg-white px-4 py-2.5 shadow-sm">
          <MagnifyingGlassIcon className="h-4 w-4 text-[#9aa3bd]" />
          <input
            type="text"
            aria-label="Buscar puesto o empresa"
            placeholder="Buscar puesto o empresa"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-48 bg-transparent text-sm text-[#1c2a52] placeholder:text-[#9aa3bd] outline-none"
          />
        </div>
      </div>

      {/* Lista de tarjetas */}
      <div className="flex flex-col gap-3">
        {aplicaciones.length > 0 ? (
          aplicaciones.map((aplicacion) => (
            <ApplicationCard key={aplicacion.id} aplicacion={aplicacion} />
          ))
        ) : (
          <div className="rounded-2xl bg-white border border-[#e8edf5] px-6 py-12 text-center text-sm text-[#9aa3bd]">
            No se encontraron postulaciones para esta búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}