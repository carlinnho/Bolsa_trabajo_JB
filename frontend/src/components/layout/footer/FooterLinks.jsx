export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="font-extrabold text-sm sm:text-base text-white font-heading tracking-wider uppercase mb-1">
        {title}
      </h3>
      <div className="w-8 h-0.5 bg-[#FDB907] mb-5" />
      <ul className="space-y-3 font-semibold text-xs text-slate-300">
        {links.map(({ label, href }) => (
          <li key={label} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-[#FDB907] font-bold">&gt;</span>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}