"use client";

import Link from "next/link";

export default function Hero() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  return (
    <section className="relative bg-cream min-h-[92vh] flex items-center overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-20 items-center">

          {/* Left: Editorial text block */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-px bg-brand" />
              <span
                className="text-brand text-xs font-medium tracking-[0.18em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Arreglos florales artesanales
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-light leading-[0.9] mb-6 text-stone-900"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Flores que{" "}
              <em
                className="not-italic text-brand"
                style={{ fontStyle: "italic" }}
              >
                hablan
              </em>
              <br />
              por ti.
            </h1>

            {/* Subheading */}
            <p
              className="text-stone-500 leading-relaxed mb-10 max-w-[44ch]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.0625rem",
              }}
            >
              Arreglos florales frescos diseñados con cuidado para cada ocasión
              especial. Entrega a domicilio en toda la ciudad.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link
                href="/tienda"
                className="btn-press inline-flex items-center gap-2.5 bg-brand text-white px-7 py-3.5 text-sm font-medium tracking-wide shadow-[0_2px_16px_-4px_rgba(124,45,60,0.45)] hover:bg-brand-muted"
                style={{
                  transition: "background-color 200ms var(--ease-out), box-shadow 200ms var(--ease-out)",
                }}
              >
                Ver catálogo
                <ArrowRight />
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2.5 border border-stone-300 text-stone-700 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-brand hover:text-brand"
                style={{
                  transition: "border-color 200ms var(--ease-out), color 200ms var(--ease-out)",
                }}
              >
                <WhatsAppIcon />
                Contáctanos
              </a>
            </div>

            {/* Stats — editorial row */}
            <div className="flex items-center gap-10">
              {[
                { value: "200+", label: "Productos" },
                { value: "500+", label: "Clientes felices" },
                { value: "5.0", label: "Calificación" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-10">
                  {i > 0 && <div className="w-px h-7 bg-stone-200" />}
                  <div>
                    <p
                      className="font-display text-2xl font-semibold text-stone-900 leading-none"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-stone-400 text-xs mt-1 tracking-wide"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 w-full lg:w-[520px]">
            <div className="relative">
              {/* Main image — editorial frame */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "3/4", maxHeight: "70vh" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1738951171612-b1d02b4bbaed?q=80&w=735&auto=format&fit=crop"
                  alt="Arreglos florales artesanales"
                  className="w-full h-full object-cover"
                  style={{
                    transition: "transform 600ms var(--ease-out)",
                  }}
                />
              </div>

              {/* Minimal label badge — top-left, outside frame */}
              <div
                className="absolute -top-4 -left-4 bg-white border border-stone-100 shadow-sm px-4 py-2"
                style={{ boxShadow: "0 2px 12px -4px rgba(0,0,0,0.08)" }}
              >
                <p
                  className="text-brand text-xs font-medium tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Flores frescas · diario
                </p>
              </div>

              {/* Entrega badge — bottom right */}
              <div
                className="absolute -bottom-4 -right-4 bg-brand text-white px-5 py-3"
                style={{ boxShadow: "0 4px 24px -8px rgba(124,45,60,0.4)" }}
              >
                <p className="text-xs font-medium tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Entrega
                </p>
                <p className="font-display text-lg font-light italic leading-tight">
                  a domicilio
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue — subtle, no bounce */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
        style={{ color: "oklch(70% 0.02 70)" }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Descubre
        </span>
        <ChevronDown />
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
