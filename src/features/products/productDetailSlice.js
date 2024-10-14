import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  product: null,
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getProductDetail: (state) => {
      state.loading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    getProductDetailFail: (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    },
    updateProductDetail: (state) => {
      state.loading = true;
    },
    updateProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    updateProductDetailFail: (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    },
  },
});
export default productDetailSlice;
