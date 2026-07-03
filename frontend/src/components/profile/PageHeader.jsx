import PropTypes from 'prop-types';

/** Encabezado de la página: título, descripción y badge de estado. */
export default function PageHeader({ title, description, isDirty }) {
  return (
    <header className="mb-7 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-heading text-[27px] font-extrabold tracking-tight text-brand-blue">
          {title}
        </h1>
        <p className="mt-[7px] max-w-md text-[14.5px] leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      {isDirty && (
        <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-teal/10 px-3 py-2 font-heading text-xs font-bold text-[#0f8f8b]">
          <span className="h-[7px] w-[7px] rounded-full bg-brand-teal" />
          Cambios sin guardar
        </span>
      )}
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isDirty: PropTypes.bool,
};