import { call, put, takeEvery } from "redux-saga/effects";
import { categoryApi } from "./api";
import categorySlice from "./categorySlice";
function* fetchCategoriesSaga() {
  try {
    const res = yield call(categoryApi);
    yield put(categorySlice.actions.getCategorySuccess(res?.data));
  } catch (e) {
    yield put(categorySlice.actions.getCategoryFail(e?.response?.data));
  }
}
export default function* categorySaga() {
  yield takeEvery("category/getCategory", fetchCategoriesSaga);
}
