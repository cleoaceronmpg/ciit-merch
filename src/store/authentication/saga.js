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

    if (!response.length) {
      throw "Invalid Email or Password.";
    }

    const data = {
      fields: response[0].fields,
      id: response[0].id,
    };
    console.log("data", data);

    yield put({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: error,
    });
  }
}

function* fnPostRegister({ payload }) {
  try {
    const response = yield call(
      authenticationServices.api.fnPostRegister,
      payload
    );

    yield put({
      type: REGISTER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILED,
      payload: error,
    });
  }
}

function* authenticationSaga() {
  yield takeLatest(LOGIN_USER, fnPostLogin);
  yield takeLatest(REGISTER, fnPostRegister);
}

export default authenticationSaga;
