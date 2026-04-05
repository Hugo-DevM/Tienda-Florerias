export type Category =
  | "siempre_disponible"
  | "temporada"
  | "sobre_pedido";

export const CATEGORY_LABELS: Record<Category, string> = {
  siempre_disponible: "Siempre Disponibles",
  temporada: "Por Temporada",
  sobre_pedido: "Sobre Pedido",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  siempre_disponible: "Flores que encuentras todo el año",
  temporada: "Disponibles según la temporada",
  sobre_pedido: "Arreglos especiales con previo aviso",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  siempre_disponible: "🌹",
  temporada: "🌸",
  sobre_pedido: "✨",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  visible: boolean;
  featured?: boolean;
  badge?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
