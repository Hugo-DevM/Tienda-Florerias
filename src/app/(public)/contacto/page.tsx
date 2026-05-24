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
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#FAF9F7" }}>
        <div className="text-center max-w-md">
          <div className="w-12 h-px mx-auto mb-10" style={{ background: "#7C2D3C" }} />
          <h2
            className="font-display font-light text-stone-900 mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", letterSpacing: "-0.02em" }}
          >
            Solicitud enviada
          </h2>
          <p
            className="mb-8 leading-relaxed"
            style={{ color: "#78716C", fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
          >
            Te redirigimos a WhatsApp con los detalles de tu pedido. Nos pondremos en contacto contigo pronto.
          </p>
          <button
            onClick={() => setSent(false)}
            className="btn-press inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
            style={{
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
            }}
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F7" }}>
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
            style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
          >
            Pedidos especiales
          </span>
          <h1
            className="font-display font-light text-stone-900 leading-tight"
            style={{ fontSize: "clamp(1.875rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Crea tu arreglo <em style={{ fontStyle: "italic" }}>personalizado</em>
          </h1>
          <p
            className="mt-3 max-w-xl mx-auto"
            style={{ color: "#78716C", fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
          >
            ¿Tienes una ocasión especial? Cuéntanos los detalles y te ayudamos a crear el arreglo perfecto.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Info lateral */}
          <div className="space-y-4">
            {[
              { title: "Respuesta rápida", desc: "Te contestamos por WhatsApp en menos de 24 horas." },
              { title: "100% personalizado", desc: "Diseñamos el arreglo según tus colores, flores y presupuesto." },
              { title: "Entrega a domicilio", desc: "Llevamos tu pedido a donde lo necesites." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-5 border border-stone-100"
                style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
              >
                <div className="w-6 h-px mb-3" style={{ background: "#7C2D3C" }} />
                <p
                  className="font-medium text-stone-800 text-sm mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white border border-stone-100 p-6 sm:p-8 space-y-5"
            style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
          >
            {/* Nombre + Teléfono */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Tu nombre *">
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej: María García"
                  className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                  required
                />
              </FormField>
              <FormField label="WhatsApp / Teléfono" sub="(opcional)">
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)}
                  placeholder="Ej: 3221234567"
                  className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                />
              </FormField>
            </div>

            {/* Ocasión */}
            <FormField label="Tipo de ocasión *">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {OCASIONES.map((o) => {
                  const isActive = form.ocasion === o.value;
                  const label = o.label.replace(/^[^\s]+\s/, ""); // strip emoji
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => set("ocasion", o.value)}
                      className="btn-press px-3 py-2 text-xs font-medium border text-left"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: isActive ? "#7C2D3C" : "white",
                        borderColor: isActive ? "#7C2D3C" : "#E7E5E4",
                        color: isActive ? "white" : "#57534E",
                        transition: "background 150ms var(--ease-out), border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </FormField>

            {/* Fecha + Presupuesto */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Fecha requerida *">
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => set("fecha", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full min-w-0 border border-stone-200 px-4 py-2.5 text-sm text-stone-900 bg-white focus:outline-none [color-scheme:light]"
                  style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                  required
                />
              </FormField>
              <FormField label="Presupuesto aproximado">
                <select
                  value={form.presupuesto}
                  onChange={(e) => set("presupuesto", e.target.value)}
                  className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                >
                  <option value="">Selecciona un rango</option>
                  {PRESUPUESTOS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Detalles */}
            <FormField label="Describe tu arreglo ideal *">
              <textarea
                value={form.detalles}
                onChange={(e) => set("detalles", e.target.value)}
                placeholder="Ej: Quiero un ramo de rosas rojas y blancas con listón dorado para una boda de 50 personas..."
                rows={4}
                className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none resize-none"
                style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                required
              />
            </FormField>

            <button
              type="submit"
              disabled={!isValid}
              className="btn-press w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: isValid ? "#25D366" : "#E7E5E4",
                color: isValid ? "white" : "#A8A29E",
                cursor: isValid ? "pointer" : "not-allowed",
                transition: "background 200ms var(--ease-out), color 200ms var(--ease-out)",
              }}
            >
              <WhatsAppSvg />
              Enviar solicitud por WhatsApp
            </button>

            <p
              className="text-center text-xs"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              Al enviar, serás redirigido a WhatsApp con los detalles de tu pedido.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
        style={{ color: "#57534E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em" }}
      >
        {label}{" "}
        {sub && <span style={{ color: "#A8A29E", textTransform: "none", letterSpacing: "normal" }}>{sub}</span>}
      </label>
      {children}
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
