import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Esta será la página principal que hará tu compañero */}
        <Route path="/" element={<div className="p-10 text-center">Página Principal</div>} />
        
        {/* Esta es tu página de Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;