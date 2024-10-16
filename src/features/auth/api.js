import http from "../../app/http";
import { OAUTH2_INFO } from "../../utils/const";
import { getCookie } from "../../utils/util";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

export const loginApi = (info) => async (dispatch) => {
  dispatch(authSlice.actions.login());
  try {
    const res = await http.post(
      "/o/token/",
      JSON.stringify({
        ...OAUTH2_INFO,
        username: info.username.trim(),
        password: info.password.trim(),
      })
    );
    dispatch(authSlice.actions.loginSuccess(res.data));
  } catch (e) {
    if (e.code === "ERR_NETWORK")
      dispatch(authSlice.actions.loginFail(e.message));
    else dispatch(authSlice.actions.loginFail(e.response?.data));
  }
};
export const getUserApi = () => async (dispatch) => {
  dispatch(userSlice.actions.getUser());
  try {
    const authToken = getCookie("authToken");
    const response = await http.get("/api/user/", {
      headers: { Authorization: authToken },
    });
    dispatch(userSlice.actions.getUserSuccess(response.data));
  } catch (e) {
    dispatch(userSlice.actions.getUserFail(e?.response?.data));
  }
};
