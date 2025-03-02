import { call, put, takeLatest } from "redux-saga/effects";

import {
  APPLY_PROMO_CODE,
  APPLY_PROMO_CODE_SUCCESS,
  APPLY_PROMO_CODE_FAILED,
} from "./types";

import appServices from "../../api/services/app";

function* fnApplyPromoCode({ payload }) {
  try {
    const response = yield call(appServices.api.fnGetPromoCodeByCode, payload);

    const newdata = response.map((item) => ({ ...item.fields, id: item.id }));

    if (!newdata[0]?.id) {
      throw "Promo code is not valid.";
    }

    if (newdata[0]["Is Used"] === "Yes") {
      throw "Promo code is already used.";
    }

    yield put({
      type: APPLY_PROMO_CODE_SUCCESS,
      payload: newdata[0],
    });
  } catch (error) {
    yield put({
      type: APPLY_PROMO_CODE_FAILED,
      payload: error,
    });
  }
}

export default function* watcher() {
  yield takeLatest(APPLY_PROMO_CODE, fnApplyPromoCode);
}
