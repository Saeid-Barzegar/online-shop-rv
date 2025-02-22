import { ProductInterface } from "@/app/types/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemType = {
  product: ProductInterface;
  count: number;
};

export interface ShopSliceInterface {
  cart: CartItemType[]
};

const initialState: ShopSliceInterface = {
  cart: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<CartItemType>) => {
      state.cart.push(actions.payload);
    },
    updateItemCount: (state, actions: PayloadAction<CartItemType>) => {
      const newCart = state.cart.map(item => ({
        ...item,
        ...(item.product.id === actions.payload.product.id && { count: item.count + actions.payload.count })
      }))
      state.cart = newCart;
    },
    removeFromCart: (state, actions: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.product.id !== actions.payload);
    },
  },
});

export const { addToCart, updateItemCount, removeFromCart } = shopSlice.actions;
export default shopSlice.reducer;