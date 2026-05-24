"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Product, Category, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from "@/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visible = products.filter((p) => p.visible);
  const featured = visible.filter((p) => p.featured);

  const categories: Category[] = [
    "siempre_disponible",
    "temporada",
    "sobre_pedido",
  ];

  return (
    <>
      <Hero />

      {/* ── Categories ──────────────────────────────────────────── */}
      <section id="categorias" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
                style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
              >
                Colecciones
              </span>
              <h2
                className="font-display font-light text-stone-900 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                Flores para{" "}
                <em style={{ fontStyle: "italic" }}>cada ocasión</em>
              </h2>
            </div>
            <Link
              href="/tienda"
              className="text-sm font-medium text-stone-400 hover:text-brand flex items-center gap-2 shrink-0"
              style={{ transition: "color 150ms var(--ease-out)", fontFamily: "'Inter', sans-serif" }}
            >
              Ver todo
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => {
              const count = visible.filter((p) => p.category === cat).length;
              const images = [
                "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=700&fit=crop",
                "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=700&fit=crop",
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=700&fit=crop",
              ];
              return (
                <Link
                  key={cat}
                  href={`/tienda?cat=${cat}`}
                  className="btn-press group relative overflow-hidden block"
                  style={{
                    aspectRatio: i === 0 ? "3/4" : "3/4",
                    transition: "transform 250ms var(--ease-out)",
                  }}
                >
                  {/* Background image */}
                  <img
                    src={images[i]}
                    alt={CATEGORY_LABELS[cat]}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transition: "transform 600ms var(--ease-out)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(26,22,20,0.72) 0%, rgba(26,22,20,0.1) 50%, transparent 100%)",
                    }}
                  />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {count} productos
                    </p>
                    <h3
                      className="font-display text-white font-light text-xl leading-tight"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <p
                      className="text-white/70 text-xs mt-1 line-clamp-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {CATEGORY_DESCRIPTIONS[cat]}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#FAF9F7" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
                style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
              >
                Selección especial
              </span>
              <h2
                className="font-display font-light text-stone-900 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                Productos{" "}
                <em style={{ fontStyle: "italic" }}>destacados</em>
              </h2>
            </div>
            <Link
              href="/tienda"
              className="text-sm font-medium text-stone-400 hover:text-brand flex items-center gap-2 shrink-0"
              style={{ transition: "color 150ms var(--ease-out)", fontFamily: "'Inter', sans-serif" }}
            >
              Ver catálogo completo
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <SkeletonGrid count={4} />
          ) : featured.length > 0 ? (
            <ProductGrid products={featured} />
          ) : (
            <ProductGrid products={visible.slice(0, 4)} />
          )}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  src: "https://images.unsplash.com/photo-1738951171612-b1d02b4bbaed?w=480&h=560&fit=crop",
                  className: "col-span-1 row-span-2",
                  style: { aspectRatio: "2/3" },
                },
                {
                  src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=480&h=320&fit=crop",
                  className: "col-span-1",
                  style: { aspectRatio: "4/3" },
                },
                {
                  src: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=480&h=320&fit=crop",
                  className: "col-span-1",
                  style: { aspectRatio: "4/3" },
                },
              ].map((img, i) => (
                <div key={i} className={`overflow-hidden ${img.className}`} style={img.style}>
                  <img
                    src={img.src}
                    alt={`Florería ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 500ms var(--ease-out)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Text */}
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-4"
                style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
              >
                Nuestra historia
              </span>
              <h2
                className="font-display font-light text-stone-900 leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
              >
                Creamos momentos{" "}
                <em style={{ fontStyle: "italic" }}>inolvidables</em>
              </h2>

              <div
                className="space-y-4 leading-relaxed mb-10"
                style={{ color: "#6B6460", fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
              >
                <p>
                  Somos una florería apasionada por la belleza natural de las flores.
                  Cada arreglo que creamos lleva consigo dedicación, amor y el deseo
                  de hacer que cada momento sea especial.
                </p>
                <p>
                  Trabajamos directamente con productores locales para garantizar la
                  frescura y calidad de nuestras flores, llevando lo mejor de la
                  naturaleza directamente a tu puerta.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-100">
                {[
                  { value: "Frescura", sub: "Flores diarias del campo" },
                  { value: "Entrega", sub: "A domicilio en la ciudad" },
                  { value: "Cuidado", sub: "Cada pedido, personalizado" },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      className="font-display font-medium text-stone-900 text-base mb-1"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-xs leading-snug"
                      style={{ color: "#8C8480", fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All products ─────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#F5F3F1" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="font-display font-light text-stone-900 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Todo el <em style={{ fontStyle: "italic" }}>catálogo</em>
            </h2>
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : (
            <ProductGrid products={visible.slice(0, 8)} />
          )}

          {visible.length > 8 && (
            <div className="text-center mt-12">
              <Link
                href="/tienda"
                className="btn-press inline-flex items-center gap-2.5 border border-stone-300 text-stone-700 px-8 py-3.5 text-sm font-medium hover:border-brand hover:text-brand"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 200ms var(--ease-out), color 200ms var(--ease-out)",
                }}
              >
                Ver catálogo completo ({visible.length} productos)
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="fade-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {[...Array(count)].map((_, i) => (
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
  );
}
