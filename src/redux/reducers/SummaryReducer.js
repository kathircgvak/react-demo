import {
  GET_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_FAILURE,
} from "../actions";

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: null,
};

const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return {
        ...state,
        data: [],
        isFetching: true,
      };
    case GET_SUMMARY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    case GET_SUMMARY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default summaryReducer;
