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
      state.product = action.payload;
      state.message = action.payload?.message;
      state.isError = false;
    },
    updateProductDetailFail: (state, action) => {
      state.loading = false;
      state.product = null;
      state.message = action.payload;
      state.isError = true;
    },
  },
});
export default productDetailSlice;
