"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } =
    useCart();

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  const buildWhatsAppMessage = () => {
    if (items.length === 0) return "";
    const lines = [
      "*Hola, quiero hacer un pedido:*",
      "",
      ...items.map(
        (i) =>
          `• ${i.product.name} x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString("es-MX")}`
      ),
      "",
      `*Total: $${total.toLocaleString("es-MX")}*`,
      "",
      "¿Pueden confirmar disponibilidad y forma de pago? Gracias.",
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const handleCheckout = async () => {
    const message = buildWhatsAppMessage();
    if (!message) return;

    // Log order in background (fire-and-forget, don't block UX)
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        total,
      }),
    }).catch(() => {}); // silent — non-critical

    window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
    clearCart();
    closeCart();
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background: "rgba(26,22,20,0.5)",
            backdropFilter: "blur(4px)",
            animation: "fadeUp 200ms var(--ease-out) both",
          }}
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[380px] z-50 flex flex-col"
        style={{
          background: "#FAF9F7",
          boxShadow: "-8px 0 40px -8px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms var(--ease-out)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid #E7E5E4" }}
        >
          <div className="flex items-center gap-3">
            <h2
              className="font-display font-light text-stone-900"
              style={{ fontSize: "1.375rem", letterSpacing: "-0.02em" }}
            >
              Carrito
            </h2>
            {itemCount > 0 && (
              <span
                className="text-xs font-medium px-2 py-0.5"
                style={{
                  background: "#7C2D3C",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="btn-press p-2 text-stone-400 hover:text-stone-700"
            style={{ transition: "color 150ms var(--ease-out)" }}
            aria-label="Cerrar carrito"
          >
            <XSvg />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-px mb-8" style={{ background: "#E7E5E4" }} />
              <p
                className="font-display font-light text-stone-500 text-xl mb-1"
                style={{ letterSpacing: "-0.01em" }}
              >
                Tu carrito está vacío
              </p>
              <p
                className="text-sm mb-8"
                style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
              >
                Agrega flores para comenzar
              </p>
              <button
                onClick={closeCart}
                className="btn-press border border-stone-300 text-stone-700 px-6 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
                }}
              >
                Ver tienda
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-white p-3"
                  style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
                >
                  {/* Image */}
                  <div
                    className="relative flex-shrink-0 overflow-hidden bg-stone-100"
                    style={{ width: 64, height: 64 }}
                  >
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4 4 0 014 4M12 6.5a4 4 0 00-4 4M12 6.5V3M8 10.5a4 4 0 004 4M8 10.5H4.5M16 10.5a4 4 0 01-4 4M16 10.5H19.5M12 14.5v3.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-stone-900 text-sm font-medium line-clamp-1 mb-0.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.product.name}
                    </p>
                    <p
                      className="font-display text-base font-medium"
                      style={{ color: "#7C2D3C", letterSpacing: "-0.01em" }}
                    >
                      ${(item.product.price * item.quantity).toLocaleString("es-MX")}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="btn-press w-6 h-6 border border-stone-200 flex items-center justify-center text-stone-500 hover:border-brand hover:text-brand text-sm"
                        style={{ transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)", fontFamily: "'Inter', sans-serif" }}
                      >
                        −
                      </button>
                      <span
                        className="text-sm font-medium text-stone-700 w-4 text-center"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="btn-press w-6 h-6 border border-stone-200 flex items-center justify-center text-stone-500 hover:border-brand hover:text-brand text-sm"
                        style={{ transition: "border-color 150ms var(--ease-out), color 150ms var(--ease-out)", fontFamily: "'Inter', sans-serif" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="btn-press self-start p-1 text-stone-300 hover:text-stone-500"
                    style={{ transition: "color 150ms var(--ease-out)" }}
                    aria-label="Eliminar"
                  >
                    <TrashSvg />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 space-y-4"
            style={{ borderTop: "1px solid #E7E5E4", background: "white" }}
          >
            {/* Total */}
            <div className="flex items-baseline justify-between">
              <span
                className="text-sm text-stone-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Total
              </span>
              <span
                className="font-display font-medium text-stone-900"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
              >
                ${total.toLocaleString("es-MX")}
              </span>
            </div>

            <p
              className="text-xs"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              Envío a calcular al confirmar por WhatsApp
            </p>

            {/* WhatsApp CTA */}
            <button
              onClick={handleCheckout}
              className="btn-press w-full py-3.5 flex items-center justify-center gap-2.5 text-sm font-medium"
              style={{
                background: "#25D366",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                transition: "opacity 150ms var(--ease-out)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <WhatsAppSvg />
              Pedir por WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-center"
              style={{
                color: "#A8A29E",
                fontFamily: "'Inter', sans-serif",
                transition: "color 150ms var(--ease-out)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#57534E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A8A29E")}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function XSvg() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function TrashSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function WhatsAppSvg() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
