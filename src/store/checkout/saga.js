import { call, put, takeLatest } from "redux-saga/effects";

import {
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_SUCCESS,
  PLACE_ORDER_ITEMS_FAILED,
} from "./types";

import checkoutServices from "../../api/services/checkout";

function* fnPostPlaceOrder({ payload }) {
  try {
    const response = yield call(checkoutServices.api.fnPostPlaceOrder, payload);

    if (!response?.id) {
      throw "Failed to Place Order, Please try again later.";
    }

    const data = {
      fields: response.fields,
      id: response.id,
    };

    yield put({
      type: PLACE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: PLACE_ORDER_FAILED,
      payload: error,
    });
  }
}

function* fnPostPlaceOrderItems({ payload }) {
  try {
    const response = yield call(
      checkoutServices.api.fnPostPlaceOrderItems,
      payload
    );

    const newdata = response.map((item) => ({ ...item.fields, id: item.id }));

    yield put({
      type: PLACE_ORDER_ITEMS_SUCCESS,
      payload: newdata,
    });
  } catch (error) {
    yield put({
      type: PLACE_ORDER_ITEMS_FAILED,
      payload: error,
    });
  }
}

export default function* watcher() {
  yield takeLatest(PLACE_ORDER, fnPostPlaceOrder);
  yield takeLatest(PLACE_ORDER_ITEMS, fnPostPlaceOrderItems);
}
