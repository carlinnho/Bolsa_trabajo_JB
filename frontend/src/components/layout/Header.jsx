import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useHeader } from "../../hooks/useHeader";
import NavDesktop from "./header/NavDesktop";
import UserMenuDesktop from "./header/UserMenuDesktop";
import MobileMenu from "./header/MobileMenu";
import logoCompleto from "../../assets/images/logo_completo.webp";

const navLinkClasses =
  "relative inline-block py-1 text-gray-700 font-medium transition-colors hover:text-naranja after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-naranja after:transition-all after:duration-300 hover:after:w-full";

export default function Header({ hideOnScroll = false }) {
  const {
    user,
    isMobileMenuOpen, setIsMobileMenuOpen,
    isProfileMenuOpen, setIsProfileMenuOpen,
    headerHidden,
    profileMenuRef,
    handleLogout,
    isActive,
  } = useHeader({ hideOnScroll });

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-naranja focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      <header
        className={`bg-white shadow-sm sticky top-0 z-50 will-change-transform transition-transform duration-300 ${hideOnScroll && headerHidden ? "-translate-y-full" : "translate-y-0"}`}
        role="banner"
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">

            {/* IZQUIERDA: Logo + Nav Desktop */}
            <div className="flex items-center gap-8">
              <Link to="/" className="shrink-0" aria-label="Ir al inicio de Consultora JB">
                <img
                  className="h-10 w-auto sm:h-12 object-contain"
                  src={logoCompleto}
                  alt="Logo de Consultora de Asesoría Empresarial JB"
                  width={444}
                  height={100}
                />
              </Link>
              <NavDesktop isActive={isActive} />
            </div>

            {/* DERECHA: Usuario + Publicar (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <UserMenuDesktop
                  user={user}
                  isProfileMenuOpen={isProfileMenuOpen}
                  setIsProfileMenuOpen={setIsProfileMenuOpen}
                  profileMenuRef={profileMenuRef}
                  handleLogout={handleLogout}
                />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center w-[140px] py-2 bg-slate-50 border border-gray-200 rounded-full text-gray-700 hover:border-naranja hover:text-naranja hover:bg-orange-50 transition-all duration-300 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-naranja text-sm"
                >
                  Iniciar sesión
                </Link>
              )}

              {/* Solo visible para admins */}
              {user?.rol_nombre === "admin" && (
                <>
                  <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
                  <Link to="/admin/ofertas" className={navLinkClasses}>
                    Publicar empleos
                  </Link>
                </>
              )}
            </div>

            {/* HAMBURGUESA (Móvil) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
                className="text-gray-700 hover:text-naranja focus:outline-none focus-visible:ring-2 focus-visible:ring-naranja rounded-lg p-2"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Abrir menú principal"
              >
                <Bars3Icon className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        isActive={isActive}
        handleLogout={handleLogout}
      />
    </>
  );
}