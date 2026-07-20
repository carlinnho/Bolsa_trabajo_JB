import logo from "../../assets/images/logo_blanco.webp";
import { Link } from "react-router-dom";
import { ArrowLongLeftIcon, PencilSquareIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export default function InfoPanel({ isRegister }) {
  return (
    <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left w-full md:w-1/2 bg-[#1b3382] text-white p-8 md:p-12 relative overflow-hidden">
      {/* FONDO DE ÍCONOS (Tus íconos exactos, sin círculos) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
        {isRegister ? (
          <>
            {/* Ícono 1: Editar */}
            <PencilSquareIcon className="absolute bottom-8 right-8 w-12 h-12 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transform -rotate-12" />
          </>
        ) : (
          <>
            {/* Ícono 1: MALETA */}
            <IdentificationIcon className="absolute bottom-4 right-8 w-14 h-14 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transform -rotate-24" />
          </>
        )}
      </div>
      {/* 1. SECCION SUPERIOR */}
      <div className="relative z-10 w-full flex flex-col items-center md:items-start">
        
        {/* BOTON PARA REGRESAR AL INICIO */}
        <Link
          to="/"
          className="flex flex-row gap-2 items-center justify-center text-center text-sm border-[0.5px] border-[#c3cbe0] py-2 px-3 mb-5 rounded-2xl text-[#c3cbe0] hover:bg-gris-oscuro/50 transition w-fit"
        >
          <ArrowLongLeftIcon className="h-5 w-5" />
          Volver al inicio
        </Link>

        {/* Logo y Título */}
        <div className="w-full flex flex-row items-center justify-center md:justify-start gap-1">
          <img
            src={logo}
            alt="Logo de Consultora JB"
            width={240}
            height={160}
            className="w-12 md:w-16 h-auto"
          />
          <h2 className="text-lg md:text-xl font-bold text-white">
            Portal de Empleo JB
          </h2>
        </div>
      </div>

      {/* 2. TEXTO PRINCIPAL: flex-grow y justify-center lo mantienen SIEMPRE al centro */}
      <div className="relative z-10 w-full flex flex-col items-center md:items-start justify-center py-8 md:py-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
          {isRegister ? "Únete a nuestra red" : "Bienvenido de nuevo"}
        </h2>

        <div className="w-12 h-1.5 bg-naranja rounded-full mb-6"></div>

        <p className="text-base md:text-lg text-blue-100 font-light pr-0 md:pr-4">
          {isRegister
            ? "Crea tu perfil en menos de 2 minutos y accede a las mejores ofertas laborales de la Consultora JB."
            : "Ingresa a tu cuenta para revisar el estado de tus postulaciones y descubrir nuevas oportunidades."}
        </p>
      </div>

      {/* 3. FOOTER */}
      <div className="relative z-10 w-full">
        <p className="text-blue-200 text-xs text-center md:text-left">
          Consultora de Asesoría Empresarial JB.
        </p>
      </div>
    </div>
  );
}