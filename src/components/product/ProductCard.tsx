'use client';

import { formatCurrency } from '@/lib/utils/formatCurrency';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    codigo: string;
    nome: string;
    imagem: string;
    preco: string;
    descricao: string;
    isExclusive?: boolean;
    availableColors?: string[];
    shortDescription?: string;
  };
  onViewDetails: () => void;
}

const MOCK_COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1'];

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {

  const isProductExclusive = product.isExclusive ?? true;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 transition-shadow hover:shadow-xl">
      {isProductExclusive && (
        <span className="absolute top-2 right-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white z-10">EXCLUSIVO!</span>
      )}
      
      <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center p-4">
        <Image
          src={product.imagem}
          alt={product.nome}
          width={180}
          height={180}
          objectFit="contain"
          priority
        />
      </div>
      
      <div className="p-4 pt-2">
        <h3 className="text-base font-semibold text-gray-800 mt-2 line-clamp-1">{product.nome}</h3>
        <p className="text-xs text-gray-500">Cód. {product.codigo}</p>

        <div className="flex items-center text-xs text-gray-600 mt-3 space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Com embalagem especial</span>
        </div>
        <div className="flex items-center text-xs text-gray-600 mt-1 space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Gerado pelo nosso sistema</span>
        </div>

        <p className="text-xs text-gray-600 mt-3 line-clamp-2">
          {product.shortDescription || product.descricao}
        </p>

        <div className="flex items-center mt-3">
          <span className="text-xs font-medium text-gray-700 mr-2">Cores:</span>
          {MOCK_COLORS.map((color, index) => (
            <div
              key={index}
              className="h-4 w-4 rounded-full border border-gray-300 mr-1"
              style={{ backgroundColor: color }}
            ></div>
          ))}
          <span className="text-xs text-gray-500 ml-1">e mais 5</span>
        </div>

        <p className="mt-4 text-xs text-gray-500">A partir de</p>
        <p className="text-xl font-bold text-blue-600">{formatCurrency(parseFloat(product.preco))}</p>
        <p className="text-xs text-gray-500">gerado pelo nosso sistema</p>
        
        <button 
          onClick={onViewDetails}
          className="mt-4 w-full rounded-md bg-green-500 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
        >
          CONFIRA
        </button>
      </div>
    </div>
  );
}