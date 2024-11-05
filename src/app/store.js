import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga';
import orderSlice from "../features/orders/orderSlice";
import orderDetailSlice from "../features/orders/orderDetailSlice";
import productSlice from "../features/products/productSlice";
import productDetailSlice from "../features/products/productDetailSlice";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/auth/userSlice";
import categorySlice from "../features/categories/categorySlice";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  order: orderSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  orderDetail: orderDetailSlice.reducer,
  product: productSlice.reducer,
  productDetail: productDetailSlice.reducer,
  category: categorySlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;
