import PropTypes from 'prop-types';

const TONES = {
  blue: 'bg-azul/10 text-azul',
  teal: 'bg-turquesa/15 text-[#0f8f8b]',
  orange: 'bg-naranja/10 text-naranja',
};

export default function SectionCard({ icon: Icon, title, tone = 'blue', children }) {
  return (
    <section className="mb-[18px] rounded-2xl border border-[#eef1f8] bg-white p-6 shadow-card">
      <header className="mb-5 flex items-center gap-3">
        <span
          className={`flex h-[38px] w-[38px] bg-red items-center justify-center rounded-xl ${TONES[tone]}`}
        >
          <Icon strokeWidth={2} className="w-5 h-5 text-green"/>
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