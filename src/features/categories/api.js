import { authHttp } from "../../app/http";
import categorySlice from "../categories/categorySlice";

export const categoryApi = () => async (dispatch) => {
  dispatch(categorySlice.actions.getCategory());
  try {
    const res = await authHttp.get(`/nail/categories/?page=1&page_size=999`);
    dispatch(categorySlice.actions.getCategorySuccess(res?.data));
  } catch (e) {
    dispatch(categorySlice.actions.getCategoryFail(e?.response?.data));
  }
};
export const createCategoryApi = (newCategory) => async (dispatch) => {
  dispatch(categorySlice.actions.createCategory());
  try {
    const res = await authHttp.post(
      `/nail/categories/`,
      JSON.stringify({
        code: newCategory?.code?.trim(),
        name: newCategory?.name?.trim(),
      })
    );
    dispatch(categorySlice.actions.createCategorySuccess(res?.data));
  } catch (e) {
    dispatch(categorySlice.actions.createCategoryFail(e?.response?.data));
  }
};
export const updateCategoryApi = (category, id) => async (dispatch) => {
  dispatch(categorySlice.actions.updateCategory());
  try {
    const res = await authHttp.put(
      `/nail/categories/${id}/`,
      JSON.stringify({
        code: category?.code?.trim(),
        name: category?.name?.trim(),
      })
    );
    dispatch(categorySlice.actions.updateCategorySuccess(res?.data));
  } catch (e) {
    dispatch(categorySlice.actions.updateCategoryFail(e?.response?.data));
  }
};
export const deleteCategoryApi = (id) => async (dispatch) => {
  dispatch(categorySlice.actions.deleteCategory());
  try {
    const res = await authHttp.delete(`/nail/categories/${id}/`);
    dispatch(categorySlice.actions.deleteCategorySuccess(res?.data));
  } catch (e) {
    dispatch(categorySlice.actions.deleteCategoryFail(e?.response?.data));
  }
};
