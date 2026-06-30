import PropTypes from 'prop-types';

/**
 * Mapa de tonos para el chip del ícono.
 * Mantener los colores aquí evita repetir clases por toda la app.
 */
const TONES = {
  blue: 'bg-brand-blue/10 text-brand-blue',
  teal: 'bg-brand-teal/15 text-[#0f8f8b]',
  orange: 'bg-brand-orange/10 text-brand-orange',
};

/**
 * Tarjeta contenedora de cada sección del formulario.
 * `icon` es un componente de lucide-react.
 */
export default function SectionCard({ icon: Icon, title, tone = 'blue', children }) {
  return (
    <section className="mb-[18px] rounded-2xl border border-[#eef1f8] bg-white p-6 shadow-card">
      <header className="mb-5 flex items-center gap-3">
        <span
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-xl ${TONES[tone]}`}
        >
          <Icon size={18} strokeWidth={2} />
        </span>
        <h2 className="font-heading text-base font-bold text-[#1c2a52]">{title}</h2>
      </header>
      {children}
    </section>
  );
}

SectionCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(Object.keys(TONES)),
  children: PropTypes.node,
};