const TRENDS = ["Todos", "Ventas", "Administración", "Tecnología", "Logística"];

export default function HeroSection({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  handleSearchSubmit,
  activeCategory,
  handleTrendClick,
}) {
  return (
    <section className="relative bg-[#123498] text-white py-16 sm:py-24 border-b border-slate-200/10">
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl font-heading mb-6">
          Impulsamos tu{" "}
          <span className="text-[#FDB907]">crecimiento profesional</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light max-w-2xl mb-12 leading-relaxed">
          Explora oportunidades laborales y conecta con empresas líderes con
          el respaldo de Consultora JB.
        </p>

        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl bg-white p-2 rounded-2xl md:rounded-full shadow-lg border border-slate-200 flex flex-col md:flex-row gap-2 items-stretch"
        >
          <div className="flex-1 px-4 py-2 sm:py-3.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-100">
            <svg
              className="w-5 h-5 text-[#123498] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Puesto, empresa o palabra clave"
              className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base font-semibold"
            />
          </div>

          <div className="flex-1 px-4 py-2 sm:py-3.5 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-[#F46F0B] shrink-0"
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
            <input
              type="text"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder="Ciudad o región"
              className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base font-semibold"
            />
          </div>

          <button
            type="submit"
            className="bg-[#F46F0B] hover:bg-orange-600 active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl md:rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>BUSCAR EMPLEO</span>
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
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <span className="text-slate-300">Categorías:</span>
          {TRENDS.map((trend) => (
            <button
              key={trend}
              onClick={() => handleTrendClick(trend)}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                trend === activeCategory
                  ? "bg-[#FDB907] text-[#123498] border-[#FDB907] font-black"
                  : "border-white/20 text-white/95 hover:bg-white/10 hover:border-white/40"
              }`}
            >
              {trend}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
