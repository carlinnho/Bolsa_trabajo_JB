import { useState } from "react";
import { IdentificationIcon as IdentificationSolid } from "@heroicons/react/24/solid";
import { PhoneIcon as PhoneOutline } from "@heroicons/react/24/outline";
import { PresentationChartBarIcon as PresentationChartBarSolid } from "@heroicons/react/24/solid";
import { ArchiveBoxArrowDownIcon as ArchiveBoxArrowDownSolid } from "@heroicons/react/24/solid";

// Importamos tus componentes modulares
import PageHeader from "../PageHeader";
import SectionCard from "./SectionCard";
import CvUploader from "./CvUploader";
import { Field, TextInput, TextArea } from "./FormControls";

const Information = () => {
  const [telefono, setTelefono] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [cvArchivo, setCvArchivo] = useState({ name: "Curriculum_Vitae_2023.pdf" });

  const isDirty = telefono !== "" || presentacion !== "";

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log("Guardando datos...", { telefono, presentacion, cvArchivo });
  };

  return (
    <div className="w-full pt-2">
      <PageHeader
        title="Mis Datos"
        description="Gestiona tu información personal y profesional para aplicar a mejores oportunidades."
        isDirty={isDirty}
      />

      <form onSubmit={handleGuardar} className="space-y-6">
        
        {/* TARJETA 1: Información de Contacto */}
        <SectionCard icon={IdentificationSolid} title="Información de Contacto" tone="blue">
          <Field
            label="Número de Teléfono"
            hint="Utilizamos este número para contactarte sobre postulaciones activas."
          >
            <TextInput
              icon={PhoneOutline}
              inputMode="tel"
              placeholder="999 999 999"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              focusColor="#123498"
            />
          </Field>
        </SectionCard>

        {/* TARJETA 2: Presentación Personal */}
        <SectionCard icon={PresentationChartBarSolid} title="Presentación Personal" tone="teal">
          <Field
            label="Breve introducción"
            hint="Máximo 500 caracteres"
            hintAlign="right"
          >
            <TextArea
              maxLength={500}
              placeholder="Cuéntanos sobre tu experiencia, logros clave y qué buscas en tu próximo desafío profesional..."
              value={presentacion}
              onChange={(e) => setPresentacion(e.target.value)}
              focusColor="#41C4C0"
            />
          </Field>
        </SectionCard>

        {/* TARJETA 3: Gestión de CV */}
        <SectionCard icon={ArchiveBoxArrowDownSolid} title="Gestión de CV" tone="orange">
          <CvUploader
            file={cvArchivo}
            onFileSelect={(file) => setCvArchivo(file)}
            onRemove={() => setCvArchivo(null)}
          />
        </SectionCard>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-3 pb-16">
          <button
            type="button"
            onClick={() => {
              setTelefono("");
              setPresentacion("");
            }}
            className="rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-[22px] py-3 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc]"
          >
            Descartar cambios
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#f46f0b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#d65f09]"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;