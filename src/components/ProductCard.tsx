"use client";

import Image from "next/image";
import { Product, CATEGORY_LABELS } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const badgeColor = getBadgeColor(product.badge);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image container */}
      <div className="relative overflow-hidden bg-pink-50 aspect-square">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${badgeColor}`}
          >
            {product.badge}
          </span>
        )}

        {/* Category pill — bottom-right to avoid overlap with badge */}
        <span className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
          {CATEGORY_LABELS[product.category]}
        </span>

        {imgError || !product.image ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <span className="text-5xl mb-2">🌸</span>
            <span className="text-xs">Sin imagen</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm sm:text-base">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="text-pink-600 font-bold text-lg">
            ${product.price.toLocaleString("es-MX")}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-pink-500 hover:bg-pink-600 text-white hover:scale-105"
            }`}
          >
            {added ? (
              <>
                <CheckSvg />
                <span className="hidden sm:inline">Agregado</span>
              </>
            ) : (
              <>
                <PlusSvg />
                <span className="hidden sm:inline">Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function getBadgeColor(badge?: string) {
  if (!badge) return "bg-pink-500";
  const b = badge.toLowerCase();
  if (b.includes("nuevo") || b.includes("new")) return "bg-blue-500";
  if (b.includes("boda") || b.includes("pedido")) return "bg-purple-500";
  if (b.includes("temporada")) return "bg-amber-500";
  if (b.includes("vendido")) return "bg-rose-500";
  return "bg-pink-500";
}

function PlusSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
