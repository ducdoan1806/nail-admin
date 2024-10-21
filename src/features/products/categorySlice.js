import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  isError: false,
  message: null,
  categories: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetError: (state) => {
      state.loading = false;
      state.message = null;
      state.isError = false;
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
      state.message = action.payload;
    },
    createCategory: (state) => {
      state.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.count = state.count + 1;
      state.categories.unshift(action.payload.data);
      state.message = action.payload.message;
      state.isError = false;
    },
    createCategoryFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
  },
});
export default categorySlice;
