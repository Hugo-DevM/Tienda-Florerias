"use client";

import { useState } from "react";

const OCASIONES = [
  { value: "boda", label: "💍 Boda" },
  { value: "xv_anos", label: "👑 XV Años" },
  { value: "cumpleanos", label: "🎂 Cumpleaños" },
  { value: "aniversario", label: "❤️ Aniversario" },
  { value: "corporativo", label: "🏢 Evento Corporativo" },
  { value: "funeral", label: "🕊️ Funeral / Condolencias" },
  { value: "otro", label: "🌸 Otro" },
];

const PRESUPUESTOS = [
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000-3000", label: "$1,000 – $3,000" },
  { value: "3000-5000", label: "$3,000 – $5,000" },
  { value: "5000+", label: "$5,000 o más" },
  { value: "a_definir", label: "A definir" },
];

export default function ContactoPage() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    ocasion: "",
    fecha: "",
    presupuesto: "",
    detalles: "",
  });
  const [sent, setSent] = useState(false);

  const set = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const isValid =
    form.nombre.trim() &&
    form.ocasion &&
    form.fecha &&
    form.detalles.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const ocasionLabel =
      OCASIONES.find((o) => o.value === form.ocasion)?.label ?? form.ocasion;
    const presupuestoLabel =
      PRESUPUESTOS.find((p) => p.value === form.presupuesto)?.label ?? "No especificado";

    const lines = [
      "🌸 *Solicitud de Pedido Especializado*",
      "",
      `👤 *Nombre:* ${form.nombre}`,
      form.telefono ? `📞 *Teléfono:* ${form.telefono}` : null,
      `🎉 *Ocasión:* ${ocasionLabel}`,
      `📅 *Fecha requerida:* ${form.fecha}`,
      `💰 *Presupuesto aproximado:* ${presupuestoLabel}`,
      "",
      `📝 *Detalles del arreglo:*`,
      form.detalles,
      "",
      "¿Pueden ayudarme con este pedido? Gracias 😊",
    ].filter((l) => l !== null);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="text-7xl block mb-6">💐</span>
          <h2
            className="text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¡Mensaje enviado!
          </h2>
          <p className="text-gray-500 mb-8">
            Te redirigimos a WhatsApp con los detalles de tu pedido. Nos pondremos en contacto contigo pronto.
          </p>
          <button
            onClick={() => setSent(false)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/60 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
            Pedidos especiales
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crea tu arreglo{" "}
            <span className="text-pink-500 italic">personalizado</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            ¿Tienes una ocasión especial? Cuéntanos los detalles y te ayudamos a crear el arreglo perfecto.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Info lateral */}
          <div className="space-y-5">
            {[
              {
                icon: "💬",
                title: "Respuesta rápida",
                desc: "Te contestamos por WhatsApp en menos de 24 horas.",
              },
              {
                icon: "🎨",
                title: "100% personalizado",
                desc: "Diseñamos el arreglo según tus colores, flores y presupuesto.",
              },
              {
                icon: "🚚",
                title: "Entrega a domicilio",
                desc: "Llevamos tu pedido a donde lo necesites.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5"
          >
            {/* Nombre + Teléfono */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej: María García"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  WhatsApp / Teléfono{" "}
                  <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)}
                  placeholder="Ej: 3221234567"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
                />
              </div>
            </div>

            {/* Ocasión */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de ocasión *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {OCASIONES.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => set("ocasion", o.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                      form.ocasion === o.value
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-pink-300"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fecha + Presupuesto */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Fecha requerida *
                </label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => set("fecha", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Presupuesto aproximado
                </label>
                <select
                  value={form.presupuesto}
                  onChange={(e) => set("presupuesto", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all bg-white"
                >
                  <option value="">Selecciona un rango</option>
                  {PRESUPUESTOS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Detalles */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Describe tu arreglo ideal *
              </label>
              <textarea
                value={form.detalles}
                onChange={(e) => set("detalles", e.target.value)}
                placeholder="Ej: Quiero un ramo de rosas rojas y blancas con listón dorado para una boda de 50 personas. Los colores del evento son blanco y dorado..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-100"
            >
              <WhatsAppSvg />
              Enviar solicitud por WhatsApp
            </button>

            <p className="text-center text-xs text-gray-400">
              Al enviar, serás redirigido a WhatsApp con los detalles de tu pedido.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function WhatsAppSvg() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
