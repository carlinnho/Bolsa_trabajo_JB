import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmpleosSection({
  displayedJobs,
  filteredJobs,
  activeCategory,
  setActiveCategory,
  setAppliedFilters,
  setSearchTerm,
  setLocationTerm,
}) {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const handleApplyJob = (jobId) => {
    const isUserLoggedIn = localStorage.getItem("user_token") || false;

    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      setApplicationSuccess(true);
      setTimeout(() => {
        setApplicationSuccess(false);
        setSelectedJob(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* 4. SECCIÓN EMPLEOS RECIENTES (Mostrando un máximo de 3 empleos) */}
      <main
        id="empleos-recientes"
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#123498] tracking-tight font-heading uppercase">
              {activeCategory !== "Todos"
                ? `Empleos en ${activeCategory}`
                : "Empleos Recientes"}
            </h2>
            <div className="w-8 h-1 bg-[#F46F0B] mt-2 mb-1 rounded-full" />
            <p className="text-slate-400 text-xs font-bold mt-1">
              Mostrando {displayedJobs.length} de {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "vacante disponible"
                : "vacantes disponibles"}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveCategory("Todos");
              setAppliedFilters({ search: "", location: "" });
              setSearchTerm("");
              setLocationTerm("");
            }}
            className="text-[#F46F0B] hover:text-orange-600 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>Ver todos</span>
            <span className="transform group-hover:translate-x-1 transition-transform font-bold">
              &gt;
            </span>
          </button>
        </div>

        {displayedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <svg
                className="w-8 h-8 text-[#A3A3A3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg text-[#123498] mb-2 font-heading">
              No encontramos vacantes
            </h3>
            <p className="text-[#A3A3A3] text-sm font-medium mb-6">
              Prueba modificando las palabras clave o limpia los campos para ver
              todas las ofertas disponibles.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationTerm("");
                setActiveCategory("Todos");
                setAppliedFilters({ search: "", location: "" });
              }}
              className="px-5 py-2.5 bg-[#123498] text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-[#096ACC] transition-all shadow-sm"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#096ACC] shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-inner">
                      <svg
                        className="w-5 h-5 text-[#123498]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    {job.isNew && (
                      <span className="bg-[#E6F8F6] text-[#41C4C0] border border-[#41C4C0]/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shrink-0 shadow-sm">
                        NUEVO
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-[#123498] font-heading leading-snug mb-2 group-hover:text-[#096ACC] transition-colors line-clamp-2">
                    {job.title}
                  </h3>

                  <p className="text-[#A3A3A3] font-bold text-xs mb-5 uppercase tracking-wider">
                    {job.company}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                      <svg
                        className="w-4 h-4 text-[#F46F0B] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <span className="text-xs font-bold text-slate-600 line-clamp-1">
                        {job.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                      <svg
                        className="w-4 h-4 text-[#41C4C0] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2"
                        />
                      </svg>
                      <span className="text-xs font-bold text-[#41C4C0] line-clamp-1">
                        {job.compensation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[#A3A3A3]">
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-[11px] font-bold">{job.date}</span>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="flex items-center gap-2 text-xs font-black text-[#123498] hover:text-[#096ACC] tracking-wider transition-colors cursor-pointer group/btn"
                  >
                    <span>DETALLES</span>
                    <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#123498] group-hover/btn:bg-[#123498] group-hover/btn:text-white transition-all">
                      <svg
                        className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.5"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 7. MODAL / DRAWER DE DETALLE DE EMPLEO */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedJob(null)}
          />
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden rounded-l-2xl border-l border-slate-200">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between relative bg-slate-50/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                  <svg
                    className="w-6 h-6 text-[#123498]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#123498] font-heading leading-tight mb-1">
                    {selectedJob.title}
                  </h3>
                  <p className="text-[#A3A3A3] font-bold text-xs tracking-wider mb-3 uppercase">
                    {selectedJob.company}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-50 text-[#F46F0B] border border-orange-100/50 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {selectedJob.location}
                    </span>
                    <span className="bg-teal-50 text-[#41C4C0] border border-teal-100/50 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2"
                        />
                      </svg>
                      {selectedJob.compensation}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
              {applicationSuccess && (
                <div className="bg-[#E6F8F6] border border-[#41C4C0]/30 rounded-xl p-5 text-center text-[#41C4C0]">
                  <div className="w-10 h-10 bg-[#41C4C0] text-white rounded-full flex items-center justify-center mx-auto mb-2.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wide">
                    ¡Postulación Exitosa!
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Tu postulación ha sido registrada con el respaldo de
                    Consultora JB.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#123498] uppercase tracking-widest border-l-4 border-[#123498] pl-3 font-heading">
                  Descripción del Puesto
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {selectedJob.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#123498] uppercase tracking-widest border-l-4 border-[#123498] pl-3 font-heading">
                  Requisitos
                </h4>
                <ul className="list-none space-y-3">
                  {selectedJob.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-slate-600 text-sm font-medium"
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-[#F46F0B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#123498] uppercase tracking-widest border-l-4 border-[#123498] pl-3 font-heading">
                  Beneficios
                </h4>
                <ul className="list-none space-y-3">
                  {selectedJob.benefits.map((ben, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-slate-600 text-sm font-medium"
                    >
                      <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-[#41C4C0]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="hidden sm:block">
                <span className="text-[10px] text-[#A3A3A3] font-extrabold tracking-wider uppercase block">
                  Publicado
                </span>
                <span className="text-xs font-bold text-[#123498]">
                  {selectedJob.date}
                </span>
              </div>

              <button
                onClick={() => handleApplyJob(selectedJob.id)}
                disabled={applicationSuccess}
                className={`w-full sm:w-auto px-10 py-4 font-black uppercase text-xs tracking-wider rounded-full shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
                  applicationSuccess
                    ? "bg-[#41C4C0] text-white hover:bg-[#41C4C0] cursor-default shadow-teal-500/10"
                    : "bg-[#F46F0B] hover:bg-orange-600 text-white"
                }`}
              >
                {applicationSuccess ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Postulado</span>
                  </>
                ) : (
                  <>
                    <span>Postular Ahora</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
