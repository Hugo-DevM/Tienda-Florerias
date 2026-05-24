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

export type Occasion =
  | "cumpleanos"
  | "aniversario"
  | "boda"
  | "condolencias"
  | "amor"
  | "graduacion"
  | "decoracion";

export const OCCASION_LABELS: Record<Occasion, string> = {
  cumpleanos: "Cumpleaños",
  aniversario: "Aniversario",
  boda: "Boda",
  condolencias: "Condolencias",
  amor: "Amor & Romance",
  graduacion: "Graduación",
  decoracion: "Decoración",
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
  occasions?: Occasion[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
