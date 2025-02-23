import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import commonSlice from './slices/commonSlice';
import shopSlice from './slices/shopSlice';

const rootReducer = combineReducers({
  common: commonSlice,
  shop: shopSlice
});

const isDevelopmentMode = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopmentMode,
  middleware: getDefaultMiddleware => isDevelopmentMode
    ? getDefaultMiddleware()
      .concat(logger)
    : getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;