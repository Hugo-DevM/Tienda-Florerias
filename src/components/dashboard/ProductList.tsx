"use client";

import Image from "next/image";
import { Product, CATEGORY_LABELS } from "@/types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleVisible: (product: Product) => void;
  onDelete: (product: Product) => void;
  loading?: string | null; // product id being mutated
}

export default function ProductList({
  products,
  onEdit,
  onToggleVisible,
  onDelete,
  loading,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <span className="text-5xl block mb-3">🌸</span>
        <p className="font-medium">No hay productos aún</p>
        <p className="text-sm mt-1">Crea tu primer producto con el botón de arriba</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 font-semibold text-gray-600">Producto</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Categoría</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600">Precio</th>
            <th className="text-center px-4 py-3 font-semibold text-gray-600">Estado</th>
            <th className="text-center px-4 py-3 font-semibold text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => {
            const isMutating = loading === product.id;
            return (
              <tr
                key={product.id}
                className={`bg-white hover:bg-pink-50/30 transition-colors ${
                  !product.visible ? "opacity-50" : ""
                }`}
              >
                {/* Product */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🌸</div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                        {product.featured && (
                          <span className="ml-1.5 text-yellow-500 text-xs">★</span>
                        )}
                      </p>
                      {product.badge && (
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-gray-500 text-xs font-medium">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-right">
                  <span className="font-bold text-gray-800">
                    ${product.price.toLocaleString("es-MX")}
                  </span>
                </td>

                {/* Visible toggle */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleVisible(product)}
                    disabled={isMutating}
                    title={product.visible ? "Visible — clic para ocultar" : "Oculto — clic para mostrar"}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                      product.visible
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {product.visible ? "👁️ Visible" : "🚫 Oculto"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => onEdit(product)}
                      disabled={isMutating}
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      title="Editar"
                    >
                      <EditSvg />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      disabled={isMutating}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      {isMutating ? (
                        <span className="animate-spin text-sm">⏳</span>
                      ) : (
                        <TrashSvg />
                      )}
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
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function TrashSvg() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
