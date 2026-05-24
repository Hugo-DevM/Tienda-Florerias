const TESTIMONIALS = [
  {
    quote: "Pedí un ramo para el aniversario de mis papás y llegó perfecto. Las flores estaban frescas, el listón bien amarrado y el mensaje en tarjeta era precioso. Mis papás quedaron encantados.",
    name: "Ana González",
    occasion: "Aniversario",
    location: "Zapopan",
  },
  {
    quote: "Llevé flores a la oficina de mi jefa por su cumpleaños. Todos preguntaban de dónde las había comprado. El arreglo con girasoles y rosas blancas fue un éxito total.",
    name: "Laura Vásquez",
    occasion: "Cumpleaños",
    location: "Providencia",
  },
  {
    quote: "Mandé un arreglo a mi novia sin decirle nada. Me enviaron foto del momento en que lo recibió. La reacción lo dijo todo. Gracias por hacer que el momento fuera tan especial.",
    name: "Diego Morales",
    occasion: "Sorpresa",
    location: "Tlaquepaque",
  },
  {
    quote: "Contraté la decoración floral para mi boda y superó todas mis expectativas. Las centros de mesa con peonías y eucalipto eran exactamente como los había soñado.",
    name: "Sofía Herrera",
    occasion: "Boda",
    location: "Guadalajara",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: "#FAF9F7" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
            style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
          >
            Reseñas
          </span>
          <h2
            className="font-display font-light text-stone-900 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Lo que dicen{" "}
            <em style={{ fontStyle: "italic" }}>nuestros clientes</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 flex flex-col justify-between"
              style={{
                boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {/* Quote mark */}
              <div>
                <div
                  className="w-6 h-px mb-5"
                  style={{ background: "#7C2D3C" }}
                />
                <p
                  className="text-sm leading-relaxed text-stone-600"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid #F5F3F1" }}>
                <p
                  className="font-medium text-stone-800 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                >
                  {t.occasion} · {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
