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
    <div
      className="group bg-white flex flex-col overflow-hidden"
      style={{
        boxShadow: "0 1px 4px -1px rgba(0,0,0,0.08)",
        transition: "box-shadow 250ms var(--ease-out), transform 250ms var(--ease-out)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px -8px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px -1px rgba(0,0,0,0.08)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-50 aspect-square">
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider ${badgeColor}`}
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}
          >
            {product.badge}
          </span>
        )}

        {/* Category — bottom overlay */}
        <span
          className="absolute bottom-0 left-0 right-0 z-10 px-3 py-1.5 text-[10px] font-medium text-stone-600 bg-white/90 backdrop-blur-sm"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
        >
          {CATEGORY_LABELS[product.category]}
        </span>

        {imgError || !product.image ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-300">
            <FlowerIcon />
            <span className="text-xs mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>Sin imagen</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{
              transition: "transform 500ms var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        <h3
          className="font-medium text-stone-900 mb-1 line-clamp-1 text-sm sm:text-base leading-snug"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {product.name}
        </h3>
        <p
          className="text-stone-400 text-xs sm:text-sm line-clamp-2 mb-4 flex-1 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span
            className="font-display text-xl font-medium text-stone-900"
            style={{ letterSpacing: "-0.02em" }}
          >
            ${product.price.toLocaleString("es-MX")}
          </span>
          <button
            onClick={handleAdd}
            className="btn-press flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.02em",
              background: added ? "#4A7C59" : "#7C2D3C",
              color: "white",
              transition: "background 200ms var(--ease-out)",
            }}
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
  if (!badge) return "bg-brand";
  const b = badge.toLowerCase();
  if (b.includes("nuevo") || b.includes("new")) return "bg-stone-700";
  if (b.includes("boda") || b.includes("pedido")) return "bg-brand";
  if (b.includes("temporada")) return "bg-sage";
  if (b.includes("vendido")) return "bg-stone-500";
  return "bg-brand";
}

function FlowerIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4 4 0 014 4M12 6.5a4 4 0 00-4 4M12 6.5V3M8 10.5a4 4 0 004 4M8 10.5H4.5M16 10.5a4 4 0 01-4 4M16 10.5H19.5M12 14.5v3.5" />
    </svg>
  );
}

function PlusSvg() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
