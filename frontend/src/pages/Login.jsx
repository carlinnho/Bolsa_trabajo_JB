import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import InfoPanel from "../components/InfoPanel";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen bg-[#A3A3A3] flex items-center justify-center p-0 md:p-8">
      <div 
        key={isRegister ? 'registro' : 'login'}
        className="animate-fade-slide flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-none md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden min-h-screen md:min-h-0">
        
        {/* Lado Izquierdo (Arriba en móviles): Panel Informativo */}
        <InfoPanel isRegister={isRegister} />

        {/* Lado Derecho (Abajo en móviles): Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 flex-1">
          <div className="w-full max-w-md">

            <GoogleLoginButton />

            <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center text-sm font-semibold text-gray-500">
                O con tu correo
              </p>
            </div>

            {/* PESTAÑAS MOVIDAS AQUÍ */}
            <div className="flex bg-slate-50 rounded-full p-1.5 mb-8 w-max mx-auto border border-gray-100">
              <button
                type="button"
                className={`px-8 py-2.5 text-xs font-bold rounded-full transition-all ${!isRegister ? "bg-white text-azul shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                onClick={() => setIsRegister(false)}
              >
                INGRESAR
              </button>
              <button
                type="button"
                className={`px-8 py-2.5 text-xs font-bold rounded-full transition-all ${isRegister ? "bg-white text-azul shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                onClick={() => setIsRegister(true)}
              >
                REGISTRO
              </button>
            </div>

            {/* RENDERIZADO CONDICIONAL: Dependiendo del estado, muestra uno u otro */}
            {isRegister ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
