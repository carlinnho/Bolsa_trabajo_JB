import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useChangePassword } from "../hooks/useChangePassword";

export default function ChangePassword() {
  const {
    paso,
    codigo, setCodigo,
    nuevaPassword, setNuevaPassword,
    confirmarPassword, setConfirmarPassword,
    showPassword, setShowPassword,
    passwordChecks,
    errors,
    generalError,
    isLoading,
    clearError,
    handleSubmitCodigo,
    handleSubmitPassword,
  } = useChangePassword();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#e8edf5]">

        {/* Ícono + título */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2f5fc]">
            {paso === "codigo"
              ? <ShieldCheckIcon className="h-7 w-7 text-[#123498]" />
              : <KeyIcon className="h-7 w-7 text-[#f46f0b]" />
            }
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1c2a52]">
              {paso === "codigo" ? "Ingresa el código" : "Nueva contraseña"}
            </h1>
            <p className="mt-1 text-sm text-[#6b7a9f]">
              {paso === "codigo"
                ? "Te enviamos un código de 6 dígitos a tu correo. Válido por 15 minutos."
                : "Elige una contraseña segura para tu cuenta."
              }
            </p>
          </div>
        </div>

        {/* Error general */}
        {generalError && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {generalError}
          </div>
        )}

        {/* ── PASO 1: Código ── */}
        {paso === "codigo" && (
          <form onSubmit={handleSubmitCodigo} className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1c2a52]">
                Código de verificación
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value.replace(/\D/g, ""));
                  clearError("codigo");
                }}
                className="w-full rounded-xl border border-[#cdd6ea] bg-[#f8fafc] px-4 py-3 text-center text-2xl font-bold tracking-[0.4em] text-[#1c2a52] outline-none transition focus:border-[#123498] focus:ring-2 focus:ring-[#123498]/20"
              />
              {errors.codigo && (
                <p className="mt-1.5 text-xs text-red-500">{errors.codigo}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#123498] py-3 text-sm font-bold text-white transition hover:bg-[#0f2a80]"
            >
              Continuar
            </button>

            <Link
              to="/mi-perfil"
              className="text-center text-sm text-[#6b7a9f] hover:text-[#123498] transition"
            >
              Cancelar y volver al perfil
            </Link>
          </form>
        )}

        {/* ── PASO 2: Nueva contraseña ── */}
        {paso === "nueva_password" && (
          <form onSubmit={handleSubmitPassword} className="flex flex-col gap-5">

            {/* Nueva contraseña */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1c2a52]">
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={nuevaPassword}
                  onChange={(e) => {
                    setNuevaPassword(e.target.value);
                    clearError("nuevaPassword");
                  }}
                  className="w-full rounded-xl border border-[#cdd6ea] bg-[#f8fafc] px-4 py-3 pr-11 text-sm text-[#1c2a52] outline-none transition focus:border-[#123498] focus:ring-2 focus:ring-[#123498]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3bd] hover:text-[#1c2a52]"
                >
                  {showPassword
                    ? <EyeSlashIcon className="h-5 w-5" />
                    : <EyeIcon className="h-5 w-5" />
                  }
                </button>
              </div>
              {errors.nuevaPassword && (
                <p className="mt-1.5 text-xs text-red-500">{errors.nuevaPassword}</p>
              )}

              {/* Indicadores de requisitos */}
              {nuevaPassword && (
                <ul className="mt-2 flex flex-col gap-1">
                  {[
                    { ok: passwordChecks.hasMinLength, label: "Mínimo 8 caracteres" },
                    { ok: passwordChecks.hasUppercase, label: "Al menos una mayúscula" },
                    { ok: passwordChecks.hasSymbol,    label: "Al menos un símbolo (!@#...)" },
                  ].map(({ ok, label }) => (
                    <li key={label} className={`flex items-center gap-1.5 text-xs ${ok ? "text-green-600" : "text-[#9aa3bd]"}`}>
                      {ok
                        ? <CheckCircleIcon className="h-3.5 w-3.5" />
                        : <XCircleIcon className="h-3.5 w-3.5" />
                      }
                      {label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1c2a52]">
                Confirmar contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repite tu nueva contraseña"
                value={confirmarPassword}
                onChange={(e) => {
                  setConfirmarPassword(e.target.value);
                  clearError("confirmarPassword");
                }}
                className="w-full rounded-xl border border-[#cdd6ea] bg-[#f8fafc] px-4 py-3 text-sm text-[#1c2a52] outline-none transition focus:border-[#123498] focus:ring-2 focus:ring-[#123498]/20"
              />
              {errors.confirmarPassword && (
                <p className="mt-1.5 text-xs text-red-500">{errors.confirmarPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#f46f0b] py-3 text-sm font-bold text-white transition hover:bg-[#d65f09] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Guardando..." : "Cambiar contraseña"}
            </button>

            <button
              type="button"
              onClick={() => setPaso("codigo")}
              className="text-center text-sm text-[#6b7a9f] hover:text-[#123498] transition"
            >
              ← Volver al código
            </button>
          </form>
        )}
      </div>
    </div>
  );
}