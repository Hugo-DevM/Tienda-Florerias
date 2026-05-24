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

// ── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_delivery"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  in_delivery: "En camino",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  pending:     { bg: "#FEF9EC", text: "#92400E", border: "#FDE68A" },
  confirmed:   { bg: "#EBF4EF", text: "#1A5736", border: "#BBD9C5" },
  in_delivery: { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  delivered:   { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  cancelled:   { bg: "#FFF5F5", text: "#991B1B", border: "#FECACA" },
};

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}
