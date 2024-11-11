import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  API_ERROR,
} from "./types";

import appServices from "../../api/services/app";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(appServices.api.fnLogin, {
      username: user.username,
      password: user.password,
    });

    // localStorage.setItem("authUser", JSON.stringify(response));
    // yield put({
    //   type: LOGIN_SUCCESS,
    //   payload: { token: response.data.token, data: response.data },
    // });
    // history("/dashboard");
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: error.response.data ? error.response.data.message : "",
    });
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    yield put({
      type: LOGOUT_USER_SUCCESS,
    });

    history("/login");
  } catch (error) {
    yield put({
      type: API_ERROR,
      payload: { error },
    });
  }
}

function* authenticationSaga() {
  // yield takeLatest(LOGIN_USER, loginUser);
  // yield takeLatest(LOGOUT_USER, logoutUser);
}

export default authenticationSaga;
