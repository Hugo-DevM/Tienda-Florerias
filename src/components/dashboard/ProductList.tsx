"use client";

import Image from "next/image";
import { Product, CATEGORY_LABELS } from "@/types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleVisible: (product: Product) => void;
  onDelete: (product: Product) => void;
  loading?: string | null;
}

export default function ProductList({ products, onEdit, onToggleVisible, onDelete, loading }: Props) {
  if (products.length === 0) {
    return (
      <div
        className="bg-white py-20 text-center"
        style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
      >
        <div className="w-8 h-px mx-auto mb-6" style={{ background: "#E7E5E4" }} />
        <p
          className="font-display font-light text-stone-500 text-xl mb-1"
          style={{ letterSpacing: "-0.01em" }}
        >
          Sin productos
        </p>
        <p
          className="text-sm"
          style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
        >
          Crea tu primer producto con el botón de arriba
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto bg-white"
      style={{ boxShadow: "0 1px 4px -1px rgba(0,0,0,0.06)" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid #E7E5E4" }}>
            {["Producto", "Categoría", "Precio", "Estado", "Acciones"].map((h, i) => (
              <th
                key={h}
                className={`px-4 py-3 font-medium text-xs uppercase tracking-wider ${
                  i === 0 ? "text-left" : i === 2 ? "text-right" : "text-center"
                } ${i === 1 ? "hidden sm:table-cell" : ""}`}
                style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", background: "#FAF9F7" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            const isMutating = loading === product.id;
            return (
              <tr
                key={product.id}
                style={{
                  borderBottom: idx < products.length - 1 ? "1px solid #F5F3F1" : "none",
                  opacity: !product.visible ? 0.45 : 1,
                  transition: "background 150ms var(--ease-out)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAF9F7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
              >
                {/* Product */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative flex-shrink-0 overflow-hidden bg-stone-100"
                      style={{ width: 44, height: 44 }}
                    >
                      {product.image ? (
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="44px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4 4 0 014 4M12 6.5a4 4 0 00-4 4M12 6.5V3M8 10.5a4 4 0 004 4M8 10.5H4.5M16 10.5a4 4 0 01-4 4M16 10.5H19.5M12 14.5v3.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p
                        className="font-medium text-stone-800 line-clamp-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {product.name}
                        {product.featured && (
                          <span className="ml-1.5 text-xs" style={{ color: "#7C2D3C" }}>★</span>
                        )}
                      </p>
                      {product.badge && (
                        <span
                          className="text-xs font-medium px-1.5 py-0.5"
                          style={{ background: "#FBF5F6", color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 hidden sm:table-cell text-center">
                  <span
                    className="text-xs"
                    style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}
                  >
                    {CATEGORY_LABELS[product.category]}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-right">
                  <span
                    className="font-display font-medium text-stone-800"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    ${product.price.toLocaleString("es-MX")}
                  </span>
                </td>

                {/* Visible toggle */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleVisible(product)}
                    disabled={isMutating}
                    title={product.visible ? "Visible — clic para ocultar" : "Oculto — clic para mostrar"}
                    className="btn-press inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: product.visible ? "#EBF4EF" : "#F5F3F1",
                      borderColor: product.visible ? "#BBD9C5" : "#E7E5E4",
                      color: product.visible ? "#2D6A4F" : "#78716C",
                      transition: "opacity 150ms var(--ease-out)",
                    }}
                  >
                    {product.visible ? "Visible" : "Oculto"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      disabled={isMutating}
                      className="btn-press p-2 text-stone-400 hover:text-stone-700"
                      style={{ transition: "color 150ms var(--ease-out)" }}
                      title="Editar"
                    >
                      <EditSvg />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      disabled={isMutating}
                      className="btn-press p-2 text-stone-300 hover:text-red-500"
                      style={{ transition: "color 150ms var(--ease-out)" }}
                      title="Eliminar"
                    >
                      {isMutating ? <Spinner /> : <TrashSvg />}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EditSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-stone-400" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
