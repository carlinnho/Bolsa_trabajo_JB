import { useState } from 'react';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    cv: null
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasSymbol = /[!@#$%^&*.,_\-]/.test(formData.password);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio.';
      isValid = false;
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido.';
      isValid = false;
    }

    const pwdRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,_\-]).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
      isValid = false;
    } else if (!pwdRegex.test(formData.password)) {
      newErrors.password = 'La contraseña no cumple con los requisitos.';
      isValid = false;
    }

    const telRegex = /^\d{9}$/;
    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es obligatorio.';
      isValid = false;
    } else if (!telRegex.test(formData.telefono)) {
      newErrors.telefono = 'Debe contener exactamente 9 dígitos.';
      isValid = false;
    }

    if (!formData.cv) {
      newErrors.cv = 'Debes subir tu CV en formato PDF.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    if (validateForm()) {
      console.log('Datos de Registro:', formData);
    }
  };

  return (
    // Cambiamos el gap a 5 para que respire igual que el login
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {generalError && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {generalError}
        </div>
      )}

      {/* NOMBRE COMPLETO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nombre completo</label>
        <div className="relative flex items-center">
          {/* Ícono de Usuario */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 w-5 h-5 text-azul">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <input type="text" name="nombre" placeholder="Ingresa tu nombre completo" className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 ${errors.nombre ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-azul'}`} onChange={handleChange} />
        </div>
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
      </div>

      {/* CORREO ELECTRÓNICO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Correo electrónico</label>
        <div className="relative flex items-center">
          {/* Ícono de Correo */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 w-5 h-5 text-azul">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <input type="email" name="correo" placeholder="Ejemplo@gmail.com" className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 ${errors.correo ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-azul'}`} onChange={handleChange} />
        </div>
        {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
      </div>

      {/* CONTRASEÑA */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contraseña</label>
        <div className="relative flex items-center">
          {/* Ícono de Candado */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 w-5 h-5 text-azul">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Crea tu contraseña" className={`w-full pl-12 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-azul'}`} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* TARJETA DE VALIDACIÓN DE CONTRASEÑA */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-0 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 transition-colors duration-300 ${hasMinLength ? 'text-green-500' : 'text-gray-200'}`}><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className={`text-xs font-medium transition-colors duration-300 ${hasMinLength ? 'text-gray-500' : 'text-gray-400'}`}>Mínimo 8 caracteres</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 transition-colors duration-300 ${hasUppercase ? 'text-green-500' : 'text-gray-200'}`}><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className={`text-xs font-medium transition-colors duration-300 ${hasUppercase ? 'text-gray-500' : 'text-gray-400'}`}>Al menos una letra mayúscula</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 transition-colors duration-300 ${hasSymbol ? 'text-green-500' : 'text-gray-200'}`}><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className={`text-xs font-medium transition-colors duration-300 ${hasSymbol ? 'text-gray-500' : 'text-gray-400'}`}>Al menos un símbolo</span>
        </div>
      </div>

      {/* TELÉFONO */}
      <div className="flex flex-col gap-1.5 mt-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Teléfono</label>
        <div className="relative flex items-center">
          {/* Ícono de Teléfono */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 w-5 h-5 text-azul">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <input type="tel" name="telefono" placeholder="999 999 999" className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 ${errors.telefono ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-azul'}`} onChange={handleChange} />
        </div>
        {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
      </div>

      {/* BOTÓN NARANJA (Estilo igual al de Login) */}
      <button type="submit" className="w-full bg-naranja hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mt-4 transition-colors">
        Crear mi cuenta
      </button>
    </form>
  );
}