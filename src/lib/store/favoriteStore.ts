import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  addFavorite: (codigo: string) => void;
  removeFavorite: (codigo: string) => void;
  isFavorite: (codigo: string) => boolean;
}

const getInitialFavorites = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedFavorites = localStorage.getItem('favorites');
    try {
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch {
      return [];
    }
  }
  return [];
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: getInitialFavorites(),
  
  addFavorite: (codigo) => {
    const newFavorites = [...get().favorites, codigo];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },

  removeFavorite: (codigo) => {
    const newFavorites = get().favorites.filter((fav) => fav !== codigo);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },

  isFavorite: (codigo) => get().favorites.includes(codigo),
}));