import { useOutletContext, useNavigate } from "react-router-dom";
import { PhoneIcon as PhoneOutline } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon as ChatBubbleLeftOutline } from "@heroicons/react/24/outline";
import { DocumentTextIcon as DocumentTextOutline } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import PageHeader from "../PageHeader";
import SectionCard from "./SectionCard";
import CvUploader from "./CvUploader";

import { useState } from "react";
import { userService } from "../../../services/userService";
import { Field, TextInput, TextArea } from "./FormControls";

const Information = () => {
  const {
    telefono, setTelefono,
    presentacion, setPresentacion,
    cvArchivo, setCvArchivo,
    errors,
    clearError,
    isDirty,
    isLoading,
    successMessage,
    generalError,
    handleGuardar,
    handleDescartar,
  } = useOutletContext();

  const navigate = useNavigate();

  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  const handleSolicitarCambio = async () => {
    setRequestLoading(true);
    setRequestError("");
    try {
      await userService.requestPasswordChange();
      navigate("/cambiar-contrasena");
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="w-full pt-2">
      <PageHeader
        title="Mis Datos"
        description="Gestiona tu información personal y profesional para aplicar a mejores oportunidades."
        isDirty={isDirty}
      />

      <form onSubmit={handleGuardar} className="space-y-6">
        <SectionCard
          icon={PhoneOutline}
          title="Información de Contacto"
          tone="blue"
        >
          <Field
            label="Número de Teléfono"
            hint={
              !errors.telefono
                ? "Utilizamos este número para contactarte sobre postulaciones activas."
                : undefined
            }
          >
            <TextInput
              inputMode="tel"
              placeholder="999 999 999"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                clearError("telefono");
              }}
              focusColor={errors.telefono ? "#ef4444" : "#123498"}
            />
            {errors.telefono && (
              <p className="mt-2 text-xs text-red-500">{errors.telefono}</p>
            )}
          </Field>
        </SectionCard>

        <SectionCard
          icon={ChatBubbleLeftOutline}
          title="Presentación Personal"
          tone="teal"
        >
          <Field
            label="Breve introducción"
            hint={!errors.presentacion ? "Máximo 500 caracteres" : undefined}
            hintAlign="right"
          >
            <TextArea
              maxLength={500}
              placeholder="Cuéntanos sobre tu experiencia, logros clave y qué buscas en tu próximo desafío profesional..."
              value={presentacion}
              onChange={(e) => {
                setPresentacion(e.target.value);
                clearError("presentacion");
              }}
              focusColor={errors.presentacion ? "#ef4444" : "#41C4C0"}
            />
            {errors.presentacion && (
              <p className="mt-2 text-xs text-red-500">{errors.presentacion}</p>
            )}
          </Field>
        </SectionCard>

        <SectionCard
          icon={DocumentTextOutline}
          title="Gestión de CV"
          tone="orange"
        >
          <CvUploader
            file={cvArchivo}
            onFileSelect={(file) => setCvArchivo(file)}
            onRemove={() => setCvArchivo(null)}
          />
        </SectionCard>

        <SectionCard icon={LockClosedIcon} title="Seguridad" tone="blue">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-[#6b7a9f]">
              Para cambiar tu contraseña te enviaremos un código de verificación
              a tu correo registrado. El código es válido por 15 minutos.
            </p>
            {requestError && (
              <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {requestError}
              </p>
            )}
            <button
              type="button"
              onClick={handleSolicitarCambio}
              disabled={requestLoading}
              className="self-start rounded-xl border-[1.5px] border-[#123498] px-5 py-2.5 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {requestLoading
                ? "Enviando código..."
                : "Solicitar cambio de contraseña"}
            </button>
          </div>
        </SectionCard>

        {/* Mensajes de feedback del guardado */}
        {generalError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
            {generalError}
          </p>
        )}
        {successMessage && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200">
            {successMessage}
          </p>
        )}

        <div className="flex justify-end gap-3 pb-16">
          <button
            type="button"
            onClick={handleDescartar}
            className="rounded-xl border-[1.5px] border-[#cdd6ea] bg-white px-[22px] py-3 text-sm font-semibold text-[#123498] transition hover:bg-[#f2f5fc]"
          >
            Descartar cambios
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-[#f46f0b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#d65f09] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;
