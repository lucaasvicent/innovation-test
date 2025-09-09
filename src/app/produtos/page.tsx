'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import Header from '@/components/common/Header';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import Modal from '@/components/common/Modal';
import ProductCard from '@/components/product/ProductCard';
import ProductDetailModal from '@/components/product/ProductDetailModal';
import FilterControls from '@/components/product/FilterControls';
import api from '@/lib/api/api';
import { ENDPOINTS } from '@/lib/api/endpoint';
import { useAppStore } from '@/lib/store/appStore';
import { useFavoritesStore } from '@/lib/store/favoriteStore';

interface Product {
  codigo: string;
  nome: string;
  referencia: string;
  imagem: string;
  preco: string;
  descricao: string;
  isExclusive?: boolean;
  availableColors?: string[];
  shortDescription?: string;
}

const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export default function ProdutosPage() {
  const { token } = useAppStore();
  const { favorites } = useFavoritesStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'preco_asc' | 'preco_desc' | 'nome_az' | 'nome_za' | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const { data: products, error, isLoading } = useSWR<Product[]>(
    token ? ENDPOINTS.listarProdutos : null,
    fetcher
  );

  const { isModalOpen, selectedProduct, openModal, closeModal } = useAppStore();

  const handleOpenModal = (product: Product) => {
    openModal(product);
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = products.map(product => ({
      ...product,
      isExclusive: true,
      shortDescription: product.descricao,
    }));

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(product => {
        const nameMatch = product.nome.toLowerCase().includes(lowerCaseSearch);
        const codeMatch = product.codigo.toLowerCase().includes(lowerCaseSearch);
        return nameMatch || codeMatch;
      });
    }

    if (showFavorites) {
      result = result.filter(product => favorites.includes(product.codigo));
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        if (sortBy === 'preco_asc') return parseFloat(a.preco) - parseFloat(b.preco);
        if (sortBy === 'preco_desc') return parseFloat(b.preco) - parseFloat(a.preco);
        if (sortBy === 'nome_az') return a.nome.localeCompare(b.nome);
        if (sortBy === 'nome_za') return b.nome.localeCompare(a.nome);
        return 0;
      });
    }

    return result;
  }, [products, searchTerm, sortBy, showFavorites, favorites]);

  if (error) {
    return (
      <div className="text-center p-8">
        Ocorreu um erro ao carregar os produtos.
        <button onClick={() => window.location.reload()} className="text-blue-500">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mt-8">
        <LoadingSkeleton count={10} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <FilterControls
          onSearch={setSearchTerm}
          onSort={setSortBy}
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
          showFavorites={showFavorites}
          currentSort={sortBy}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.codigo}
                product={product}
                onViewDetails={() => handleOpenModal(product)}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">Nenhum produto encontrado.</p>
          )}
        </div>

        {selectedProduct && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ProductDetailModal product={selectedProduct} />
          </Modal>
        )}
      </div>
    </>
  );
}