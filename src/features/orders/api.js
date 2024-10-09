import http from "../../app/http";
import orderDetailSlice from "./orderDetailSlice";
import orderSlice from "./orderSlice";

export const getOrderApi =
  ({ page, pageSize, status = "", search = "" }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.getOrder());
    try {
      const res = await http.get(
        `/nail/order/?page_size=${pageSize}&page=${page}&status=${status}&search=${search}`
      );
      dispatch(orderSlice.actions.getOrderSuccess(res.data));
    } catch (e) {
      dispatch(orderSlice.actions.getOrderFail(e?.response?.data));
    }
  };
export const getOrderDetailApi = (orderCode) => async (dispatch) => {
  dispatch(orderDetailSlice.actions.getOrderDetail());
  try {
    const res = await http.get(`/nail/order/${orderCode}/`);
    dispatch(orderDetailSlice.actions.getOrderDetailSuccess(res?.data?.data));
  } catch (e) {
    dispatch(orderDetailSlice.actions.getOrderDetailFail(e?.response?.data));
  }
};
