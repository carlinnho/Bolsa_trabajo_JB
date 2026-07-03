import { useFavorites } from "../../../hooks/useFavorites";
import FavoriteCard from "./FavoriteCard";
import PageHeader from "../PageHeader";

export default function FavoriteApplications() {
  const { favoritos, total, isDirty, eliminarFavorito } = useFavorites();

  return (
    <div className="w-full pt-2">

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start justify-between">
        <PageHeader
          title="Mis Favoritos"
          description="Empleos que guardaste para revisar con calma y postular cuando estés listo."
          isDirty={isDirty}
        />
        <span className="shrink-0 rounded-xl border border-turquesa bg-white px-4 py-2 text-sm font-bold text-turquesa shadow-sm">
          {total} guardados
        </span>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-4">
        {favoritos.length > 0 ? (
          favoritos.map((favorito) => (
            <FavoriteCard
              key={favorito.id}
              favorito={favorito}
              onEliminar={eliminarFavorito}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-white border border-[#e8edf5] px-6 py-12 text-center text-sm text-[#9aa3bd]">
            No tienes empleos guardados todavía.
          </div>
        )}
      </div>
    </div>
  );
}