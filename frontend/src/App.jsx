import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
<<<<<<< HEAD

// ── Layout global ────────────────────────────────────────────
=======
>>>>>>> main
import Header from "./components/layout/Header";
import Login from "./pages/Login";
import Buscador from "./pages/Buscador";
import Home from "./pages/Home";
import CuentaValidada from "./pages/CuentaValidada";
import RevisaCorreo from "./pages/RevisaCorreo";
import Profile from "./pages/Profile";
import Information from "./components/profile/Information/Information";
import Applications from "./components/profile/Application/Applications";
import FavoriteApplications from "./components/profile/FavoriteApplication/FavoriteApplications";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";

<<<<<<< HEAD
// ── Lazy: se cargan solo cuando el usuario navega a esa ruta ─
const Home = lazy(() => import("./pages/Home"));
const Buscador = lazy(() => import("./pages/Buscador"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const CuentaValidada = lazy(() => import("./pages/CuentaValidada"));
const RevisaCorreo = lazy(() => import("./pages/RevisaCorreo"));
const Information = lazy(
  () => import("./components/profile/Information/Information"),
);
const Applications = lazy(
  () => import("./components/profile/Application/Applications"),
);
const FavoriteApplications = lazy(
  () => import("./components/profile/FavoriteApplication/FavoriteApplications"),
);
=======
const GOOGLE_CLIENT_ID = "102292791934-vdo8ihbfaqrkmvsp91r1druc46pes4ho.apps.googleusercontent.com";
>>>>>>> main

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center text-[#6b7a9f] text-sm">
    Cargando...
  </div>
);

<<<<<<< HEAD
const GOOGLE_CLIENT_ID =
  "102292791934-vdo8ihbfaqrkmvsp91r1druc46pes4ho.apps.googleusercontent.com";

=======
>>>>>>> main
function MainLayout() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/buscar-empleo" && <Header />}
      <main id="main-content" className="bg-slate-50">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
<<<<<<< HEAD
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/buscar-empleo" element={<Buscador />} />
              <Route path="/mi-perfil" element={<Profile />}>
                <Route index element={<Information />} />
                <Route path="postulaciones" element={<Applications />} />
                <Route path="favoritos" element={<FavoriteApplications />} />
              </Route>
=======
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buscar-empleo" element={<Buscador />} />
            <Route path="/mi-perfil" element={<Profile />}>
              <Route index element={<Information />} />
              <Route path="postulaciones" element={<Applications />} />
              <Route path="favoritos" element={<FavoriteApplications />} />
>>>>>>> main
            </Route>

            <Route
              path="/login"
              element={
                <main className="min-h-screen bg-slate-50">
                  <Login />
                </main>
              }
            />

<<<<<<< HEAD
            <Route
              path="/cambiar-contrasena"
              element={
                <main className="min-h-screen bg-[#f4f6fb]">
                  <ChangePassword />
                </main>
              }
            />
=======
        {/* RUTA ADMIN */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
>>>>>>> main

            <Route path="/cuenta-validada" element={<CuentaValidada />} />
            <Route path="/revisa-tu-correo" element={<RevisaCorreo />} />
          </Routes>
        </Suspense>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
