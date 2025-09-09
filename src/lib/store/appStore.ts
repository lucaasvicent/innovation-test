import { create } from 'zustand';

interface Product {
  codigo: string;
  nome: string;
  referencia: string;
  imagem: string;
  preco: string;
  descricao: string;
}

interface AppState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isModalOpen: boolean;
  selectedProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  setToken: (token) => {
    localStorage.setItem('auth_token', token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem('auth_token');
    set({ token: null });
  },
  isModalOpen: false,
  selectedProduct: null,
  openModal: (product) => set({ isModalOpen: true, selectedProduct: product }),
  closeModal: () => set({ isModalOpen: false, selectedProduct: null }),
}));