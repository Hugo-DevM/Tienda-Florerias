"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import SeasonalBanner from "@/components/SeasonalBanner";
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
  const temporada = visible.filter((p) => p.category === "temporada");

  const categories: Category[] = [
    "siempre_disponible",
    "temporada",
    "sobre_pedido",
  ];

  return (
    <>
      <Hero />

      {/* ── Trust strip ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <LeafSvg />,
                title: "Frescura garantizada",
                sub: "5 días o te hacemos un nuevo arreglo sin costo",
              },
              {
                icon: <TruckSvg />,
                title: "Entrega el mismo día",
                sub: "Pedidos antes de las 14:00 h",
              },
              {
                icon: <ClockSvg />,
                title: "Lun–Sáb 9:00–19:00",
                sub: "Dom 10:00–15:00 · Festivos consultar",
              },
              {
                icon: <WaSvg />,
                title: "Pago al entregar",
                sub: "Efectivo, transferencia o tarjeta",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                  style={{ background: "#FBF5F6", color: "#7C2D3C" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-sm font-medium text-stone-800 mb-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* ── Seasonal banner ─────────────────────────────────────── */}
      <SeasonalBanner temporadaProducts={temporada} />

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

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Custom order CTA ─────────────────────────────────────── */}
      <section style={{ background: "#1A1614" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="w-8 h-px mb-8" style={{ background: "#7C2D3C" }} />
            <h2
              className="font-display font-light text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              ¿Tienes algo{" "}
              <em style={{ fontStyle: "italic" }}>especial en mente?</em>
            </h2>
            <p
              className="leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
            >
              Diseñamos arreglos a medida para bodas, XV años, eventos corporativos y cualquier ocasión que lo merezca.
              Cuéntanos tu visión y la hacemos realidad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="btn-press inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium"
                style={{
                  background: "#7C2D3C",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  transition: "opacity 150ms var(--ease-out)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Solicitar arreglo personalizado
                <span>→</span>
              </Link>
              <Link
                href="/tienda"
                className="btn-press inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                }}
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Delivery & Coverage ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: zones */}
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-4"
                style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
              >
                Cobertura
              </span>
              <h2
                className="font-display font-light text-stone-900 leading-tight mb-8"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                Entregamos en{" "}
                <em style={{ fontStyle: "italic" }}>toda la ciudad</em>
              </h2>

              <div className="grid grid-cols-2 gap-2 mb-8">
                {[
                  "Centro Histórico",
                  "Zapopan",
                  "Tlaquepaque",
                  "Tonalá",
                  "Guadalajara Norte",
                  "Guadalajara Sur",
                  "Providencia",
                  "Chapalita",
                ].map((zone) => (
                  <div
                    key={zone}
                    className="flex items-center gap-2.5 py-2.5 border-b"
                    style={{ borderColor: "#F5F3F1" }}
                  >
                    <span
                      className="w-1 h-1 flex-shrink-0"
                      style={{ background: "#7C2D3C" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "#57534E", fontFamily: "'Inter', sans-serif" }}
                    >
                      {zone}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="text-xs"
                style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
              >
                ¿Tu zona no aparece? Escríbenos por WhatsApp — coordinamos tu entrega.
              </p>
            </div>

            {/* Right: hours + delivery details */}
            <div className="space-y-8">
              {/* Hours */}
              <div
                className="p-7"
                style={{ background: "#FAF9F7" }}
              >
                <div className="w-6 h-px mb-5" style={{ background: "#7C2D3C" }} />
                <p
                  className="text-xs uppercase tracking-wider mb-5"
                  style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}
                >
                  Horarios de atención
                </p>
                <div className="space-y-3">
                  {[
                    { day: "Lunes – Viernes", hours: "9:00 – 19:00" },
                    { day: "Sábado", hours: "9:00 – 19:00" },
                    { day: "Domingo", hours: "10:00 – 15:00" },
                    { day: "Días festivos", hours: "Consultar disponibilidad" },
                  ].map((row) => (
                    <div
                      key={row.day}
                      className="flex items-center justify-between py-2 border-b"
                      style={{ borderColor: "#EEECE9" }}
                    >
                      <span
                        className="text-sm"
                        style={{ color: "#57534E", fontFamily: "'Inter', sans-serif" }}
                      >
                        {row.day}
                      </span>
                      <span
                        className="text-sm font-medium text-stone-800"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery details */}
              <div className="space-y-4">
                {[
                  {
                    title: "Envío gratis en pedidos +$800",
                    sub: "Aplica dentro de zonas de cobertura.",
                  },
                  {
                    title: "Entrega el mismo día",
                    sub: "Pedidos confirmados antes de las 14:00 h.",
                  },
                  {
                    title: "Pedidos anticipados para eventos",
                    sub: "Bodas, XV años y eventos corporativos con 7 días mínimo.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-px self-stretch flex-shrink-0 mt-1"
                      style={{ background: "#E7E5E4" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium text-stone-800 mb-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.sub}
                      </p>
                    </div>
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

function LeafSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4 4 0 014 4M12 6.5a4 4 0 00-4 4M12 6.5V3M8 10.5a4 4 0 004 4M8 10.5H4.5M16 10.5a4 4 0 01-4 4M16 10.5H19.5M12 14.5v3.5" />
    </svg>
  );
}

function TruckSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function ClockSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
  );
}

function WaSvg() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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
