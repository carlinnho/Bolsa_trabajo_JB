import PropTypes from 'prop-types';

const baseField =
  'w-full rounded-xl border-[1.5px] border-[#e2e7f2] bg-[#fafbfe] text-sm text-[#1c2a52] ' +
  'outline-none transition focus:bg-white placeholder:text-[#b3b3b3]';

export function Field({ label, hint, hintAlign = 'left', children }) {
  return (
    <div>
      {label && (
        <label className="mb-2 block font-heading text-[13px] font-semibold text-[#3a4566]">
          {label}
        </label>
      )}
      {children}
      {hint && (
        <p
          className={`mt-2 text-[12.5px] text-[#9aa3bd] ${
            hintAlign === 'right' ? 'text-right' : ''
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  hintAlign: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
};

/** Input de texto. `icon` opcional (componente lucide) se muestra a la izquierda. */
export function TextInput({ icon: Icon, focusColor = '#123498', className = '', ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa3bd]"
        />
      )}
      <input
        {...props}
        style={{ '--tw-ring-color': `${focusColor}1f` }}
        className={[
          baseField,
          Icon ? 'py-3 pl-10.5 pr-3.5' : 'px-3.5 py-3',
          'focus:ring-[3px]',
          className,
        ].join(' ')}
        // borde de foco con el color de marca recibido
        onFocus={(e) => (e.currentTarget.style.borderColor = focusColor)}
        onBlur={(e) => (e.currentTarget.style.borderColor = '')}
      />
    </div>
  );
}

TextInput.propTypes = {
  icon: PropTypes.elementType,
  focusColor: PropTypes.string,
  className: PropTypes.string,
};

/** Área de texto multilínea. */
export function TextArea({ focusColor = '#41C4C0', className = '', rows = 4, ...props }) {
  return (
    <textarea
      {...props}
      rows={rows}
      style={{ '--tw-ring-color': `${focusColor}29` }}
      className={[baseField, 'resize-none px-3.5 py-3 leading-relaxed focus:ring-[3px]', className].join(
        ' '
      )}
      onFocus={(e) => (e.currentTarget.style.borderColor = focusColor)}
      onBlur={(e) => (e.currentTarget.style.borderColor = '')}
    />
  );
}

TextArea.propTypes = {
  focusColor: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
};
