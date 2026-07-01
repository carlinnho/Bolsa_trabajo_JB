import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Buscador from "./pages/Buscador";
import Home from "./pages/Home";

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <Header hideOnScroll={location.pathname === "/buscar-empleo"} />
      <main className="min-h-screen bg-slate-50">
        <Outlet />{" "}
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
      </Routes>
    </Router>
  );
}

export default App;
