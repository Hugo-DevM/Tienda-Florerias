"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/dashboard/ProductForm";
import ProductList from "@/components/dashboard/ProductList";
import { Product, CATEGORY_LABELS } from "@/types";

type View = "list" | "add" | "edit";

export default function DashboardPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [filterCat, setFilterCat] = useState<string>("todos");

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("floreria_auth");
      if (auth !== "1") {
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
    } catch (err) {
      console.error(err);
      showToast("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleCreate = async (data: Partial<Product>) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear producto");
    await fetchProducts();
    setView("list");
    showToast("✅ Producto creado exitosamente");
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
    showToast("✏️ Producto actualizado");
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
        prev.map((p) =>
          p.id === product.id ? { ...p, visible: !p.visible } : p
        )
      );
      showToast(
        product.visible ? "🚫 Producto ocultado" : "👁️ Producto visible"
      );
    } catch {
      showToast("Error al actualizar visibilidad");
    } finally {
      setMutating(null);
    }
  };

  const handleDelete = async (product: Product) => {
    if (
      !confirm(
        `¿Eliminar "${product.name}"?\n\nEsta acción no se puede deshacer.`
      )
    )
      return;

    setMutating(product.id);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });
      if (!res.ok) throw new Error();
      await fetchProducts();
      showToast("🗑️ Producto eliminado");
    } catch {
      showToast("Error al eliminar producto");
    } finally {
      setMutating(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("floreria_auth");
    router.replace("/dashboard/login");
  };

  const filteredProducts =
    filterCat === "todos"
      ? products
      : products.filter((p) => p.category === filterCat);

  const stats = {
    total: products.length,
    visible: products.filter((p) => p.visible).length,
    hidden: products.filter((p) => !p.visible).length,
    featured: products.filter((p) => p.featured).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium animate-slideIn">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <div>
              <h1
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Panel de Administración
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Gestiona tu catálogo de flores
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-pink-500 transition-colors hidden sm:flex items-center gap-1"
            >
              <span>🛍️</span> Ver tienda
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modal overlay for forms */}
        {(view === "add" || view === "edit") && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-slideIn">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {view === "add" ? "✨ Nuevo Producto" : "✏️ Editar Producto"}
                </h2>
                <button
                  onClick={() => {
                    setView("list");
                    setEditTarget(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XSvg />
                </button>
              </div>
              <ProductForm
                initial={editTarget ?? {}}
                onSave={view === "add" ? handleCreate : handleUpdate}
                onCancel={() => {
                  setView("list");
                  setEditTarget(null);
                }}
                isEditing={view === "edit"}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, emoji: "📦", color: "blue" },
            { label: "Visibles", value: stats.visible, emoji: "👁️", color: "green" },
            { label: "Ocultos", value: stats.hidden, emoji: "🚫", color: "gray" },
            { label: "Destacados", value: stats.featured, emoji: "⭐", color: "yellow" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm"
            >
              <span className="text-2xl block mb-1">{stat.emoji}</span>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {["todos", "siempre_disponible", "temporada", "sobre_pedido"].map(
              (cat) => {
                const label =
                  cat === "todos"
                    ? "Todos"
                    : CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS];
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      filterCat === cat
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-pink-300"
                    }`}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={() => setView("add")}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm whitespace-nowrap"
          >
            <PlusSvg />
            Agregar Producto
          </button>
        </div>

        {/* Products list */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
            <span className="text-4xl block mb-3 animate-pulse">🌸</span>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            onEdit={(p) => {
              setEditTarget(p);
              setView("edit");
            }}
            onToggleVisible={handleToggleVisible}
            onDelete={handleDelete}
            loading={mutating}
          />
        )}
      </div>
    </div>
  );
}

function XSvg() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PlusSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  );
}
