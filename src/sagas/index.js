import { all } from "redux-saga/effects";

import GetSummary from "./GetSummary";
import GetOrders from "./GetOrders";

export default function* rootSaga() {
  yield all([GetSummary(), GetOrders()]);
}
