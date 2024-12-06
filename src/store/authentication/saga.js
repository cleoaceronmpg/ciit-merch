import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  API_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./types";

import authenticationServices from "../../api/services/authentication";

function* fnPostLogin({ payload }) {
  try {
    const response = yield call(
      authenticationServices.api.fnPostLogin,
      payload
    );

    yield put({
      type: LOGIN_SUCCESS,
      payload: { token: response.data.token, data: response.data },
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: error.response.data ? error.response.data.message : "",
    });
  }
}

function* fnPostRegister({ payload }) {
  try {
    console.log("huyyyyyyy");
    const response = yield call(
      authenticationServices.api.fnPostRegister,
      payload
    );

    yield put({
      type: REGISTER_SUCCESS,
      payload: response.data?.records[0],
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILED,
      payload: error.response.data ? error.response.data.message : "",
    });
  }
}

function* authenticationSaga() {
  yield takeLatest(LOGIN_USER, fnPostLogin);
  yield takeLatest(REGISTER, fnPostRegister);
}

export default authenticationSaga;
