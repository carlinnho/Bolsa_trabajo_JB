import PropTypes from 'prop-types';

/**
 * Barra de progreso del perfil (vive en el sidebar).
 */
export default function ProfileProgress({ value, hint }) {
  return (
    <div className="mt-auto rounded-2xl bg-white/10 p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-heading text-xs font-semibold text-blue-50">
          Perfil completo
        </span>
        <span className="font-heading text-sm font-extrabold text-brand-yellow">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>

      {hint && <p className="mt-2 text-[11px] leading-snug text-blue-200/80">{hint}</p>}
    </div>
  );
}

ProfileProgress.propTypes = {
  value: PropTypes.number.isRequired,
  hint: PropTypes.string,
};
