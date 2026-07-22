import FooterBrand from "./footer/FooterBrand";
import FooterLinks from "./footer/FooterLinks";
import FooterContact from "./footer/FooterContact";

const SERVICIOS = [
  { label: "Asesoría Legal Empresarial", href: "#asesoria" },
  { label: "Consultoría Tributaria", href: "#consultoria" },
  { label: "Planificación Estratégica", href: "#planificacion" },
  { label: "Constitución de Empresas", href: "#constitucion" },
];

const EMPRESA = [
  { label: "Sobre Nosotros", href: "#nosotros" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Blog", href: "#blog" },
  { label: "Trabaja con Nosotros", href: "#trabaja" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Estructura de grilla arreglada:
          - grid-cols-1: Móviles (1 columna)
          - md:grid-cols-2: Tablets (2 columnas, grilla simétrica de 2x2)
          - lg:grid-cols-4: Pantallas grandes (4 columnas en línea)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-16">
          <FooterBrand />
          <FooterLinks title="Servicios" links={SERVICIOS} />
          <FooterLinks title="Empresa" links={EMPRESA} />
          <FooterContact />
        </div>

        <div className="border-t border-neutral-800 pt-8 mt-8 flex flex-col items-center justify-between gap-4 lg:flex-row text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#FDB907]">
            <a href="#privacidad" className="hover:underline">Política y privacidad</a>
            <span className="text-neutral-700">|</span>
            <a href="#legal" className="hover:underline">Aviso Legal</a>
            <span className="text-neutral-700">|</span>
            <a href="#reclamaciones" className="hover:underline">Libro de Reclamaciones</a>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            &copy; 2026 Consultora de Asesoría Empresarial JB. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}