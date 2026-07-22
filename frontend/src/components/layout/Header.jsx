import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useHeader } from "../../hooks/useHeader";
import NavDesktop from "./header/NavDesktop";
import UserMenuDesktop from "./header/UserMenuDesktop";
import MobileMenu from "./header/MobileMenu";
import logoCompleto from "../../assets/images/logo_completo.webp";

const navLinkClasses =
  "relative inline-block py-1 text-gray-700 font-medium transition-colors hover:text-naranja after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-naranja after:transition-all after:duration-300 hover:after:w-full";

const logo = "https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png";

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
              <div className="h-6 w-px bg-gray-300" aria-hidden="true"></div>{" "}
              {/* Separador visual */}
              {/* Enlace de Publicar Empleos (Solo admin) */}
              {user?.rol_nombre === "admin" && (
                <Link to="/admin/ofertas" className={navLinkClasses}>
                  Publicar empleos
                </Link>
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

      {/* MENÚ MÓVIL (Pantalla Completa, estilo "Configuración" de app nativa) */}
      <div
        className={`fixed inset-0 z-100 bg-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú móvil */}
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 bg-white border-b border-gray-100 shadow-sm shrink-0">
            <img
              className="h-10 w-auto object-contain"
              src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png"
              alt="Logo de Consultora de Asesoría Empresarial JB"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-naranja p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-naranja"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido del Menú Móvil (Scrollable) */}
          <div className="flex flex-col flex-1 overflow-y-auto bg-white px-4 sm:px-6 py-6 gap-6">
            {/* TARJETA: Iniciar Sesión (solo visitantes, arriba de todo) */}
            {!user && (
              <section aria-labelledby="mobile-login-heading">
                <h2
                  id="mobile-login-heading"
                  className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1"
                >
                  Cuenta
                </h2>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileCardLinkClasses}
                  >
                    <div
                      className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        focusable="false"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <span className="flex-1">Iniciar sesión</span>
                    <svg
                      className="w-4 h-4 text-gray-300 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </section>
            )}

            {/* TARJETA 1: Navegación Principal */}
            <section aria-labelledby="mobile-nav-heading">
              <h2
                id="mobile-nav-heading"
                className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1"
              >
                Navegación
              </h2>
              <nav aria-label="Navegación principal (móvil)">
                <ul className="list-none bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                  <li>
                    <Link
                      to="/"
                      className={mobileCardLinkClasses}
                      aria-current={isActive("/") ? "page" : undefined}
                    >
                      <div
                        className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          focusable="false"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 12l2-2m0 0l7-7 7 7m-9-7v18m0 0h6a2 2 0 002-2v-7m-8 9H5a2 2 0 01-2-2v-7"
                          />
                        </svg>
                      </div>
                      <span className="flex-1">Inicio</span>
                      <svg
                        className="w-4 h-4 text-gray-300 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/buscar-empleo"
                      className={mobileCardLinkClasses}
                      aria-current={
                        isActive("/buscar-empleo") ? "page" : undefined
                      }
                    >
                      <div
                        className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          focusable="false"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                          />
                        </svg>
                      </div>
                      <span className="flex-1">Buscar empleo</span>
                      <svg
                        className="w-4 h-4 text-gray-300 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/evaluaciones"
                      className={mobileCardLinkClasses}
                      aria-current={
                        isActive("/evaluaciones") ? "page" : undefined
                      }
                    >
                      <div
                        className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          focusable="false"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 21h18M5 21V7l8-4v18M13 21v-9l6 3v6M9 9h.01M9 13h.01"
                          />
                        </svg>
                      </div>
                      <span className="flex-1">Evaluaciones de empresa</span>
                      <svg
                        className="w-4 h-4 text-gray-300 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </nav>
            </section>

            {/* TARJETA 2 y 3: Acciones de Usuario en Móvil */}
            {user ? (
              <>
                {/* TARJETA: Mi Cuenta */}
                <section aria-labelledby="mobile-account-heading">
                  <h2
                    id="mobile-account-heading"
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1"
                  >
                    Mi Cuenta
                  </h2>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Resumen de Perfil */}
                    <div className="flex items-center gap-4 p-4 border-b border-gray-100">
                      <span
                        className="bg-naranja text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl uppercase shadow-sm shrink-0"
                        aria-hidden="true"
                      >
                        {user.nombre_completo.charAt(0)}
                      </span>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-gray-800 truncate">
                          {user.nombre_completo}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.correo}
                        </p>
                      </div>
                    </div>

                    {/* Enlaces de Perfil Móvil */}
                    <nav aria-label="Gestión de cuenta">
                      <ul className="list-none divide-y divide-gray-100">
                        <li>
                          <Link
                            to="/mi-perfil"
                            className={mobileCardLinkClasses}
                          >
                            <div
                              className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                focusable="false"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <span className="flex-1">Mi perfil</span>
                            <svg
                              className="w-4 h-4 text-gray-300 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/mi-perfil/postulaciones"
                            className={mobileCardLinkClasses}
                          >
                            <div
                              className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                focusable="false"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <span className="flex-1">Mis postulaciones</span>
                            <svg
                              className="w-4 h-4 text-gray-300 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/mi-perfil/favoritos"
                            className={mobileCardLinkClasses}
                          >
                            <div
                              className="bg-blue-50 p-2 rounded-lg text-azul shrink-0"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                focusable="false"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </div>
                            <span className="flex-1">Mis favoritos</span>
                            <svg
                              className="w-4 h-4 text-gray-300 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </li>
                        <li className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3.5 text-[15px] font-medium text-red-600 active:bg-red-50 transition-colors"
                          >
                            <div
                              className="bg-red-50 p-2 rounded-lg text-red-500 shrink-0"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                focusable="false"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </div>
                            <span className="flex-1 text-left">
                              Cerrar sesión
                            </span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </section>

                {/* TARJETA: Para empresas (Solo admin) */}
                {user?.rol_nombre === "admin" && (
                <section aria-labelledby="mobile-business-heading">
                  <h2
                    id="mobile-business-heading"
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1"
                  >
                    Para empresas
                  </h2>
                  <nav aria-label="Opciones para empresas">
                    <ul className="list-none bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                      <li>
                        <Link
                          to="/admin/ofertas"
                          className={mobileCardLinkClasses}
                        >
                          <div
                            className="bg-orange-50 p-2 rounded-lg text-naranja shrink-0"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              focusable="false"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                          <span className="flex-1">Publicar empleo</span>
                          <svg
                            className="w-4 h-4 text-gray-300 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/empresas/solicitar-informacion"
                          className={mobileCardLinkClasses}
                        >
                          <div
                            className="bg-orange-50 p-2 rounded-lg text-naranja shrink-0"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              focusable="false"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="flex-1">Solicitar información</span>
                          <svg
                            className="w-4 h-4 text-gray-300 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </section>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}