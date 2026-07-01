const EMPRESAS_DESTACADAS = [
  {
    name: "Consultora JB",
    logoUrl:
      "https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png",
  },
  {
    name: "I.seg",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpm9Iv7WI9svBSuQkpRZ-N52QVOjGgzyul0lEhxt87kgBhrIdpxO5-be3r&s=10", // Placeholder temporal
  },
];

export default function EmpresasSection() {
  return (
    <section className="bg-slate-50 border-b border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#123498] tracking-tight font-heading uppercase">
            Empresas Destacadas
          </h2>
          <div className="w-8 h-1 bg-[#F46F0B] mt-2 mb-1 rounded-full" />
          <p className="text-slate-400 text-xs font-bold mt-1">
            Conoce las organizaciones que publican sus vacantes en nuestra red
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {EMPRESAS_DESTACADAS.map((emp, index) => (
              <div
                key={index}
                title={emp.name}
                className="flex justify-center shrink-0"
              >
                <div className="bg-white rounded-xl p-4 flex items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <img
                    src={emp.logoUrl}
                    alt={`Logo de ${emp.name}`}
                    className="max-h-16 max-w-[140px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
