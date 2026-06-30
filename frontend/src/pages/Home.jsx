import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logoBlanco from "../assets/images/logo_blanco.webp";

// Datos de ejemplo de ofertas de empleo (fieles a mockups y propuesta de PDF)
const MOCK_JOBS = [
  {
    id: 1,
    title: "Practicante de Reclutamiento y Selección",
    company: "Consultora JB",
    location: "Lima, Perú (Híbrido)",
    locationType: "Híbrido",
    city: "Lima",
    compensation: "Ad honorem",
    date: "2026-03-16",
    category: "Administración",
    isNew: true,
    description:
      "Buscamos un estudiante entusiasta para unirse a nuestro equipo de Atracción de Talento. Aprenderás procesos de reclutamiento de punta a punta, publicación en bolsas de empleo, filtrado curricular y entrevistas iniciales estructuradas.",
    requirements: [
      "Estudiante de las carreras de Psicología, Administración o afines (ciclos intermedios).",
      "Disponibilidad para trabajar bajo modalidad híbrida en Lima.",
      "Proactividad, orientación al cliente y excelentes habilidades de comunicación oral y escrita.",
      "Deseo de aprender sobre gestión del talento y reclutamiento masivo/especializado.",
    ],
    benefits: [
      "Convenio de prácticas profesionales o pre-profesionales.",
      "Capacitaciones constantes en técnicas modernas de reclutamiento.",
      "Línea de carrera según desempeño dentro de la Consultora JB.",
      "Clima laboral dinámico y colaborativo.",
    ],
  },
  {
    id: 2,
    title: "Practicante de Asesoría Legal Empresarial",
    company: "Consultora JB",
    location: "Lima, Perú",
    locationType: "Presencial",
    city: "Lima",
    compensation: "Ad honorem",
    date: "2026-03-15",
    category: "Administración",
    isNew: true,
    description:
      "Excelente oportunidad para estudiantes de derecho que deseen especializarse en el ámbito laboral y de asesoría corporativa. Formarás parte de un equipo con amplia trayectoria resolviendo desafíos legales para clientes del sector industrial.",
    requirements: [
      "Estudiante de la carrera de Derecho (a partir del 7mo ciclo).",
      "Conocimientos básicos de derecho laboral y societario.",
      "Excelente nivel de redacción de informes y documentos legales.",
      "Disponibilidad para asistir de forma presencial en nuestras oficinas de Lima.",
    ],
    benefits: [
      "Certificado de prácticas pre-profesionales avalado por la consultora.",
      "Mentoría directa por parte de abogados seniors especializados.",
      "Acceso a capacitaciones y seminarios internos organizados por la firma.",
      "Flexibilidad por exámenes universitarios.",
    ],
  },
  {
    id: 3,
    title: "Asesor Comercial de Servicios",
    company: "Consultora JB",
    location: "Remoto",
    locationType: "Remoto",
    city: "Todo el país",
    compensation: "Con comisión",
    date: "2026-03-14",
    category: "Ventas",
    isNew: true,
    description:
      "Buscamos profesionales dinámicos y motivados por el logro comercial para la prospección de clientes corporativos (B2B). Tu función principal será expandir la cartera de empresas contratantes para nuestros servicios de consultoría.",
    requirements: [
      "Experiencia mínima de 1 año en ventas corporativas, intangibles o servicios (deseable).",
      "Facilidad de palabra, proactividad y gran poder de negociación.",
      "Conexión a internet estable y laptop/computadora propia.",
      "Enfoque en cumplimiento de metas comerciales mensuales.",
    ],
    benefits: [
      "Esquema de comisiones altamente competitivo y sin tope.",
      "Modalidad de trabajo 100% remota con flexibilidad horaria.",
      "Capacitación en técnicas avanzadas de ventas de servicios consultivos.",
      "Oportunidad de crecimiento a Coordinador Comercial de cuentas clave.",
    ],
  },
  {
    id: 4,
    title: "Operario de Almacén y Distribución",
    company: "I.seg (Cliente JB)",
    location: "Lima, Perú",
    locationType: "Presencial",
    city: "Lima",
    compensation: "S/ 1,200 + Bonos",
    date: "2026-03-13",
    category: "Logística",
    isNew: false,
    description:
      "Para nuestro cliente del sector de seguridad industrial I.seg, nos encontramos en la búsqueda de Operarios de Almacén para su sede en Lima. Persona encargada del orden, despacho y recepción de materiales.",
    requirements: [
      "Secundaria completa.",
      "Experiencia mínima de 6 meses en almacén, estiba o funciones operativas.",
      "Disponibilidad para trabajar en Lima en turnos rotativos semanales.",
      "Buen estado físico para la manipulación manual de carga y mercadería.",
    ],
    benefits: [
      "Ingreso directo a planilla desde el primer día con todos los beneficios de ley.",
      "Asignación familiar y Seguro Social (EsSalud).",
      "Bono de alimentación y horas extras pagadas al 100%.",
    ],
  },
  {
    id: 5,
    title: "Desarrollador Frontend React Jr.",
    company: "I.seg (Cliente JB)",
    location: "Lima, Perú (Híbrido)",
    locationType: "Híbrido",
    city: "Lima",
    compensation: "S/ 2,500",
    date: "2026-03-12",
    category: "Tecnología",
    isNew: true,
    description:
      "Estamos buscando un Desarrollador Frontend Jr. en React.js para sumarse al equipo de desarrollo tecnológico de nuestro cliente I.seg. Participarás en la optimización de los portales web públicos y de conversión.",
    requirements: [
      "Egresado técnico o universitario de Computación, Sistemas o afines.",
      "Experiencia de al menos 6 meses trabajando con React.js, Tailwind CSS y Git.",
      "Nociones básicas de SEO técnico y optimización para dispositivos móviles.",
      "Disponibilidad para laborar bajo modalidad híbrida en Lima.",
    ],
    benefits: [
      "Excelente salario competitivo en el mercado.",
      "Seguro médico EPS cubierto parcialmente por la empresa.",
      "Plan de capacitación técnica pagada y certificada.",
      "Clima laboral de startup con alta proyección.",
    ],
  },
];

const TRENDS = ["Todos", "Ventas", "Administración", "Tecnología", "Logística"];

// Logotipos vectoriales de empresas aliadas (Exactamente 7 logos estáticos y más grandes)
const COMPANAS_CONFIANZA = [
  {
    name: "Silver Eyes",
    render: () => (
      <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <svg
          className="w-8 h-8 text-slate-800"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="font-black text-[10px] tracking-widest text-slate-800 mt-3.5 font-heading uppercase">
          SILVER EYES
        </span>
      </div>
    ),
  },
  {
    name: "Truedent",
    render: () => (
      <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="flex items-center gap-0.5">
          <span className="font-black text-[#14A38B] text-lg sm:text-xl font-heading tracking-tight">
            true
          </span>
          <span className="font-bold text-[#A3A3A3] text-lg sm:text-xl font-heading tracking-tight">
            dent
          </span>
        </div>
        <svg
          className="w-5 h-5 text-[#14A38B] mt-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3,3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: "Mandovisual",
    render: () => (
      <div className="bg-[#0A0D14] rounded-xl p-4 flex flex-col items-center justify-center shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer text-white">
        <div className="flex items-center font-bold text-xs sm:text-sm tracking-wider uppercase font-heading">
          <span>MAND</span>
          <span className="text-[#41C4C0] mx-0.5">•</span>
          <span>VISUAL</span>
        </div>
        <span className="text-[6px] text-[#A3A3A3] tracking-[0.25em] uppercase mt-1">
          Producciones
        </span>
      </div>
    ),
  },
  {
    name: "W|E",
    render: () => (
      <div className="bg-[#096ACC] rounded-xl p-4 flex items-center justify-center shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer text-white">
        <span className="font-black text-2xl sm:text-3xl font-heading tracking-wider uppercase">
          W|E
        </span>
      </div>
    ),
  },
  {
    name: "Mente Sabia",
    render: () => (
      <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-5.5 h-5.5 text-[#096ACC]/60 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" />
          </svg>
          <div className="flex flex-col items-start leading-none">
            <span className="font-black text-[#096ACC] text-sm font-heading">
              mente
            </span>
            <span className="font-semibold text-[#096ACC] text-sm font-heading">
              sabia
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Ares Salud",
    render: () => (
      <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-[#096ACC]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black text-[#FDB907] text-xs font-heading">
              Ares
            </span>
            <span className="font-black text-[#096ACC] text-xs font-heading">
              Salud
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Quiro Vida",
    render: () => (
      <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm w-44 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="flex flex-col items-center leading-none">
          <span className="font-black text-sm sm:text-base text-slate-800 tracking-wide font-heading">
            QUIRO
          </span>
          <span className="font-bold text-[9px] text-[#096ACC] tracking-widest mt-1">
            VIDA
          </span>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Filtros aplicados por el botón "Buscar"
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    location: "",
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Filtrar los empleos en base a los filtros aplicados y categoría seleccionada
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        job.company
          .toLowerCase()
          .includes(appliedFilters.search.toLowerCase()) ||
        job.category
          .toLowerCase()
          .includes(appliedFilters.search.toLowerCase());

      const matchLocation =
        job.location
          .toLowerCase()
          .includes(appliedFilters.location.toLowerCase()) ||
        job.locationType
          .toLowerCase()
          .includes(appliedFilters.location.toLowerCase());

      const matchCategory =
        activeCategory === "Todos" ||
        job.category.toLowerCase() === activeCategory.toLowerCase();

      return matchSearch && matchLocation && matchCategory;
    });
  }, [appliedFilters, activeCategory]);

  // Mostrar un máximo de 3 vacantes en empleos recientes como solicita el usuario
  const displayedJobs = useMemo(() => {
    return filteredJobs.slice(0, 3);
  }, [filteredJobs]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters({
      search: searchTerm,
      location: locationTerm,
    });
  };

  const handleTrendClick = (trend) => {
    setActiveCategory(trend);
  };

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-800 relative">
      {/* Botones Flotantes (WhatsApp a la izquierda, Controles a la derecha) */}
      {/* Botón WhatsApp Flotante (Abajo a la izquierda) */}
      <a
        href="https://wa.me/51912736437"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center animate-bounce"
        title="Escríbenos por WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.858-4.42 9.86-9.864.001-2.636-1.02-5.11-2.875-6.97C16.467 1.91 13.997.89 11.36.89c-5.442 0-9.863 4.42-9.865 9.865-.001 1.713.457 3.39 1.325 4.884l-.996 3.639 3.733-.979zm12.355-6.732c-.302-.152-1.793-.885-2.071-.986-.278-.1-.482-.152-.684.152-.202.304-.783.987-.96 1.189-.177.202-.355.228-.658.076-.303-.152-1.28-.471-2.439-1.503-.9-.802-1.507-1.793-1.684-2.097-.177-.302-.018-.467.133-.618.137-.135.303-.354.456-.531.152-.177.202-.304.303-.506.102-.203.05-.38-.025-.531-.076-.152-.684-1.647-.938-2.253-.248-.597-.5-.516-.684-.526-.177-.008-.38-.01-.582-.01-.203 0-.532.076-.81.38-.279.304-1.064 1.039-1.064 2.532s1.089 2.94 1.24 3.143c.153.203 2.143 3.272 5.19 4.588.725.313 1.29.5 1.73.64.729.232 1.392.199 1.917.12.585-.088 1.794-.733 2.048-1.442.253-.71.253-1.317.177-1.442-.076-.127-.279-.203-.581-.355z" />
        </svg>
      </a>

      {/* Botones Flotantes de Navegación y Chat (Abajo a la derecha) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Botón Scroll-To-Top (Amarillo Hansa) */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-[#FDB907] hover:bg-yellow-500 text-slate-900 rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
          title="Subir al inicio"
        >
          <svg
            className="w-5 h-5 stroke-[3px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        {/* Botón de Chat (Celeste) */}
        <button
          onClick={() => alert("Asistente Virtual JB próximamente disponible")}
          className="w-12 h-12 bg-[#0099FF] hover:bg-[#0088EE] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
          title="Asistente Virtual"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>

      {/* 2. HERO SECTION */}
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

      {/* 3. SECCIÓN: EMPRESAS QUE CONFÍAN EN NOSOTROS */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#123498] text-2xl font-black tracking-wider uppercase font-heading">
            EMPRESAS QUE CONFIAN EN NOSOTROS
          </h2>

          <div className="w-12 h-1 bg-[#F46F0B] mx-auto mt-3.5 mb-2 rounded-full" />

          <p className="text-[#A3A3A3] text-xs font-bold font-sans tracking-wide">
            Más de 12 empresas de primer nivel apostaron por nosotros
          </p>

          <div className="mt-10 max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {COMPANAS_CONFIANZA.map((emp, index) => (
                <div
                  key={index}
                  title={emp.name}
                  className="flex justify-center shrink-0"
                >
                  {emp.render()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      {/* 6. ¿QUIÉNES SOMOS? */}
      <section
        id="quienes-somos"
        className="bg-white border-t border-slate-100 py-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#123498] tracking-tight font-heading uppercase">
              ¿Quiénes Somos?
            </h2>
            <div className="w-10 h-1 bg-[#F46F0B] mx-auto mt-3 mb-4 rounded-full" />
            <p
              className="text-[#A3A3A3] text-sm font-semibold max-w-2xl mx-auto leading-relaxed"
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

      {/* 5. FOOTER OFICIAL REPLICADO EXACTAMENTE DE LA IMAGEN DE CONVENIOS */}
      <footer className="bg-[#1E1E1E] text-white pt-16 pb-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid de 4 Columnas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            {/* Columna 1: Presentación de la Empresa */}
            <div>
              <div className="bg-[#2A2A2A] border-l-4 border-[#FDB907] p-5 rounded-r-xl shadow-md">
                {/* Logo blanco oficial */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={logoBlanco}
                    alt="Consultora de Asesoría Empresarial JB Logo"
                    className="h-11 w-auto object-contain shrink-0"
                  />
                  <span className="font-extrabold text-white text-xs sm:text-[13px] leading-tight font-heading uppercase">
                    Consultora de Asesoría Empresarial JB
                  </span>
                </div>

                <div className="w-10 h-0.5 bg-[#FDB907] my-4" />

                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  Soluciones empresariales integrales basadas en compromiso,
                  innovación y excelencia. Transformamos negocios con
                  estrategias personalizadas.
                </p>

                {/* Redes Sociales en cajas doradas */}
                <div className="flex items-center gap-2 mt-5">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3.625L16 8h-3V7c0-.9.2-.9 1-.9H16V3h-2.5C10.5 3 9 4.5 9 7v1z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 fill-none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31.03 2.5.52 3.37 1.32.85-.03 1.6-.32 2.23-.75v3.2a5.41 5.41 0 01-2.9-1c-.05 1.83-.8 3.35-2.15 4.4a7.48 7.48 0 01-4.8 1.4c-2.4 0-4.4-1.2-5.4-3.1a6.63 6.63 0 01-.6-2.9 6.8 6.8 0 016.8-6.8c.4 0 .7.03 1.1.1V3.1c-.36-.06-.72-.08-1.1-.08-2.6 0-4.8 2.2-4.8 4.8 0 2.2 1.5 4.1 3.6 4.6.4.1.8.1 1.2.1 2.3 0 4.2-1.6 4.7-3.8.1-.5.2-1 .2-1.5V0h2.65z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.556a3.002 3.002 0 00-2.11 2.107C0 8.053 0 12 0 12s0 3.948.502 5.837a3.003 3.003 0 002.11 2.107C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.948 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 2: Servicios */}
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white font-heading tracking-wider uppercase mb-1">
                Servicios
              </h3>
              <div className="w-8 h-0.5 bg-[#FDB907] mb-5" />
              <ul className="space-y-3 font-semibold text-xs text-slate-300">
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#asesoria">Asesoría Legal Empresarial</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#consultoria">Consultoría Tributaria</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#planificacion">Planificación Estratégica</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#constitucion">Constitución de Empresas</a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white font-heading tracking-wider uppercase mb-1">
                Empresa
              </h3>
              <div className="w-8 h-0.5 bg-[#FDB907] mb-5" />
              <ul className="space-y-3 font-semibold text-xs text-slate-300">
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#nosotros">Sobre Nosotros</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#experiencias">Experiencias</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#blog">Blog</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#trabaja">Trabaja con Nosotros</a>
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-[#FDB907] font-bold">&gt;</span>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white font-heading tracking-wider uppercase mb-1">
                Contacto
              </h3>
              <div className="w-8 h-0.5 bg-[#FDB907] mb-5" />
              <ul className="space-y-3 font-semibold text-xs text-slate-300">
                {/* Dirección */}
                <li className="flex items-start gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span>Pje. los Almanaques, S.J.L. - Lima</span>
                </li>

                {/* Teléfono 1 */}
                <li className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+51 912 736 437</span>
                </li>

                {/* Teléfono 2 */}
                <li className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+51 958 748 765</span>
                </li>

                {/* Teléfono 3 */}
                <li className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+51 902 169 164</span>
                </li>

                {/* Teléfono 4 */}
                <li className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+51 987 577 196</span>
                </li>

                {/* Correo */}
                <li className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="w-4 h-4 text-[#FDB907] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:consultoriayasesoriajb@gmail.com"
                    className="hover:underline"
                  >
                    consultoriayasesoriajb@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#FDB907]">
              <a href="#privacidad" className="hover:underline">
                Política y privacidad
              </a>
              <span className="text-neutral-700">|</span>
              <a href="#legal" className="hover:underline">
                Aviso Legal
              </a>
              <span className="text-neutral-700">|</span>
              <a href="#reclamaciones" className="hover:underline">
                Libro de Reclamaciones
              </a>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              &copy; 2026 Consultora de Asesoría Empresarial JB. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* 6. MODAL / DRAWER DE DETALLE DE EMPLEO */}
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
    </div>
  );
}
