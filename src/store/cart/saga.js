import { call, put, takeLatest } from "redux-saga/effects";
import { handleErrorResponse } from "../../helpers/api_helper";
import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  ADD_NEW_USER,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "./types";

import userServices from "../../api/services/user";

// function* fnGetUserList() {
//   try {
//     const data = yield call(userServices.api.fnGetUserList);
//     yield put({
//       type: GET_USER_LIST_SUCCESS,
//       payload: [...data.data.data.result],
//     });
//   } catch (error) {
//     yield put({
//       type: GET_USER_LIST_FAILED,
//       payload: error.response?.data ? error.response?.data.message : "",
//     });
//   }
// }

export default function* watcher() {
  // yield takeLatest(GET_USER_LIST, fnGetUserList);
}
