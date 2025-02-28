import { ProductInterface } from "./product.type"
export interface RatingPropTypes {
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

export interface ErrorComponentPropTypes {
  message?: string;
}

export interface PaginationPropTypes {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}