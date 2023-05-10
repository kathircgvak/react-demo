import { combineReducers } from "redux";
import summaryReducer from "./SummaryReducer";
import orderReducer from "./OrderReducer";

const rootReducer = combineReducers({
  summaryReducer,
  orderReducer,
});

export default rootReducer;
