import http from "../../app/http";
import categorySlice from "./categorySlice";
import productDetailSlice from "./productDetailSlice";
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
export const getProductDetailApi = (productId) => async (dispatch) => {
  dispatch(productDetailSlice.actions.getProductDetail());
  try {
    const res = await http.get(`/nail/products/?product_id=${productId}`);
    dispatch(productDetailSlice.actions.getProductDetailSuccess(res.data.data));
  } catch (e) {
    dispatch(
      productDetailSlice.actions.getProductDetailFail(e?.response?.data)
    );
  }
};
export const updateProductDetailApi = (product) => async (dispatch) => {
  dispatch(productDetailSlice.actions.updateProductDetail());
  try {
    dispatch(productDetailSlice.actions.updateProductDetailSuccess(product));
  } catch (e) {
    dispatch(
      productDetailSlice.actions.updateProductDetailFail(e?.response?.data)
    );
  }
};
export const categoryApi = () => async (dispatch) => {
  dispatch(categorySlice.actions.getCategory());
  try {
    const res = await http.get(`/nail/categories/?page=1&page_size=999`);
    dispatch(categorySlice.actions.getCategorySuccess(res?.data));
  } catch (e) {
    dispatch(categorySlice.actions.getCategoryFail(e?.response?.data));
  }
};
