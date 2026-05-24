"use client";

import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/types";

interface Props {
  orders: Order[];
  onStatusChange: (order: Order, status: OrderStatus) => void;
  onDelete: (order: Order) => void;
  loading?: string | null;
}

const STATUSES: OrderStatus[] = ["pending", "confirmed", "in_delivery", "delivered", "cancelled"];

export default function OrderList({ orders, onStatusChange, onDelete, loading }: Props) {
  if (orders.length === 0) {
    return (
      <div className="bg-white py-20 text-center" style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}>
        <div className="w-8 h-px mx-auto mb-6" style={{ background: "#E7E5E4" }} />
        <p className="font-display font-light text-stone-500 text-xl mb-1" style={{ letterSpacing: "-0.01em" }}>
          Sin pedidos aún
        </p>
        <p className="text-sm" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}>
          Los pedidos aparecerán aquí cuando los clientes compren por WhatsApp
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const isMutating = loading === order.id;
        const statusStyle = ORDER_STATUS_COLORS[order.status];
        const date = new Date(order.createdAt);
        const dateStr = date.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
        const timeStr = date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

        return (
          <div
            key={order.id}
            className="bg-white p-5"
            style={{
              boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)",
              opacity: isMutating ? 0.6 : 1,
              transition: "opacity 150ms var(--ease-out)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

              {/* Left: items */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-medium px-2 py-0.5 border"
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      borderColor: statusStyle.border,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                  >
                    {dateStr} · {timeStr}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className="text-sm text-stone-700"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.productName}
                      </span>
                      <span className="text-stone-300">×</span>
                      <span
                        className="text-sm text-stone-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.quantity}
                      </span>
                      <span
                        className="ml-auto text-sm"
                        style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}
                      >
                        ${(item.price * item.quantity).toLocaleString("es-MX")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid #F5F3F1" }}>
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-display font-medium text-stone-900"
                    style={{ letterSpacing: "-0.01em", fontSize: "1.125rem" }}
                  >
                    ${order.total.toLocaleString("es-MX")}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order, e.target.value as OrderStatus)}
                  disabled={isMutating}
                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#1C1917",
                    transition: "border-color 150ms var(--ease-out)",
                    minWidth: 140,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
                  ))}
                </select>

                <button
                  onClick={() => onDelete(order)}
                  disabled={isMutating}
                  className="btn-press text-xs font-medium border border-stone-200 px-3 py-1.5 text-stone-400 hover:text-red-500 hover:border-red-300"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    transition: "color 150ms var(--ease-out), border-color 150ms var(--ease-out)",
                  }}
                >
                  Eliminar registro
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
