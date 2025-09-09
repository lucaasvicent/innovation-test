'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

type SortOption = 'preco_asc' | 'preco_desc' | 'nome_az' | 'nome_za' | null;
interface FilterControlsProps {
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: SortOption) => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
  currentSort: SortOption;
}

export default function FilterControls({
  onSearch,
  onSort,
  onToggleFavorites,
  showFavorites,
  currentSort,
}: FilterControlsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Buscar por nome ou código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
          <select
            value={currentSort || ''}
            onChange={(e) => onSort(e.target.value === '' ? null : (e.target.value as SortOption))}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm text-gray-400"
          >
            <option value="">Sem ordenação</option>
            <option value="preco_asc">Preço: Menor para Maior</option>
            <option value="preco_desc">Preço: Maior para Menor</option>
            <option value="nome_az">Nome: A-Z</option>
            <option value="nome_za">Nome: Z-A</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFavorites}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${showFavorites ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
          >
            <svg
              className={`h-5 w-5 mr-2 ${showFavorites ? 'text-white' : 'text-red-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.631-.921 1.932 0l1.246 3.821a1 1 0 00.95.691h4.024c.969 0 1.371 1.24.588 1.81l-3.25 2.36a1 1 0 00-.364 1.118l1.246 3.821c.3.921-.755 1.688-1.54 1.118l-3.25-2.36a1 1 0 00-1.176 0l-3.25 2.36c-.785.57-1.84-.197-1.54-1.118l1.246-3.821a1 1 0 00-.364-1.118l-3.25-2.36c-.783-.57-.381-1.81.588-1.81h4.024a1 1 0 00.95-.691l1.246-3.821z" />
            </svg>
            Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}