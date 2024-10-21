import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  isError: false,
  product: null,
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
    },
    getProductDetail: (state) => {
      state.loading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.message = null;
    },
    getProductDetailFail: (state, action) => {
      state.loading = false;
      state.product = null;
      state.message = action.payload;
    },
    createProductDetail: (state) => {
      state.loading = true;
    },
    createProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product.detail_products.unshift(action.payload.data);
      state.message = action.payload?.message;
      state.isError = false;
    },
    createProductDetailFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
    updateProductDetail: (state) => {
      state.loading = true;
    },
    updateProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product.detail_products = state.product.detail_products.map(
        (item) => (item.id === action.payload?.id ? action.payload : item)
      );
      state.message = action.payload?.message;
      state.isError = false;
    },
    updateProductDetailFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
    deleteProductDetail: (state) => {
      state.loading = true;
    },
    deleteProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product.detail_products = state.product.detail_products.filter(
        (item) => item.id !== action.payload?.data?.id
      );
      state.message = action.payload?.message;
      state.isError = false;
    },
    deleteProductDetailFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
  },
});
export default productDetailSlice;
