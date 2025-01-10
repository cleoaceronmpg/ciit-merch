import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_CAMPAIGN,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_FAILED,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILED,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILED,
  GET_REMAINING_STOCKS,
  GET_REMAINING_STOCKS_SUCCESS,
  GET_REMAINING_STOCKS_FAILED,
  GET_SHIPPING_RATE,
  GET_SHIPPING_RATE_SUCCESS,
  GET_SHIPPING_RATE_FAILED,
  POST_CUSTOMER_REQUEST,
  POST_CUSTOMER_REQUEST_SUCCESS,
  POST_CUSTOMER_REQUEST_FAILED,
} from "./types";

import appServices from "../../api/services/app";

export function* fnGetProducts() {
  try {
    const response = yield call(appServices.api.fnGetProducts);
    if (response) {
      yield put({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products: response },
      });
    }
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_FAILED,
      payload: error,
    });
  }
}

export function* fnGetCampaign() {
  try {
    const response = yield call(appServices.api.fnGetCampaign);

    if (response) {
      const newdata = response.map((item) => item.fields);

      yield put({
        type: GET_CAMPAIGN_SUCCESS,
        payload: { campaign: newdata },
      });
    }
  } catch (error) {
    yield put({
      type: GET_CAMPAIGN_FAILED,
      payload: error,
    });
  }
}

export function* fnGetOrderHistory({ payload }) {
  try {
    const response = yield call(appServices.api.fnGetOrderHistory, payload);

    if (response) {
      yield put({
        type: GET_ORDER_HISTORY_SUCCESS,
        payload: { orderHistory: response },
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORDER_HISTORY_FAILED,
      payload: error,
    });
  }
}

export function* fnSearchProducts({ payload }) {
  try {
    const response = yield call(appServices.api.fnSearchProducts, payload);

    if (response) {
      const newdata = response.map((item) => ({ ...item.fields, id: item.id }));

      yield put({
        type: SEARCH_PRODUCTS_SUCCESS,
        payload: { searchData: newdata },
      });
    }
  } catch (error) {
    yield put({
      type: SEARCH_PRODUCTS_FAILED,
      payload: error,
    });
  }
}

export function* fnGetRemainingStocks({ payload }) {
  try {
    const response = yield call(appServices.api.fnGetRemainingStocks, payload);

    if (response) {
      //const newdata = response.map((item) => ({ ...item.fields, id: item.id }));
      const newdata = response.reduce((acc, currentItem) => {
        const remainingStocks = currentItem?.fields["Remaining Stocks"];
        return acc + parseInt(remainingStocks, 10);
      }, 0);

      yield put({
        type: GET_REMAINING_STOCKS_SUCCESS,
        payload: { remainingStocks: newdata },
      });
    }
  } catch (error) {
    yield put({
      type: GET_REMAINING_STOCKS_FAILED,
      payload: error,
    });
  }
}

export function* fnGetShippingRate({ payload }) {
  try {
    const response = yield call(appServices.api.fnGetShippingRate, payload);

    if (response) {
      const newdata = response.map((item) => ({ ...item.fields, id: item.id }));

      yield put({
        type: GET_SHIPPING_RATE_SUCCESS,
        payload: { shippingRate: newdata },
      });
    }
  } catch (error) {
    yield put({
      type: GET_SHIPPING_RATE_FAILED,
      payload: error,
    });
  }
}

export function* fnPostCustomerRequest({ payload }) {
  try {
    const response = yield call(appServices.api.fnPostCustomerRequest, payload);

    if (response) {
      yield put({
        type: POST_CUSTOMER_REQUEST_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: POST_CUSTOMER_REQUEST_FAILED,
      payload: error,
    });
  }
}

export default function* watcher() {
  yield takeLatest(GET_PRODUCTS, fnGetProducts);
  yield takeLatest(GET_CAMPAIGN, fnGetCampaign);
  yield takeLatest(GET_ORDER_HISTORY, fnGetOrderHistory);
  yield takeLatest(SEARCH_PRODUCTS, fnSearchProducts);
  yield takeLatest(GET_REMAINING_STOCKS, fnGetRemainingStocks);
  yield takeLatest(GET_SHIPPING_RATE, fnGetShippingRate);
  yield takeLatest(POST_CUSTOMER_REQUEST, fnPostCustomerRequest);
}
