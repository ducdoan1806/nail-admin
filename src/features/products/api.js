import http from "../../app/http";
import productSlice from "./productSlice";

export const getProductApi =
  ({ page, pageSize, search = "" }) =>
  async (dispatch) => {
    dispatch(productSlice.actions.getProduct());
    try {
      const res = await http.get(
        `/nail/products/?page_size=${pageSize}&page=${page}&search=${search}`
      );
      dispatch(productSlice.actions.getProductSuccess(res.data));
    } catch (e) {
      dispatch(productSlice.actions.getProductFail(e?.response?.data));
    }
  };
