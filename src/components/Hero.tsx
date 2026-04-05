"use client";

import Link from "next/link";

export default function Hero() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-[92vh] flex items-center">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100 rounded-full -translate-y-1/3 translate-x-1/3 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-100 rounded-full translate-y-1/3 -translate-x-1/3 opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              🌸 Flores frescas cada día
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Una Diferente{" "}
              <span className="block mt-1">
                Tienda de{" "}
                <span className="text-pink-500 italic">Flores</span>
              </span>
              <span className="text-rose-600">en Línea</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              Arreglos florales frescos diseñados con amor para cada ocasión
              especial. Entrega a domicilio en toda la ciudad.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/tienda"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5"
              >
                Ver Catálogo
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-pink-400 text-pink-500 hover:bg-pink-50 px-8 py-3.5 rounded-full font-semibold transition-all flex items-center gap-2"
              >
                <WhatsAppIcon />
                Contáctanos
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { value: "200+", label: "Productos" },
                { value: "500+", label: "Clientes" },
                { value: "5 ★", label: "Calificación" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-10 bg-gray-200" />}
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[480px] sm:h-[540px]">
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1487530811015-780f7b91b83f?w=540&h=540&fit=crop"
                alt="Hermosos arreglos florales"
                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-2xl"
              />

              {/* Floating card bottom-left */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-3.5 shadow-xl border border-pink-50 flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">Entrega a domicilio</p>
                  <p className="text-xs text-gray-400">En toda la ciudad</p>
                </div>
              </div>

              {/* Floating card top-right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3.5 shadow-xl border border-pink-50 flex items-center gap-3">
                <span className="text-3xl">💐</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">Flores frescas</p>
                  <p className="text-xs text-gray-400">Todos los días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Descubre</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
