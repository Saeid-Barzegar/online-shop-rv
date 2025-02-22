
type RatingType = {
  rate: number;
  count: number;
}

export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
  count: number;
}

export type CartItemType = {
  product: ProductInterface;
  count: number;
};

export interface CommonSliceInterface {
  isOpenSidebar: boolean;
};

export interface NavigationPropTypes {}