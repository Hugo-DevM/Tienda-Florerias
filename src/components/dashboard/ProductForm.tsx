"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Product, Category, CATEGORY_LABELS } from "@/types";

interface Props {
  initial?: Partial<Product>;
  onSave: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const CATEGORIES: Category[] = [
  "siempre_disponible",
  "temporada",
  "sobre_pedido",
];

export default function ProductForm({
  initial = {},
  onSave,
  onCancel,
  isEditing = false,
}: Props) {
  const [form, setForm] = useState({
    name: initial.name ?? "",
    description: initial.description ?? "",
    price: initial.price?.toString() ?? "",
    category: initial.category ?? ("siempre_disponible" as Category),
    badge: initial.badge ?? "",
    featured: initial.featured ?? false,
    image: initial.image ?? "",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(initial.image ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");

      setForm((p) => ({ ...p, image: data.url }));
      setPreview(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al subir imagen";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setError("Nombre, precio y categoría son obligatorios");
      return;
    }
    if (!form.image) {
      setError("Debes subir una imagen del producto");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSave({
        ...form,
        price: Number(form.price),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Imagen del producto *
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-pink-200 hover:border-pink-400 rounded-xl overflow-hidden transition-colors"
        >
          {preview ? (
            <div className="relative h-48 bg-pink-50">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain p-2"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                <span className="bg-white/90 px-3 py-1.5 rounded-full text-sm font-semibold text-gray-700">
                  Cambiar imagen
                </span>
              </div>
            </div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-gray-400 bg-pink-50/40">
              {uploading ? (
                <div className="animate-spin text-3xl">⏳</div>
              ) : (
                <>
                  <span className="text-4xl mb-2">📷</span>
                  <p className="text-sm font-medium">Haz clic para subir imagen</p>
                  <p className="text-xs mt-1">JPG, PNG o WebP</p>
                </>
              )}
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        {uploading && (
          <p className="text-pink-500 text-xs mt-1.5 flex items-center gap-1">
            <span className="animate-spin">⏳</span> Subiendo imagen...
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Nombre del producto *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Ej: Ramo de Rosas Rojas"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Descripción
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Describe el arreglo, flores incluidas, tamaño, etc."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all resize-none"
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Precio (MXN) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Categoría *
          </label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value as Category }))
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Badge */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Etiqueta / Badge{" "}
          <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
          placeholder="Ej: Nuevo, Más vendido, Temporada, Boda..."
          maxLength={20}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
        />
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            form.featured ? "bg-pink-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              form.featured ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          Destacar en la página principal
        </span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span> Guardando...
            </>
          ) : (
            <>{isEditing ? "✏️ Actualizar" : "✅ Crear Producto"}</>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
