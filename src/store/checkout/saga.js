import { call, put, takeLatest } from "redux-saga/effects";

import {
  POST_CHECKOUT,
  POST_CHECKOUT_SUCCESS,
  POST_CHECKOUT_FAILED,
} from "./types";

import checkoutServices from "../../api/services/checkout";

function* fnPostCheckout({ payload }) {
  try {
    const response = yield call(checkoutServices.api.fnPostCheckout, payload);

    yield put({
      type: POST_CHECKOUT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: POST_CHECKOUT_FAILED,
      payload: error,
    });
  }
}

export default function* watcher() {
  yield takeLatest(POST_CHECKOUT, fnPostCheckout);
}
