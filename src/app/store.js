import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import orderSlice from "../features/orders/orderSlice";
import orderDetailSlice from "../features/orders/orderDetailSlice";

const rootReducer = combineReducers({
  order: orderSlice.reducer,
  orderDetail: orderDetailSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
