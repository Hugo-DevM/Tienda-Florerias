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

const CATEGORIES: Category[] = ["siempre_disponible", "temporada", "sobre_pedido"];

const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  color: "#1C1917",
  transition: "border-color 150ms var(--ease-out)",
};

export default function ProductForm({ initial = {}, onSave, onCancel, isEditing = false }: Props) {
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
      setError(err instanceof Error ? err.message : "Error al subir imagen");
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
      await onSave({ ...form, price: Number(form.price) });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          className="px-4 py-3 text-sm flex items-start gap-2"
          style={{
            background: "#FFF5F5",
            border: "1px solid #FECACA",
            color: "#991B1B",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span className="mt-0.5 shrink-0">—</span>
          <span>{error}</span>
        </div>
      )}

      {/* Image upload */}
      <div>
        <FieldLabel>Imagen del producto *</FieldLabel>
        <div
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer border border-dashed overflow-hidden"
          style={{
            borderColor: preview ? "#E7E5E4" : "#D6D3D1",
            transition: "border-color 150ms var(--ease-out)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#7C2D3C")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = preview ? "#E7E5E4" : "#D6D3D1")}
        >
          {preview ? (
            <div className="relative h-48 bg-stone-50">
              <Image src={preview} alt="Preview" fill className="object-contain p-2" sizes="480px" />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100"
                style={{ background: "rgba(26,22,20,0.35)", transition: "opacity 200ms var(--ease-out)" }}
              >
                <span
                  className="bg-white px-3 py-1.5 text-sm font-medium text-stone-700"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Cambiar imagen
                </span>
              </div>
            </div>
          ) : (
            <div
              className="h-40 flex flex-col items-center justify-center"
              style={{ background: "#FAF9F7" }}
            >
              {uploading ? (
                <Spinner />
              ) : (
                <>
                  <UploadIcon />
                  <p className="text-sm mt-2" style={{ color: "#78716C", fontFamily: "'Inter', sans-serif" }}>
                    Haz clic para subir imagen
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}>
                    JPG, PNG o WebP
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {uploading && (
          <p className="text-xs mt-1.5 flex items-center gap-1.5" style={{ color: "#7C2D3C", fontFamily: "'Inter', sans-serif" }}>
            <Spinner small /> Subiendo imagen...
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <FieldLabel>Nombre del producto *</FieldLabel>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Ej: Ramo de Rosas Rojas"
          className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
          required
        />
      </div>

      {/* Description */}
      <div>
        <FieldLabel>Descripción</FieldLabel>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Describe el arreglo, flores incluidas, tamaño, etc."
          rows={3}
          className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none resize-none"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Precio (MXN) *</FieldLabel>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              $
            </span>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full border border-stone-200 pl-7 pr-4 py-2.5 text-sm bg-white focus:outline-none"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
              required
            />
          </div>
        </div>

        <div>
          <FieldLabel>Categoría *</FieldLabel>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
            className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Badge */}
      <div>
        <FieldLabel sub="(opcional)">Etiqueta / Badge</FieldLabel>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
          placeholder="Ej: Nuevo, Más vendido, Temporada..."
          maxLength={20}
          className="w-full border border-stone-200 px-4 py-2.5 text-sm bg-white focus:outline-none"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
        />
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
          className="btn-press relative flex-shrink-0"
          style={{
            width: 40,
            height: 22,
            background: form.featured ? "#7C2D3C" : "#E7E5E4",
            transition: "background 200ms var(--ease-out)",
          }}
          role="switch"
          aria-checked={form.featured}
        >
          <span
            className="absolute top-1 left-1 w-3.5 h-3.5 bg-white"
            style={{
              transform: form.featured ? "translateX(18px)" : "translateX(0)",
              transition: "transform 200ms var(--ease-out)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          />
        </button>
        <span
          className="text-sm font-medium text-stone-700"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Destacar en la página principal
        </span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-press flex-1 py-3 text-sm font-medium text-white flex items-center justify-center gap-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: saving || uploading ? "#A8A29E" : "#7C2D3C",
            cursor: saving || uploading ? "not-allowed" : "pointer",
            transition: "background 200ms var(--ease-out)",
          }}
        >
          {saving ? <><Spinner small /> Guardando...</> : isEditing ? "Actualizar producto" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-press px-5 py-3 border border-stone-200 text-stone-600 text-sm font-medium hover:border-stone-400"
          style={{ fontFamily: "'Inter', sans-serif", transition: "border-color 150ms var(--ease-out)" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function FieldLabel({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <label
      className="block text-xs font-medium uppercase tracking-wider mb-1.5"
      style={{ color: "#57534E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.07em" }}
    >
      {children}{" "}
      {sub && <span style={{ color: "#A8A29E", textTransform: "none", letterSpacing: "normal" }}>{sub}</span>}
    </label>
  );
}

function Spinner({ small }: { small?: boolean }) {
  return (
    <svg
      className={`animate-spin ${small ? "w-3.5 h-3.5" : "w-6 h-6"}`}
      fill="none" viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="w-7 h-7 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}
