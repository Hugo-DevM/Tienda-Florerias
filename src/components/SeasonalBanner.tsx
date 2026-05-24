"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Product } from "@/types";

const EVENTS = [
  { month: 2,  day: 14, name: "San Valentín",        desc: "Flores para quien más quieres",            color: "#7C2D3C" },
  { month: 3,  day: 8,  name: "Día de la Mujer",      desc: "Celebra a las mujeres especiales en tu vida", color: "#7C2D3C" },
  { month: 5,  day: 10, name: "Día de las Madres",    desc: "El regalo más especial para mamá",         color: "#7C2D3C" },
  { month: 6,  day: 21, name: "Día del Padre",        desc: "Sorprende a papá con flores",              color: "#7C2D3C" },
  { month: 11, day: 2,  name: "Día de Muertos",       desc: "Cempasúchil y arreglos tradicionales",     color: "#7C2D3C" },
  { month: 12, day: 24, name: "Navidad",              desc: "Arreglos navideños para tu hogar",         color: "#7C2D3C" },
];

function getNextEvent() {
  const now = new Date();
  const year = now.getFullYear();

  const candidates = EVENTS.flatMap((e) => [
    new Date(year, e.month - 1, e.day),
    new Date(year + 1, e.month - 1, e.day),
  ]).filter((d) => d > now).sort((a, b) => a.getTime() - b.getTime());

  const next = candidates[0];
  if (!next) return null;

  const event = EVENTS.find(
    (e) => e.month === next.getMonth() + 1 && e.day === next.getDate()
  )!;

  const diffMs = next.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return { ...event, date: next, days };
}

interface Props {
  temporadaProducts: Product[];
}

export default function SeasonalBanner({ temporadaProducts }: Props) {
  const event = useMemo(() => getNextEvent(), []);

  if (!event) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Banner */}
        <div
          className="relative overflow-hidden mb-14"
          style={{ background: "#1A1614" }}
        >
          {/* Decorative line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "rgba(124,45,60,0.6)" }}
          />

          <div className="px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.2em] block mb-4"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
              >
                Próxima fecha especial
              </span>
              <h2
                className="font-display font-light text-white leading-tight mb-2"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
              >
                {event.name}
              </h2>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }}
              >
                {event.desc}
              </p>
            </div>

            <div className="flex items-end gap-8 shrink-0">
              {/* Countdown */}
              <div className="text-right">
                <p
                  className="font-display font-light text-white leading-none"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.04em" }}
                >
                  {event.days}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}
                >
                  {event.days === 1 ? "DÍA" : "DÍAS"}
                </p>
              </div>

              <Link
                href="/tienda?cat=temporada"
                className="btn-press px-6 py-3 text-sm font-medium whitespace-nowrap"
                style={{
                  background: "#7C2D3C",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  transition: "opacity 150ms var(--ease-out)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Ver colección →
              </Link>
            </div>
          </div>
        </div>

        {/* Temporada products */}
        {temporadaProducts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <p
                className="text-sm font-medium text-stone-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {temporadaProducts.length} producto{temporadaProducts.length !== 1 ? "s" : ""} de temporada
              </p>
              <Link
                href="/tienda?cat=temporada"
                className="text-sm font-medium flex items-center gap-1.5"
                style={{
                  color: "#A8A29E",
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 150ms var(--ease-out)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7C2D3C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A8A29E")}
              >
                Ver todos <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {temporadaProducts.slice(0, 4).map((product) => {
                // Inline mini card to avoid circular imports
                return (
                  <div
                    key={product.id}
                    className="bg-white overflow-hidden"
                    style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
                  >
                    <div className="aspect-square relative overflow-hidden bg-stone-100">
                      {product.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ transition: "transform 400ms var(--ease-out)" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p
                        className="text-sm font-medium text-stone-800 line-clamp-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {product.name}
                      </p>
                      <p
                        className="text-sm mt-0.5 font-display font-medium"
                        style={{ color: "#7C2D3C", letterSpacing: "-0.01em" }}
                      >
                        ${product.price.toLocaleString("es-MX")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
