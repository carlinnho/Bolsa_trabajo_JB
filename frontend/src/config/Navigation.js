import { BookmarkIcon, UserCircleIcon, HeartIcon } from "@heroicons/react/24/outline";

export const NAV_ITEMS = [
  {
    id: "information",
    path: "/profile/my-information", // Debe coincidir con App.jsx
    label: "Mis Datos",
    icon: UserCircleIcon,
  },
  {
    id: "applications",
    path: "/profile/my-applications", // Debe coincidir con App.jsx
    label: "Mis Postulaciones",
    icon: BookmarkIcon,
  },
  {
    id: "favorites",
    path: "/profile/my-favorite-applications", // Debe coincidir con App.jsx
    label: "Mis Favoritos",
    icon: HeartIcon,
  },
];