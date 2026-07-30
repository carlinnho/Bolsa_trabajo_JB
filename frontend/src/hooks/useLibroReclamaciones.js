import { useState } from "react";
import { UBIGEO } from "../data/ubigeo";
import { reclamacionesService } from "../services/reclamacionesService";

const FORM_INICIAL = {
  nombre: "", primer_apellido: "", segundo_apellido: "",
  tipo_documento: "", numero_documento: "",
  celular: "", correo: "",
  departamento: "", provincia: "", distrito: "",
  direccion: "", referencia: "",
  es_menor_edad: false,
  tipo_reclamo: "", tipo_consumo: "", numero_pedido: "",
  fecha_reclamacion: "", proveedor: "",
  monto_reclamado: "", fecha_compra: "", fecha_consumo: "", fecha_caducidad: "",
  descripcion_producto: "", detalle_reclamacion: "", pedido_cliente: "",
  acepta_declaracion: false,
  acepta_politica: false,
};

export function useLibroReclamaciones() {
  const [form, setForm]           = useState(FORM_INICIAL);
  const [errors, setErrors]       = useState({});
  const [enviando, setEnviando]   = useState(false);
  const [exito, setExito]         = useState(null); // { numero }

  // Opciones encadenadas
  const departamentos = Object.keys(UBIGEO).sort();
  const provincias    = form.departamento ? Object.keys(UBIGEO[form.departamento] || {}).sort() : [];
  const distritos     = form.departamento && form.provincia
    ? (UBIGEO[form.departamento]?.[form.provincia] || []).sort()
    : [];

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      // Resetear encadenados
      if (field === "departamento") { next.provincia = ""; next.distrito = ""; }
      if (field === "provincia")    { next.distrito = ""; }
      return next;
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const e = {};
    const req = [
      "nombre", "primer_apellido", "segundo_apellido",
      "tipo_documento", "numero_documento", "celular", "correo",
      "departamento", "provincia", "distrito", "direccion",
      "tipo_reclamo", "tipo_consumo",
      "descripcion_producto", "detalle_reclamacion", "pedido_cliente",
    ];
    req.forEach(f => { if (!form[f].trim()) e[f] = "Este campo es obligatorio."; });
    if (!form.acepta_declaracion) e.acepta_declaracion = "Debes aceptar la declaración.";
    if (!form.acepta_politica)    e.acepta_politica    = "Debes aceptar la política.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll al primer error
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setEnviando(true);
    try {
      const res = await reclamacionesService.crear(form);
      setExito({ numero: res.data?.numero });
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err.message }));
    } finally {
      setEnviando(false);
    }
  };

  return {
    form, handleChange, errors,
    departamentos, provincias, distritos,
    enviando, exito, handleSubmit,
  };
}