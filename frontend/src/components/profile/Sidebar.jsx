import { NavLink } from 'react-router-dom';
import ProfileProgress from '../profile/Information/ProfileProgress';
import { NAV_ITEMS } from '../../config/Navigation';

export default function Sidebar() {
  const progress = { value: 50, hint: 'Agrega tu CV' };

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-8 bg-linear-to-b from-azul to-[#0d2670] p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-naranja text-blanco font-bold">
          P
        </div>
        <div>
          <p className="font-bold text-blanco">Panel de Usuario</p>
          <p className="text-[9px] uppercase text-blanco/70">Portal de Gestión</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {/* Usamos map para recorrer nuestra lista de navegación */}
        {NAV_ITEMS.map((item) => (
          <NavLink 
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive ? 'bg-naranja text-blanco font-semibold' : 'text-blanco/70 hover:bg-white/10 hover:text-blanco'
              }`
            }
          >
            {/* Renderizamos el ícono como un componente */}
            <item.icon className="w-5 h-5" strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <ProfileProgress value={progress.value} hint={progress.hint} />
    </aside>
  );
}