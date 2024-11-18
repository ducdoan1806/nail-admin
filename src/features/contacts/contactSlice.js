import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  message: "",
  contacts: [],
};
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
    getContact: (state) => {
      state.loading = true;
    },
    getContactSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload.results;
      state.error = false;
    },
    getContactFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    postContact: (state) => {
      state.loading = true;
    },
    postContactSuccess: (state, action) => {
      state.loading = false;
      state.contacts.unshift(action.payload);
      state.error = false;
      state.message = "Contract is created";
    },
    postContactFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    updateContact: (state) => {
      state.loading = true;
    },
    updateContactSuccess: (state, action) => {
      state.loading = false;
      state.contacts = state.contacts.map((item) =>
        item?.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.message = "Contract is updated";
    },
    updateContactFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    deleteContact: (state) => {
      state.loading = true;
    },
    deleteContactSuccess: (state, action) => {
      state.loading = false;
      state.contacts = state.contacts.filter(
        (item) => item?.id !== action.payload
      );
      state.message = "Contract is deleted  ";
      state.error = false;
    },
    deleteContactFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});
export default contactSlice;
