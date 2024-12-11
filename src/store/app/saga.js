import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_CAMPAIGN,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_FAILED,
} from "./types";

import appServices from "../../api/services/app";

export function* fnGetProducts() {
  try {
    const response = yield call(appServices.api.fnGetProducts);

    if (response) {
      const newdata = response.map((item) => item.fields);

      yield put({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products: newdata },
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

export default function* watcher() {
  yield takeLatest(GET_PRODUCTS, fnGetProducts);
  yield takeLatest(GET_CAMPAIGN, fnGetCampaign);
}
