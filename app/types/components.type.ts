import { ProductInterface } from "./product.type"
export interface RatingProps {
  rating: number;
  maxStars?: number;
}

export interface SidebarPropTypes {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export interface LinkButtonPropTypes {
  path: string;
  children: string;
}

export interface LoadingPropTypes {
  isLoading: boolean;
};

export interface ProductComponentPropTypes {
  product: ProductInterface;
}