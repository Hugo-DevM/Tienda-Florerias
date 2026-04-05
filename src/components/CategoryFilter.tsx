"use client";

import { Category, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from "@/types";

interface Props {
  selected: Category | "todos";
  onChange: (cat: Category | "todos") => void;
  counts?: Partial<Record<Category | "todos", number>>;
}

const ALL_TABS: Array<{ key: Category | "todos"; emoji: string }> = [
  { key: "todos", emoji: "🌺" },
  { key: "siempre_disponible", emoji: CATEGORY_ICONS.siempre_disponible },
  { key: "temporada", emoji: CATEGORY_ICONS.temporada },
  { key: "sobre_pedido", emoji: CATEGORY_ICONS.sobre_pedido },
];

const LABELS: Record<Category | "todos", string> = {
  todos: "Todos",
  ...CATEGORY_LABELS,
};

const DESCRIPTIONS: Record<Category | "todos", string> = {
  todos: "Ver todos los arreglos disponibles",
  siempre_disponible: CATEGORY_DESCRIPTIONS.siempre_disponible,
  temporada: CATEGORY_DESCRIPTIONS.temporada,
  sobre_pedido: CATEGORY_DESCRIPTIONS.sobre_pedido,
};

export default function CategoryFilter({ selected, onChange, counts }: Props) {
  return (
    <div className="w-full">
      {/* Pill tabs */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {ALL_TABS.map(({ key, emoji }) => {
          const isActive = selected === key;
          const count = counts?.[key];
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all border ${
                isActive
                  ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-200"
                  : "bg-white border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500"
              }`}
            >
              <span>{emoji}</span>
              <span>{LABELS[key]}</span>
              {count !== undefined && (
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active description */}
      <p className="text-gray-400 text-sm mt-3 ml-1">
        {DESCRIPTIONS[selected]}
      </p>
    </div>
  );
}
