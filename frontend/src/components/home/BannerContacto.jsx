import { ChevronRightIcon } from "@heroicons/react/24/outline"; 

export default function BannerContacto() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=51912736437&text=Hola%2C%20me%20gustar%C3%ADa%20publicar%20vacantes%20con%20Consultora%20JB.";

  return (
    <section id="banner-contacto" className="bg-azul px-6 py-10 sm:px-12 sm:py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">

        {/* Texto */}
        <div className="flex flex-col gap-2 text-white">
          <p className="text-xs font-black uppercase tracking-widest text-amarillo-hansa">
            ¿Tienes una empresa?
          </p>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight font-heading">
            Únete y publica tus vacantes{" "}
            <span className="text-[#FDB907]">con nosotros</span>
          </h2>
          <p className="text-sm text-white/75 font-medium max-w-md leading-relaxed">
            Coordina con nuestro equipo para sumarte a la red de empresas
            aliadas de JB.
          </p>
        </div>

        {/* Botón */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 bg-naranja hover:bg-naranja/90 text-white font-black text-sm px-7 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          Contáctanos
          <ChevronRightIcon className="w-4 h-4" strokeWidth="3"/>
        </a>
      </div>
    </section>
  );
}