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
    resetError: (state) => {
      state.loading = false;
      state.error = null;
    },
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
    createCategory: (state) => {
      state.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.categories.unshift(action.payload.data);
      state.error = null;
    },
    createCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default categorySlice;
