export default function QuienesSomosSection() {
  return (
    <section
      id="quienes-somos"
      className="bg-white border-t border-slate-100 py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#123498] tracking-tight font-heading uppercase">
            ¿Quiénes Somos?
          </h2>
          <div className="w-8 h-1 bg-[#F46F0B] mt-2 mb-1 rounded-full" />
          <p
            className="text-slate-400 text-sm font-bold mt-1 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Somos la{" "}
            <span className="text-[#123498] font-bold">
              Consultora de Asesoría Empresarial JB
            </span>
            , un aliado estratégico para estudiantes y empresas, brindando
            servicios personalizados de asesoría, capacitación y consultoría.
          </p>
        </div>

        {/* Grid: Misión + Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Misión */}
          <div className="bg-[#123498] rounded-2xl p-7 text-white hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-[#F46F0B]/30 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-black text-lg uppercase tracking-wider font-heading">
                Misión
              </h3>
            </div>
            <p className="text-white/85 text-sm leading-relaxed font-sans">
              Ser un aliado estratégico brindando servicios de asesoría,
              capacitación y consultoría de alta calidad, con honestidad e
              innovación, para superar desafíos y alcanzar el éxito.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-[#F46F0B] rounded-2xl p-7 text-white hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-[#123498]/30 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="font-black text-lg uppercase tracking-wider font-heading">
                Visión
              </h3>
            </div>
            <p className="text-white/85 text-sm leading-relaxed font-sans">
              Ser reconocidos a nivel nacional como referentes en calidad,
              innovación y honestidad, acompañando a nuestros clientes en su
              crecimiento y consolidación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
