import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import reducers from "../reducers";
import rootSaga from "../../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
