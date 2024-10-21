import http, { authHttp } from "../../app/http";
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

export const createProductVariantApi = (newProduct) => async (dispatch) => {
  dispatch(productDetailSlice.actions.createProductDetail());
  try {
    const res = await authHttp.post(
      `/nail/product-detail/`,
      JSON.stringify({
        product: newProduct?.product,
        price: newProduct?.price,
        color_code: newProduct?.colorCode,
        color_name: newProduct?.colorCode,
        quantity: newProduct?.quantity,
      })
    );
    dispatch(productDetailSlice.actions.createProductDetailSuccess(res?.data));
  } catch (e) {
    dispatch(
      productDetailSlice.actions.createProductDetailFail(e?.response?.data)
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
export const deleteProductVariantApi = (id) => async (dispatch) => {
  dispatch(productDetailSlice.actions.deleteProductDetail());
  try {
    const res = await authHttp.delete(`/nail/product-detail/${id}/`);
    dispatch(
      productDetailSlice.actions.deleteProductDetailSuccess(res?.data)
    );
  } catch (e) {
    dispatch(
      productDetailSlice.actions.deleteProductDetailFail(e?.response?.data)
    );
  }
};
