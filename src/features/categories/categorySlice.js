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
      state.message = null;
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

      state.categories.unshift(action.payload.data);
      state.count = state.categories.length;
      state.message = action.payload.message;
      state.isError = false;
    },
    createCategoryFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
    updateCategory: (state) => {
      state.loading = true;
    },
    updateCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = state.categories.map((item) =>
        action.payload?.data?.id === item?.id ? action.payload?.data : item
      );
      state.message = action.payload.message;
      state.isError = false;
    },
    updateCategoryFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
    deleteCategory: (state) => {
      state.loading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (item) => action.payload?.data?.id !== item?.id
      );
      state.count = state.categories.length;
      state.message = action.payload.message;
      state.isError = false;
    },
    deleteCategoryFail: (state, action) => {
      state.loading = false;
      state.message = JSON.stringify(action.payload);
      state.isError = true;
    },
  },
});
export default categorySlice;
