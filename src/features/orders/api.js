import http from "../../app/http";
import orderSlice from "./orderSlice";

export const getOrderApi =
  ({ page, pageSize, status = "", name = "" }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.getOrder());
    try {
      const res = await http.get(
        `/nail/order/?page_size=${pageSize}&page=${page}&status=${status}&name=${name}`
      );
      dispatch(orderSlice.actions.getOrderSuccess(res.data));
    } catch (e) {
      dispatch(orderSlice.actions.getOrderFail(e?.response?.data));
    }
  };
