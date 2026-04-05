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

      {/* Categories section */}
      <section id="categorias" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Nuestras categorías
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Flores para{" "}
              <span className="text-pink-500 italic">cada ocasión</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const count = visible.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/tienda?cat=${cat}`}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">{CATEGORY_ICONS[cat]}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {CATEGORY_DESCRIPTIONS[cat]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-pink-500 bg-pink-100 px-3 py-1 rounded-full">
                      {count} productos
                    </span>
                    <span className="text-pink-500 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>

                  {/* Decorative blob */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-pink-100 rounded-full opacity-40 group-hover:scale-125 transition-transform duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Selección especial
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Productos{" "}
              <span className="text-pink-500 italic">Destacados</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Nuestros arreglos más populares, elegidos por su belleza y calidad
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-pink-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visible.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-pink-200 hover:-translate-y-0.5"
            >
              Ver todos los productos
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images collage */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl ${
                    i === 0 || i === 3 ? "aspect-square" : "aspect-video"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Florería ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Text */}
            <div>
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
                Nuestra historia
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Creamos momentos{" "}
                <span className="text-pink-500 italic">inolvidables</span>
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Somos una florería apasionada por la belleza natural de las
                  flores. Cada arreglo que creamos lleva consigo dedicación,
                  amor y el deseo de hacer que cada momento sea especial.
                </p>
                <p>
                  Trabajamos directamente con productores locales para
                  garantizar la frescura y calidad de nuestras flores, llevando
                  lo mejor de la naturaleza directamente a tu puerta.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: "🌹", label: "Flores frescas", sub: "Diariamente" },
                  { icon: "🚚", label: "Entrega", sub: "A domicilio" },
                  { icon: "💝", label: "Personalizado", sub: "Cada pedido" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center bg-pink-50 rounded-2xl p-4 border border-pink-100"
                  >
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.label}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All products */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Todos los{" "}
              <span className="text-pink-500 italic">Productos</span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-pink-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visible.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {visible.length > 8 && (
            <div className="text-center mt-10">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 border-2 border-pink-400 text-pink-500 hover:bg-pink-50 px-8 py-3.5 rounded-full font-semibold transition-colors"
              >
                Ver catálogo completo ({visible.length} productos)
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
