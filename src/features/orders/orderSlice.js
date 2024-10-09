import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  page: 1,
  pageSize: 20,
  search: "",
  status: "",
  count: 0,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updatePagination(state, action) {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setSearchQuery(state, action) {
      state.search = action.payload.search;
      state.status = action.payload.status;
      state.page = 1; // Reset page on search
    },
    getOrder: (state) => {
      state.loading = true;
    },
    getOrderSuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      if (state.page === 1) state.orders = action.payload.results;
      else state.orders = [...state.orders, ...action.payload.results];
      state.error = null;
    },
    getOrderFail: (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.payload;
    },
  },
});
export default orderSlice;
