import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Information from "./components/profile/Information/Information";
import Applications from "./components/profile/Applications";
import FavoriteApplications from "./components/profile/FavoriteApplications";

function App() {
  return (
    <Router>
      <Routes>
        {/* Esta será la página principal que hará tu compañero */}
        <Route path="/" element={<div className="p-10 text-center">Página Principal</div>} />
        
        {/* Esta es tu página de Login */}
        <Route path="/login" element={<Login />}/>
        {/* Esta es tu página de Profile */}
        <Route path="/profile" element={<Profile />}>
          {/* RUTAS HIJAS: Se renderizan donde pusiste el <Outlet /> */}
          <Route path="my-information" element={<Information />} />
          <Route path="my-applications" element={<Applications />} />
          <Route path="my-favorite-applications" element={<FavoriteApplications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;