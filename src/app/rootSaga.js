import { all } from "redux-saga/effects";
import categorySaga from "../features/categories/categorySaga";

export default function* rootSaga() {
  yield all([categorySaga()]);
}
