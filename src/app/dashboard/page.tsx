"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/dashboard/ProductForm";
import ProductList from "@/components/dashboard/ProductList";
import OrderList from "@/components/dashboard/OrderList";
import { Product, Order, OrderStatus, CATEGORY_LABELS } from "@/types";

type View = "list" | "add" | "edit";
type Tab = "products" | "orders";

export default function DashboardPage() {
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [filterCat, setFilterCat] = useState<string>("todos");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleteOrderTarget, setDeleteOrderTarget] = useState<Order | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("floreria_auth") !== "1") {
        router.replace("/dashboard/login");
      }
    }
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      showToast("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch {
      showToast("Error al cargar pedidos");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Products ──────────────────────────────────────────────────────────────

  const handleCreate = async (data: Partial<Product>) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear producto");
    await fetchProducts();
    setView("list");
    showToast("Producto creado exitosamente");
  };

  const handleUpdate = async (data: Partial<Product>) => {
    if (!editTarget) return;
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editTarget, ...data }),
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    await fetchProducts();
    setView("list");
    setEditTarget(null);
    showToast("Producto actualizado");
  };

  const handleToggleVisible = async (product: Product) => {
    setMutating(product.id);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, visible: !product.visible }),
      });
      if (!res.ok) throw new Error();
      setProducts((prev) =>
        prev.map((p) => p.id === product.id ? { ...p, visible: !p.visible } : p)
      );
      showToast(product.visible ? "Producto ocultado" : "Producto visible");
    } catch {
      showToast("Error al actualizar visibilidad");
    } finally {
      setMutating(null);
    }
  };

  const handleDelete = (product: Product) => setDeleteTarget(product);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const product = deleteTarget;
    setDeleteTarget(null);
    setMutating(product.id);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });
      if (!res.ok) throw new Error();
      await fetchProducts();
      showToast("Producto eliminado");
    } catch {
      showToast("Error al eliminar producto");
    } finally {
      setMutating(null);
    }
  };

  // ── Orders ────────────────────────────────────────────────────────────────

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
    setMutating(order.id);
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, status }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status } : o));
      showToast("Estado actualizado");
    } catch {
      showToast("Error al actualizar estado");
    } finally {
      setMutating(null);
    }
  };

  const handleDeleteOrder = (order: Order) => setDeleteOrderTarget(order);

  const confirmDeleteOrder = async () => {
    if (!deleteOrderTarget) return;
    const order = deleteOrderTarget;
    setDeleteOrderTarget(null);
    setMutating(order.id);
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      showToast("Pedido eliminado");
    } catch {
      showToast("Error al eliminar pedido");
    } finally {
      setMutating(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("floreria_auth");
    router.replace("/dashboard/login");
  };

  const filteredProducts =
    filterCat === "todos" ? products : products.filter((p) => p.category === filterCat);

  const stats = {
    total: products.length,
    visible: products.filter((p) => p.visible).length,
    hidden: products.filter((p) => !p.visible).length,
    featured: products.filter((p) => p.featured).length,
  };

  const orderStats = {
    pending: orders.filter((o) => o.status === "pending").length,
    active: orders.filter((o) => ["confirmed", "in_delivery"].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    total: orders.reduce((s, o) => s + (o.status !== "cancelled" ? o.total : 0), 0),
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F3F1" }}>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 px-5 py-3 text-sm font-medium"
          style={{
            background: "#1A1614",
            color: "#FAF9F7",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 4px 20px -4px rgba(0,0,0,0.3)",
            animation: "fadeUp 200ms var(--ease-out) both",
          }}
        >
          {toast}
        </div>
      )}

      {/* Delete product modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,22,20,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white w-full max-w-sm p-7" style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.2)", animation: "fadeUp 200ms var(--ease-out) both" }}>
            <div className="w-8 h-px mb-6" style={{ background: "#DC2626" }} />
            <h3 className="font-display font-light text-stone-900 text-xl mb-2" style={{ letterSpacing: "-0.01em" }}>
              ¿Eliminar producto?
            </h3>
            <p className="text-sm mb-1" style={{ color: "#57534E", fontFamily: "'Inter', sans-serif" }}>
              &ldquo;{deleteTarget.name}&rdquo;
            </p>
            <p className="text-xs mb-7" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}>
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-press flex-1 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Cancelar
              </button>
              <button onClick={confirmDelete} className="btn-press flex-1 py-2.5 text-white text-sm font-medium" style={{ background: "#DC2626", fontFamily: "'Inter', sans-serif" }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete order modal */}
      {deleteOrderTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,22,20,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white w-full max-w-sm p-7" style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.2)", animation: "fadeUp 200ms var(--ease-out) both" }}>
            <div className="w-8 h-px mb-6" style={{ background: "#DC2626" }} />
            <h3 className="font-display font-light text-stone-900 text-xl mb-2" style={{ letterSpacing: "-0.01em" }}>
              ¿Eliminar registro?
            </h3>
            <p className="text-xs mb-7" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}>
              Se eliminará el registro de este pedido. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteOrderTarget(null)} className="btn-press flex-1 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Cancelar
              </button>
              <button onClick={confirmDeleteOrder} className="btn-press flex-1 py-2.5 text-white text-sm font-medium" style={{ background: "#DC2626", fontFamily: "'Inter', sans-serif" }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product form modal */}
      {(view === "add" || view === "edit") && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: "rgba(26,22,20,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.2)", animation: "fadeUp 220ms var(--ease-out) both" }}>
            <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: "1px solid #E7E5E4" }}>
              <h2 className="font-display font-light text-stone-900" style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                {view === "add" ? "Nuevo producto" : "Editar producto"}
              </h2>
              <button onClick={() => { setView("list"); setEditTarget(null); }} className="btn-press p-1.5 text-stone-400 hover:text-stone-700" style={{ transition: "color 150ms var(--ease-out)" }}>
                <XSvg />
              </button>
            </div>
            <div className="px-7 py-6">
              <ProductForm
                initial={editTarget ?? {}}
                onSave={view === "add" ? handleCreate : handleUpdate}
                onCancel={() => { setView("list"); setEditTarget(null); }}
                isEditing={view === "edit"}
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white sticky top-0 z-30" style={{ borderBottom: "1px solid #E7E5E4" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <span className="font-display font-medium text-stone-900" style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
              Flo<span style={{ color: "#7C2D3C" }}>ría</span>
              <span className="ml-2 text-xs font-sans font-normal uppercase tracking-widest" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.12em" }}>
                Admin
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-brand" style={{ fontFamily: "'Inter', sans-serif", transition: "color 150ms var(--ease-out)" }}>
              Ver tienda <span>→</span>
            </a>
            <button onClick={handleLogout} className="btn-press text-xs font-medium text-stone-400 hover:text-stone-700 px-3 py-1.5 border border-stone-200 hover:border-stone-400" style={{ fontFamily: "'Inter', sans-serif", transition: "color 150ms var(--ease-out), border-color 150ms var(--ease-out)" }}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-stone-200">
          {([["products", "Productos"], ["orders", "Pedidos"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="btn-press px-5 py-2.5 text-sm font-medium relative"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: tab === key ? "#7C2D3C" : "#78716C",
                transition: "color 150ms var(--ease-out)",
              }}
            >
              {label}
              {key === "orders" && orders.filter((o) => o.status === "pending").length > 0 && (
                <span
                  className="ml-1.5 text-xs px-1.5 py-0.5"
                  style={{ background: "#7C2D3C", color: "white", fontFamily: "'Inter', sans-serif" }}
                >
                  {orders.filter((o) => o.status === "pending").length}
                </span>
              )}
              {tab === key && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-brand" />
              )}
            </button>
          ))}
        </div>

        {/* ── Products tab ── */}
        {tab === "products" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Total", value: stats.total },
                { label: "Visibles", value: stats.visible },
                { label: "Ocultos", value: stats.hidden },
                { label: "Destacados", value: stats.featured },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-5" style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}>
                  <p className="font-display font-light text-stone-900" style={{ fontSize: "2rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5">
              <div className="flex flex-wrap gap-1.5">
                {["todos", "siempre_disponible", "temporada", "sobre_pedido"].map((cat) => {
                  const label = cat === "todos" ? "Todos" : CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS];
                  const isActive = filterCat === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCat(cat)}
                      className="btn-press px-3.5 py-1.5 text-xs font-medium border"
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
              <button
                onClick={() => setView("add")}
                className="btn-press flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap"
                style={{ background: "#7C2D3C", fontFamily: "'Inter', sans-serif", transition: "opacity 150ms var(--ease-out)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <PlusSvg />
                Agregar producto
              </button>
            </div>

            {loading ? (
              <div className="bg-white p-14 text-center" style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}>
                <div className="w-8 h-px mx-auto mb-6" style={{ background: "#E7E5E4" }} />
                <p className="text-sm animate-pulse" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}>
                  Cargando productos...
                </p>
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onEdit={(p) => { setEditTarget(p); setView("edit"); }}
                onToggleVisible={handleToggleVisible}
                onDelete={handleDelete}
                loading={mutating}
              />
            )}
          </>
        )}

        {/* ── Orders tab ── */}
        {tab === "orders" && (
          <>
            {/* Order stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Pendientes", value: orderStats.pending, accent: true },
                { label: "En curso", value: orderStats.active },
                { label: "Entregados", value: orderStats.delivered },
                { label: "Ingresos totales", value: `$${orderStats.total.toLocaleString("es-MX")}`, small: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-5" style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}>
                  <p
                    className="font-display font-light leading-none"
                    style={{
                      fontSize: stat.small ? "1.375rem" : "2rem",
                      letterSpacing: "-0.03em",
                      color: stat.accent && Number(stat.value) > 0 ? "#7C2D3C" : "#1C1917",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <OrderList
              orders={orders}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteOrder}
              loading={mutating}
            />
          </>
        )}
      </div>
    </div>
  );
}

function XSvg() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PlusSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
