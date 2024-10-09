import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  order: null,
};
const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    getOrderDetail: (state) => {
      state.loading = true;
    },
    getOrderDetailSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    getOrderDetailFail: (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    },
  },
});
export default orderDetailSlice;
