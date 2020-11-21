import {
  HTTP_PLANTCODE_FETCHING,
  HTTP_PLANTCODE_FAILED,
  HTTP_PLANTCODE_SUCCESS,
  HTTP_PLANTCODE_ALERTED,
  server,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_PLANTCODE_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_PLANTCODE_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_PLANTCODE_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_PLANTCODE_ALERTED,
  payload: payload,
});

export const getPlantCode = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    httpClient
      .get(server.PLANTCODE_URL)
      .then((result) => {
        //alert(JSON.stringify(result.data))
        dispatch(setStateToSuccess(result.data));
      })
      .catch((error) => {
        dispatch(setStateToFailed(error));
      });
  };
};

export const showPlantCodeErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Plant code error...",
      text: messageError,
    });
  };
};
