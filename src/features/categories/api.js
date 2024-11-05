import { authHttp } from "../../app/http";
import categorySlice from "../categories/categorySlice";

export const categoryApi = async () =>
  await authHttp.get(`/nail/categories/?page=1&page_size=999`);

export const createCategoryApi = async (newCategory) =>
  await authHttp.post(
    `/nail/categories/`,
    JSON.stringify({
      code: newCategory?.code?.trim(),
      name: newCategory?.name?.trim(),
    })
  );

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
