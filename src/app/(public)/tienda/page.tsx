"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Product, Category } from "@/types";

function TiendaContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as Category | null) ?? "todos";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | "todos">(initialCat);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(
    () => products.filter((p) => p.visible),
    [products]
  );

  const filtered = useMemo(() => {
    let result = visible;
    if (category !== "todos") {
      result = result.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [visible, category, search]);

  const counts = useMemo(() => {
    const cats: Array<Category | "todos"> = [
      "todos",
      "siempre_disponible",
      "temporada",
      "sobre_pedido",
    ];
    return Object.fromEntries(
      cats.map((c) => [
        c,
        c === "todos"
          ? visible.length
          : visible.filter((p) => p.category === c).length,
      ])
    ) as Record<Category | "todos", number>;
  }, [visible]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nuestra{" "}
                <span className="text-pink-500 italic">Tienda</span>
              </h1>
              <p className="text-gray-500 mt-1">
                {loading
                  ? "Cargando productos..."
                  : `${visible.length} productos disponibles`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar flores..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all bg-white"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-6">
            <CategoryFilter
              selected={category}
              onChange={(c) => {
                setCategory(c);
                setSearch("");
              }}
              counts={counts}
            />
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-pink-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-8 bg-pink-100 rounded-full w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="text-sm text-gray-400 mb-4">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {search && ` para "${search}"`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🌷</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No encontramos flores
            </h3>
            <p className="text-gray-400 mb-6">
              {search
                ? `No hay resultados para "${search}"`
                : "Esta categoría no tiene productos disponibles"}
            </p>
            <button
              onClick={() => {
                setCategory("todos");
                setSearch("");
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-gray-400">
            <span className="text-5xl block mb-3 animate-pulse">🌸</span>
            <p>Cargando tienda...</p>
          </div>
        </div>
      }
    >
      <TiendaContent />
    </Suspense>
  );
}
