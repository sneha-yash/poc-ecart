export interface NavigationItem {
  label: string;
  icon: string;
  link: string;
}

export interface HeaderProps {
  title: string,
  isClearCartVisible?: boolean;
  cartItemCount?: number;
  onCategoryClick?: (category: string) => void;
  onNavigationClick?: (item: string) => void;
}