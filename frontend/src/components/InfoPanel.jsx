import logo from "../assets/images/logo_blanco.webp";

// Recuerda importar tu logo aquí arriba:
// import logo from '../assets/tu-logo.png';

export default function InfoPanel({ isRegister }) {
  return (
    // CONTENEDOR PRINCIPAL:
    // Usamos 'text-center md:text-left' para centrar en móvil y alinear a la izquierda en PC
    <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left w-full md:w-1/2 bg-[#1b3382] text-white p-8 md:p-12 relative overflow-hidden">
      {/* FONDO DE ÍCONOS (Tus íconos exactos, sin círculos) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
        {isRegister ? (
          <>
            {/* Ícono 1: Editar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute bottom-8 right-8 w-12 h-12 lg:w-48 lg:h-48 transform -rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </>
        ) : (
          <>
            {/* Ícono 1: MALETA */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute bottom-6 right-8 w-12 h-12 lg:w-32 lg:h-32 transform -rotate-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M31.5,7H21V3.5C21,3.224,20.776,3,20.5,3h-9C11.224,3,11,3.224,11,3.5V7H0.5C0.224,7,0,7.224,0,7.5v20
	C0,27.776,0.224,28,0.5,28h31c0.276,0,0.5-0.224,0.5-0.5v-20C32,7.224,31.776,7,31.5,7z M12,4h8v3h-8V4z M31,27H1V8h30V27z M6,11.5
	v2C6,13.776,5.776,14,5.5,14S5,13.776,5,13.5v-2C5,11.224,5.224,11,5.5,11S6,11.224,6,11.5z M6,16.5v2C6,18.776,5.776,19,5.5,19
	S5,18.776,5,18.5v-2C5,16.224,5.224,16,5.5,16S6,16.224,6,16.5z M6,21.5v2C6,23.776,5.776,24,5.5,24S5,23.776,5,23.5v-2
	C5,21.224,5.224,21,5.5,21S6,21.224,6,21.5z M27,11.5v2c0,0.276-0.224,0.5-0.5,0.5S26,13.776,26,13.5v-2c0-0.276,0.224-0.5,0.5-0.5
	S27,11.224,27,11.5z M27,16.5v2c0,0.276-0.224,0.5-0.5,0.5S26,18.776,26,18.5v-2c0-0.276,0.224-0.5,0.5-0.5S27,16.224,27,16.5z
	 M27,21.5v2c0,0.276-0.224,0.5-0.5,0.5S26,23.776,26,23.5v-2c0-0.276,0.224-0.5,0.5-0.5S27,21.224,27,21.5z"
              />
            </svg>
          </>
        )}
      </div>

      {/* 1. SECCIÓN SUPERIOR: Logo y Título */}
      <div className="relative z-10 w-full flex flex-row items-center justify-center md:justify-start gap-1">
        <img
          src={logo}
          alt="Logo de Consultora JB"
          className="w-12 md:w-16 h-auto"
        />
        <h2 className="text-lg md:text-xl font-bold text-white">
          Portal de Empleo JB
        </h2>
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
        <p className="text-blue-300/60 text-xs text-center md:text-left">
          Consultora de Asesoría Empresarial JB.
        </p>
      </div>
    </div>
  );
}
