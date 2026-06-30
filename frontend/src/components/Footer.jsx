import logoBlanco from "../assets/images/logo_blanco.webp";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Columna 1: Presentación de la Empresa */}
          <div>
            <div className="bg-[#2A2A2A] border-l-4 border-[#FDB907] p-5 rounded-r-xl shadow-md">
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

              <div className="flex items-center gap-2 mt-5">
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
  );
}