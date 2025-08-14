export interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  cartQuantity: number;
  slug?: string;
  originalPrice?: number;
}

export interface CartCardProps {
  item: CartItem;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
}