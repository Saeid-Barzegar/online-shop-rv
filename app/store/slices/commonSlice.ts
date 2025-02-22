import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CommonSliceInterface {
  isOpenSidebar: boolean;
  isModalOpen: boolean;
};

const initialState: CommonSliceInterface = {
  isOpenSidebar: false,
  isModalOpen: true,
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