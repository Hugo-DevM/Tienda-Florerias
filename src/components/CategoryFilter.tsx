"use client";

import { Category, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/types";

interface Props {
  selected: Category | "todos";
  onChange: (cat: Category | "todos") => void;
  counts?: Partial<Record<Category | "todos", number>>;
}

const ALL_TABS: Array<{ key: Category | "todos" }> = [
  { key: "todos" },
  { key: "siempre_disponible" },
  { key: "temporada" },
  { key: "sobre_pedido" },
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
      <div className="flex flex-wrap gap-1.5">
        {ALL_TABS.map(({ key }) => {
          const isActive = selected === key;
          const count = counts?.[key];
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="btn-press flex items-center gap-2 px-4 py-2 text-sm font-medium border"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: isActive ? "#7C2D3C" : "white",
                borderColor: isActive ? "#7C2D3C" : "#E7E5E4",
                color: isActive ? "white" : "#57534E",
                transition: "background 150ms var(--ease-out), border-color 150ms var(--ease-out), color 150ms var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#7C2D3C";
                  (e.currentTarget as HTMLElement).style.color = "#7C2D3C";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#E7E5E4";
                  (e.currentTarget as HTMLElement).style.color = "#57534E";
                }
              }}
            >
              <span>{LABELS[key]}</span>
              {count !== undefined && (
                <span
                  className="text-xs px-1.5 py-0.5"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "#F5F5F4",
                    color: isActive ? "white" : "#A8A29E",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p
        className="text-sm mt-3"
        style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
      >
        {DESCRIPTIONS[selected]}
      </p>
    </div>
  );
}
