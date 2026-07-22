import { Phone, Mail, MapPin } from "lucide-react";

const TELEFONOS = [
  "+51 912 736 437",
  "+51 958 748 765",
  "+51 902 169 164",
  "+51 987 577 196",
];

export default function FooterContact() {
  return (
    <div>
      <h3 className="font-extrabold text-sm sm:text-base text-white font-heading tracking-wider uppercase mb-1">
        Contacto
      </h3>
      <div className="w-8 h-0.5 bg-[#FDB907] mb-5" />
      <ul className="space-y-3 font-semibold text-xs text-slate-300">

        {/* Dirección */}
        <li className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#FDB907] shrink-0"/>
          <span>Pje. los Almanaques, S.J.L. - Lima</span>
        </li>

        {/* Teléfonos */}
        {TELEFONOS.map((tel) => (
          <li key={tel} className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#FDB907] shrink-0"/>
            <span>{tel}</span>
          </li>
        ))}

        {/* Correo */}
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#FDB907] shrink-0"/>
          <a href="mailto:consultoriayasesoriajb@gmail.com" className="hover:underline">
            consultoriayasesoriajb@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
}