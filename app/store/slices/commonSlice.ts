import { CommonSliceInterface } from "@/app/types/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CommonSliceInterface = {
  isOpenSidebar: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleSideBar: (state, actions: PayloadAction<boolean>) => {
      state.isOpenSidebar = actions.payload;
    },
    toggleModal: (state, actions: PayloadAction<boolean>) => {
      state.isOpenSidebar = actions.payload;
    },
  },
});

export const { toggleSideBar, toggleModal } = commonSlice.actions;
export default commonSlice.reducer;