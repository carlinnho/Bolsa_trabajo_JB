import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";

const Profile = () => {
  return (
    <div className="flex h-screen bg-[#f4f6fb] font-sans">
      {/* PANEL IZQUIERDO: Componente Sidebar separado */}
      <Sidebar />

      {/* PANEL DERECHO: Contenido Dinámico */}
      <main className="flex-1 overflow-y-auto px-10 py-9">
        <div className="mx-auto max-w-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Profile;