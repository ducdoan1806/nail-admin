import http, { authHttp } from "../../app/http";
import productDetailSlice from "./productDetailSlice";
import productSlice from "./productSlice";

export const getProductsApi =
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
export const getProductApi = (productId) => async (dispatch) => {
  dispatch(productDetailSlice.actions.getProduct());
  try {
    const res = await http.get(`/nail/products/?product_id=${productId}`);
    dispatch(productDetailSlice.actions.getProductSuccess(res.data.data));
  } catch (e) {
    dispatch(
      productDetailSlice.actions.getProductFail(e?.response?.data)
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
export const updateProductDetailApi = (variant, id) => async (dispatch) => {
  dispatch(productDetailSlice.actions.updateProductDetail());
  try {
    const res = await authHttp.put(
      `/nail/product-detail/${id}/`,
      JSON.stringify({
        price: variant?.price,
        color_code: variant?.color_code,
        color_name: variant?.color_code,
        quantity: variant?.quantity,
        product: variant?.product,
      })
    );
    dispatch(productDetailSlice.actions.updateProductDetailSuccess(res?.data));
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
    dispatch(productDetailSlice.actions.deleteProductDetailSuccess(res?.data));
  } catch (e) {
    dispatch(
      productDetailSlice.actions.deleteProductDetailFail(e?.response?.data)
    );
  }
};
export const createProductImageApi =
  (images, productId) => async (dispatch) => {
    dispatch(productDetailSlice.actions.createImage());
    try {
      const formData = new FormData();
      formData.append("product_id", productId);
      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });
      const res = await authHttp.post(`/nail/images/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(productDetailSlice.actions.createImageSuccess(res?.data));
    } catch (e) {
      dispatch(productDetailSlice.actions.createImageFail(e?.response?.data));
    }
  };
export const deleteImageApi = (id) => async (dispatch) => {
  dispatch(productDetailSlice.actions.deleteImage());
  try {
    const res = await authHttp.delete(`/nail/images/${id}/`);
    dispatch(productDetailSlice.actions.deleteImageSuccess(res?.data));
  } catch (e) {
    dispatch(productDetailSlice.actions.deleteImageFail(e?.response?.data));
  }
};
