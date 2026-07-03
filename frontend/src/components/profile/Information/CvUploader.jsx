import { useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpTrayIcon as ArrowUpTrayOutline } from "@heroicons/react/24/outline";
import { DocumentTextIcon as DocumentTextOutline } from '@heroicons/react/24/outline';
import { TrashIcon as TrashOutline } from '@heroicons/react/24/outline';

const MAX_SIZE_MB = 5;

export default function CvUploader({ file, onFileSelect, onRemove }) {
  const inputRef = useRef(null);

  const pickFile = (selected) => {
    if (!selected) return;
    const isPdf = selected.type === 'application/pdf';
    const underLimit = selected.size <= MAX_SIZE_MB * 1024 * 1024;
    if (isPdf && underLimit) onFileSelect?.(selected);
    // Aquí podrías disparar una notificación de error si no cumple.
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        pickFile(e.dataTransfer.files?.[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer rounded-[13px] border-[1.5px] border-dashed border-[#f3c79a] bg-linear-to-b from-[#fffaf4] to-[#fff7ee] px-5 py-7 text-center"
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => pickFile(e.target.files?.[0])}
      />

      <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[13px] bg-linear-to-br from-naranja to-amarillo-hansa text-white shadow-cta">
        <ArrowUpTrayOutline strokeWidth={2} className='h-6 w-6 text-white'/>
      </span>

      <p className="font-heading text-[14.5px] font-bold text-[#1c2a52]">
        Subir o reemplazar CV
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#9aa3bd]">
        Arrastra tu archivo aquí o haz clic para seleccionar uno.
        <br />
        Solo archivos PDF (máx. {MAX_SIZE_MB}MB).
      </p>

      {file && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4.5 inline-flex items-center gap-3 rounded-xl border border-[#f0e3d3] bg-white px-3.75 py-2.5 shadow-[0_1px_5px_rgba(244,111,11,0.08)]"
        >
          <DocumentTextOutline strokeWidth={2} className=" w-5 h-5 text-naranja" />
          <span className="text-[13px] font-bold text-[#3a4566]">{file.name}</span>
          <button
            type="button"
            aria-label="Eliminar CV"
            onClick={onRemove}
            className="text-green transition hover:opacity-70"
          >
            <TrashOutline strokeWidth={2} className=" w-5 h-5 text-rojo"/>
          </button>
        </div>
      )}
    </div>
  );
}

CvUploader.propTypes = {
  file: PropTypes.shape({ name: PropTypes.string }),
  onFileSelect: PropTypes.func,
  onRemove: PropTypes.func,
};
