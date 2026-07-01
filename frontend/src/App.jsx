import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Information from "./components/profile/Information/Information";
import Applications from "./components/profile/Application/Applications";
import FavoriteApplications from "./components/profile/FavoriteApplication/FavoriteApplications";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="bg-slate-50">
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
          <Route
            path="/"
            element={<div className="p-10 text-center">Página Principal</div>}
          />
          
          <Route path="/mi-perfil" element={<Profile />}>
            <Route index element={<Information />} />
            <Route path="postulaciones" element={<Applications />} />
            <Route path="favoritos" element={<FavoriteApplications />} />
          </Route>
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
