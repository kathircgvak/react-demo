import { put, call, take } from "redux-saga/effects";
import { GetOrders } from "../services/Api";
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from "../redux/actions";

function* fetchData() {
  try {
    const data = yield call(GetOrders);
    yield put({ type: GET_ORDERS_SUCCESS, data });
  } catch (e) {
    yield put({ type: GET_ORDERS_FAILURE, error: e });
  }
}

function* orderDataSaga() {
  while (true) {
    yield take(GET_ORDERS);
    yield call(fetchData);
  }
}

export default orderDataSaga;
