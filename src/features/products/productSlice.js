import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isError: false,
  message: null,
  products: [],
  page: 1,
  pageSize: 20,
  search: "",
  count: 0,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updatePagination(state, action) {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setSearchQuery(state, action) {
      state.search = action.payload.search;
      state.page = 1;
    },
    getProduct: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      if (state.page === 1) state.products = action.payload.results;
      else state.products = [...state.products, ...action.payload.results];
      state.message = null;
      state.isError = false;
    },
    getProductFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
    createProduct: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload.count + 1;
      state.products.push(action.payload?.data);
      state.message = action.payload?.message;
      state.isError = false;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
  },
});
export default productSlice;
