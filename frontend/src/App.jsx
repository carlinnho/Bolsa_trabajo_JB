import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Buscador from "./pages/Buscador";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Empresas from "./pages/admin/Empresas";
import Ofertas from "./pages/admin/Ofertas";
import Embudo from "./pages/admin/Embudo";
import Postulantes from "./pages/admin/Postulantes"; // ← FALTABA ESTO

function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar-empleo" element={<Buscador />} />
        </Route>

        <Route
          path="/login"
          element={
            <main className="min-h-screen bg-slate-50">
              <Login />
            </main>
          }
        />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/empresas" element={<Empresas />} />
          <Route path="/admin/ofertas" element={<Ofertas />} />
          <Route path="/admin/embudo" element={<Embudo />} />
          <Route path="/admin/postulantes" element={<Postulantes />} /> {/* ← FALTABA ESTO */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;