import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categories: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategory: (state) => {
      state.loading = true;
    },
    getCategorySuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.categories = action.payload.results;

      state.error = null;
    },
    getCategoryFail: (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    },
  },
});
export default categorySlice;
