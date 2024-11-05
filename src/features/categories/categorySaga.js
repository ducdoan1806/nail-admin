import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { categoryApi, createCategoryApi } from "./api";
import categorySlice from "./categorySlice";
function* fetchCategoriesSaga() {
  try {
    const res = yield call(categoryApi);
    yield put(categorySlice.actions.getCategorySuccess(res?.data));
  } catch (e) {
    yield put(categorySlice.actions.getCategoryFail(e?.response?.data));
  }
}
function* createCategoriesSaga(action) {
  try {
    const res = yield call(createCategoryApi, action.payload);
    yield put(categorySlice.actions.createCategorySuccess(res?.data));
  } catch (e) {
    yield put(categorySlice.actions.createCategoryFail(e?.response?.data));
  }
}
export default function* categorySaga() {
  yield takeEvery("category/getCategory", fetchCategoriesSaga);
  yield takeLatest("category/createCategory", createCategoriesSaga);
}
