import { useState, useMemo } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/home/HeroSection";
import EmpresasSection from "../components/home/EmpresasSection";
import EmpleosSection from "../components/home/EmpleosSection";
import QuienesSomosSection from "../components/home/QuienesSomosSection";

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



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Filtros aplicados por el botón "Buscar"
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    location: "",
  });

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

  // Mostrar un máximo de 3 vacantes en empleos recientes
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-800 relative">
      {/* 1. BOTÓN FLOTANTE: Scroll-To-Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#FDB907] hover:bg-yellow-500 text-slate-900 rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
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

      {/* 2. HERO SECTION */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        handleSearchSubmit={handleSearchSubmit}
        activeCategory={activeCategory}
        handleTrendClick={handleTrendClick}
      />

      {/* 3. SECCIÓN: EMPRESAS DESTACADAS */}
      <EmpresasSection />

      {/* 4. SECCIÓN EMPLEOS RECIENTES */}
      <EmpleosSection
        displayedJobs={displayedJobs}
        filteredJobs={filteredJobs}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setAppliedFilters={setAppliedFilters}
        setSearchTerm={setSearchTerm}
        setLocationTerm={setLocationTerm}
      />

      {/* 5. ¿QUIÉNES SOMOS? */}
      <QuienesSomosSection />

      {/* 6. FOOTER (componente reutilizable) */}
      <Footer />
    </div>
  );
}