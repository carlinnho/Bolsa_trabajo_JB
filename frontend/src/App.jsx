import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Buscador from './pages/Buscador';

function App() {
  return (
    <Router>
      <Routes>
        {/* Esta será la página principal que hará tu compañero */}
        <Route path="/" element={<div className="p-10 text-center">Página Principal</div>} />
        
        {/* Esta es tu página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Buscador interactivo split-plane */}
        <Route path="/vacantes" element={<Buscador />} />
      </Routes>
    </Router>
  );
}

export default App;