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
    <div className="min-h-screen" style={{ background: "#FAF9F7" }}>
      {/* Page header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
              >
                Catálogo
              </span>
              <h1
                className="font-display font-light text-stone-900 leading-tight"
                style={{ fontSize: "clamp(1.875rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                Nuestra <em style={{ fontStyle: "italic" }}>tienda</em>
              </h1>
              <p
                className="mt-1 text-sm"
                style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}
              >
                {loading ? "Cargando productos..." : `${visible.length} productos disponibles`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar flores..."
                className="w-full pl-9 pr-4 py-2.5 border border-stone-200 text-sm focus:outline-none bg-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 150ms var(--ease-out)",
                  color: "#1C1917",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#A8A29E" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-6">
            <CategoryFilter
              selected={category}
              onChange={(c) => { setCategory(c); setSearch(""); }}
              counts={counts}
            />
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white overflow-hidden animate-pulse">
                <div className="aspect-square bg-stone-100" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3.5 bg-stone-100 w-3/4" />
                  <div className="h-3 bg-stone-100 w-full" />
                  <div className="h-3 bg-stone-100 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p
              className="text-sm mb-5"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {search && ` para "${search}"`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((product, i) => (
                <div key={product.id} className="fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div
              className="w-16 h-px mx-auto mb-8"
              style={{ background: "#E7E5E4" }}
            />
            <h3
              className="font-display font-light text-stone-700 text-2xl mb-2"
              style={{ letterSpacing: "-0.01em" }}
            >
              Sin resultados
            </h3>
            <p
              className="text-sm mb-8"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              {search ? `No hay resultados para "${search}"` : "Esta categoría no tiene productos disponibles"}
            </p>
            <button
              onClick={() => { setCategory("todos"); setSearch(""); }}
              className="btn-press inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
              style={{
                fontFamily: "'Inter', sans-serif",
                transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
              }}
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
