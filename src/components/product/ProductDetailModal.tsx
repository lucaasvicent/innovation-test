'use client';

import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useFavoritesStore } from '@/lib/store/favoriteStore'; 
import { Star } from 'lucide-react'; 

interface Product {
  codigo: string;
  nome: string;
  referencia: string;
  imagem: string;
  preco: string;
  descricao: string;
}

interface ProductDetailModalProps {
  product: Product;
}

export default function ProductDetailModal({ product }: ProductDetailModalProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.codigo);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.codigo);
    } else {
      addFavorite(product.codigo);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-1/2 flex-shrink-0 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
        <Image
          src={product.imagem}
          alt={product.nome}
          width={300}
          height={300}
          objectFit="contain"
          priority
          className="rounded-md"
        />
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-gray-800 break-words pr-4"
          >
            {product.nome}
          </h2>

          <button
            onClick={toggleFavorite}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorite ? (
              <Star fill="currentColor" size={24} className="text-red-500" />
            ) : (
              <Star size={24} />
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-1">
          Cód. Produto: <span className="font-semibold">{product.codigo}</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Ref. Fornecedor: <span className="font-semibold">{product.referencia}</span>
        </p>

        <hr className="my-4" />

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Descrição</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">{product.descricao}</p>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(parseFloat(product.preco))}
          </div>
          <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-green-700 transition-colors">
            Solicitar Cotação
          </button>
        </div>
      </div>
    </div>
  );
}