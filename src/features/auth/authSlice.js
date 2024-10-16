import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  error: null,
  loading: false,
  loaded: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.error = null;
      state.token =
        action.payload.token_type + " " + action.payload.access_token;
      const expires = new Date(
        Date.now() + action.payload.expires_in * 1000
      ).toUTCString();
      document.cookie = `authToken=${state.token}; path=/; expires=${expires};`;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.loaded = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.loaded = false;
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
  },
});
export default authSlice;
