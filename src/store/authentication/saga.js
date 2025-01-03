import { call, put, takeLatest } from "redux-saga/effects";
import CryptoJS from "crypto-js";

// Login Redux States
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  POST_VERIFY_ACCOUNT,
  POST_VERIFY_ACCOUNT_SUCCESS,
  POST_VERIFY_ACCOUNT_FAILED,
  POST_UPDATE_VERIFIED_ACCOUNT,
  POST_UPDATE_VERIFIED_ACCOUNT_SUCCESS,
  POST_UPDATE_VERIFIED_ACCOUNT_FAILED,
} from "./types";

import authenticationServices from "../../api/services/authentication";

function* fnPostLogin({ payload }) {
  try {
    const response = yield call(
      authenticationServices.api.fnPostLogin,
      payload
    );

    if (!response.length) {
      throw "Invalid Email Address.";
    }

    if (response[0].fields.EmailVerified === "false") {
      throw "Your account needs to be verified. Please check your email inbox to complete the verification process.";
    }

    // Hash the provided password with the same salt used during encryption
    const hashedInputPassword = CryptoJS.HmacSHA256(
      payload.password,
      process.env.REACT_APP_SALTROUNDS || "defaultSalt"
    ).toString();

    // Compare the hashed password with the stored password
    const storedPassword = response[0].fields.Password;

    if (hashedInputPassword !== storedPassword) {
      throw "Invalid Password.";
    }

    const data = {
      fields: response[0].fields,
      id: response[0].id,
    };

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
    const emailAlreadyExist = yield call(
      authenticationServices.api.fnPostLogin,
      { email: payload.Email }
    );

    if (emailAlreadyExist.length) {
      throw "Email already registered.";
    }

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

function* fnPostVerifyAccountViaToken({ payload }) {
  try {
    const response = yield call(
      authenticationServices.api.fnPostVerifyAccountViaToken,
      payload
    );

    if (!response.length) {
      throw "token has expired.";
    }

    yield put({
      type: POST_VERIFY_ACCOUNT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: POST_VERIFY_ACCOUNT_FAILED,
      payload: error,
    });
  }
}

function* fnUpdateVerifiedAccount({ payload }) {
  try {
    const response = yield call(
      authenticationServices.api.fnUpdateVerifiedAccount,
      payload
    );

    yield put({
      type: POST_UPDATE_VERIFIED_ACCOUNT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: POST_UPDATE_VERIFIED_ACCOUNT_FAILED,
      payload: error,
    });
  }
}

function* authenticationSaga() {
  yield takeLatest(LOGIN_USER, fnPostLogin);
  yield takeLatest(REGISTER, fnPostRegister);
  yield takeLatest(POST_VERIFY_ACCOUNT, fnPostVerifyAccountViaToken);
  yield takeLatest(POST_UPDATE_VERIFIED_ACCOUNT, fnUpdateVerifiedAccount);
}

export default authenticationSaga;
