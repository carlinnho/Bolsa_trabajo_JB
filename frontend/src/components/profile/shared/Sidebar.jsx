import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../../config/Navigation';

export default function Sidebar() {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 justify-center bg-white mx-auto my-8 px-3 sm:px-6 py-3 shadow-sm border-b border-[#e8edf5] w-auto rounded-2xl">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-center transition-colors ${
              isActive
                ? 'bg-[#123498] text-white/90 '
                : 'text-gray-600 hover:bg-white/50 hover:text-[#123498]'
            }`
          }
        >
          <item.icon className="w-4 h-4" strokeWidth={2} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}