export interface RatingProps {
  rating: number;
  maxStars?: number;
  size?: string;
  color?: string;
}

export interface SidebarPropTypes {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}
