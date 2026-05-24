"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Cuánto tarda el envío a domicilio?",
    a: "Los pedidos realizados antes de las 14:00 h se entregan el mismo día. Los pedidos posteriores se entregan al día hábil siguiente. El horario de entregas es de 10:00 a 19:00 h de lunes a sábado, y de 10:00 a 15:00 h los domingos.",
  },
  {
    q: "¿Cuáles son las formas de pago disponibles?",
    a: "Aceptamos efectivo al momento de la entrega, transferencia bancaria (SPEI) y pago con tarjeta de crédito o débito. Para pedidos personalizados o eventos grandes, solicitamos un anticipo del 50% para apartar la fecha.",
  },
  {
    q: "¿Con cuánta anticipación debo pedir para una boda o evento?",
    a: "Para bodas, XV años y eventos corporativos recomendamos un mínimo de 7 días de anticipación. Para arreglos especiales o pedidos con flores específicas que no están en temporada, mínimo 3 días. Los arreglos del catálogo pueden pedirse con menos de 24 horas de anticipación.",
  },
  {
    q: "¿Tienen garantía de frescura?",
    a: "Sí. Garantizamos que nuestras flores se mantendrán frescas durante al menos 5 días con el cuidado adecuado. Si por alguna razón las flores no cumplen con esta expectativa, te enviamos un nuevo arreglo sin costo adicional. Solo necesitas enviarnos una foto por WhatsApp.",
  },
  {
    q: "¿El envío tiene costo?",
    a: "El envío es gratuito en pedidos mayores a $800 dentro de nuestra zona de cobertura. Para pedidos menores, el costo de envío es de $80. Para zonas fuera de nuestra cobertura habitual, te cotizamos por WhatsApp.",
  },
  {
    q: "¿Puedo incluir una tarjeta con mensaje?",
    a: "Sí. Al hacer tu pedido por WhatsApp puedes indicarnos el mensaje exacto que quieres en la tarjeta. La tarjeta viene incluida sin costo adicional en todos los arreglos.",
  },
  {
    q: "¿Qué pasa si no hay nadie en casa cuando llegan las flores?",
    a: "Coordinamos la entrega por WhatsApp antes de salir. Si al llegar no hay nadie, el repartidor esperará un momento y te avisará. Podemos reagendar la entrega para más tarde ese mismo día o al día siguiente sin costo.",
  },
  {
    q: "¿Puedo pedir flores que no están en el catálogo?",
    a: "¡Por supuesto! Usamos el formulario de pedidos personalizados para hacer arreglos a medida. Puedes indicar las flores que deseas, colores, estilo y presupuesto. Trabajamos con proveedores locales y podemos conseguir prácticamente cualquier flor.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24" style={{ background: "#FAF9F7" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Left: header */}
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-4"
              style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
            >
              Preguntas frecuentes
            </span>
            <h2
              className="font-display font-light text-stone-900 leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Todo lo que necesitas{" "}
              <em style={{ fontStyle: "italic" }}>saber</em>
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}
            >
              ¿No encuentras lo que buscas? Escríbenos directamente por WhatsApp y te respondemos en minutos.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 divide-y" style={{ borderTop: "1px solid #E7E5E4", borderBottom: "1px solid #E7E5E4" }}>
            {FAQS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span
                    className="text-sm font-medium text-stone-800 leading-snug"
                    style={{ flex: 1 }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5"
                    style={{
                      color: open === i ? "#7C2D3C" : "#A8A29E",
                      transition: "color 150ms var(--ease-out), transform 250ms var(--ease-out)",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <PlusSvg />
                  </span>
                </button>

                {open === i && (
                  <div
                    className="pb-5 pr-8"
                    style={{ animation: "fadeUp 180ms var(--ease-out) both" }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function PlusSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
