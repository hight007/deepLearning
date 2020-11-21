import {
  HTTP_PLANTCODE_FETCHING,
  HTTP_PLANTCODE_FAILED,
  HTTP_PLANTCODE_SUCCESS,
  HTTP_PLANTCODE_ALERTED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PLANTCODE_FETCHING:
      return {
        ...state,
        result: null,
        isFetching: true,
        isError: false,
        errorMessage: null,
      };

    case HTTP_PLANTCODE_SUCCESS:
      return {
        ...state,
        result: payload,
        isFetching: false,
        isError: false,
        errorMessage: null,
      };

    case HTTP_PLANTCODE_FAILED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };

    case HTTP_PLANTCODE_ALERTED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
