import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import orderSlice from "../features/orders/orderSlice";
import orderDetailSlice from "../features/orders/orderDetailSlice";
import productSlice from "../features/products/productSlice";
import productDetailSlice from "../features/products/productDetailSlice";
import authSlice from "../features/auth/authSlice";

const rootReducer = combineReducers({
  order: orderSlice.reducer,
  auth: authSlice.reducer,
  orderDetail: orderDetailSlice.reducer,
  product: productSlice.reducer,
  productDetail: productDetailSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
