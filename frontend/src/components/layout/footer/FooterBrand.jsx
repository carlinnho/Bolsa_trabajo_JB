import logoBlanco from "../../../assets/images/logo_blanco.webp";

const REDES = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />,
    filled: true,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
    filled: true,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5z M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M17.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
      />
    ),
    filled: true,
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.556a3.002 3.002 0 00-2.11 2.107C0 8.053 0 12 0 12s0 3.948.502 5.837a3.003 3.003 0 002.11 2.107C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.948 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
    filled: true,
  },
];

export default function FooterBrand() {
  return (
    <div>
      <div className="bg-[#2A2A2A] border-l-4 border-[#FDB907] p-5 rounded-r-xl shadow-md">
        <div className="flex items-center gap-2.5">
          <img
            src={logoBlanco}
            width={240}
            height={160}
            alt="Consultora de Asesoría Empresarial JB Logo"
            className="h-11 w-auto object-contain shrink-0"
          />
          <span className="font-extrabold text-white text-xs sm:text-[13px] leading-tight font-heading uppercase">
            Consultora de Asesoría Empresarial JB
          </span>
        </div>

        <div className="w-10 h-0.5 bg-[#FDB907] my-4" />

        <p className="text-slate-300 text-xs leading-relaxed font-medium">
          Soluciones empresariales integrales basadas en compromiso, innovación
          y excelencia. Transformamos negocios con estrategias personalizadas.
        </p>

        <div className="flex items-center gap-2 mt-5">
          {REDES.map(({ href, label, icon, filled }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg bg-[#a1854a] hover:bg-[#b08f4c] flex items-center justify-center text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill={filled ? "currentColor" : "none"}
                stroke={filled ? "none" : "currentColor"}
                strokeWidth={filled ? undefined : "2"}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}