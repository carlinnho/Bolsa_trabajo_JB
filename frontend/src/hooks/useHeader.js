import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useHeader({ hideOnScroll = false } = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [headerHidden, setHeaderHidden] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const lastScrollY = useRef(0);

  // Verificar si el usuario está logueado al cambiar de ruta
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  // Cerrar menú de perfil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Ocultar/mostrar header al scrollear
  useEffect(() => {
    if (!hideOnScroll) return;
    const handleScroll = () => {
      setHeaderHidden(window.scrollY > 0);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScroll]);

  // Resetear estado al cambiar de ruta
  useEffect(() => {
    if (!hideOnScroll) setHeaderHidden(false);
    lastScrollY.current = 0;
  }, [location, hideOnScroll]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return {
    user,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    headerHidden,
    profileMenuRef,
    handleLogout,
    isActive,
  };
}