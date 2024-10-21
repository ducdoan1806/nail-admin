import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  isError: false,
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
    reset: (state) => {
      state.message = null;
      state.isError = false;
    },
    updatePagination: (state, action) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setSearchQuery: (state, action) => {
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
      state.message = null;
    },
    getOrderFail: (state, action) => {
      state.loading = false;
      state.orders = [];
      state.message = action.payload;
    },
    updateOrder: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.map((item) =>
        item.id === action.payload?.data?.id ? action.payload?.data : item
      );
      state.message = action.payload.message;
      state.isError = false;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = JSON.stringify(action.payload);
    },
  },
});
export default orderSlice;
