import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
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
      state.error = null;
    },
    getProductFail: (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    },
  },
});
export default productSlice;
