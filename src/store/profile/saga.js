import { call, put, takeLatest } from "redux-saga/effects";

import {
  GET_PROFILE_INFO,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILED,
  POST_UPDATE_PROFILE,
  POST_UPDATE_PROFILE_SUCCESS,
  POST_UPDATE_PROFILE_FAILED,
  POST_UPDATE_SHIPPING_ADDRESS,
  POST_UPDATE_SHIPPING_ADDRESS_SUCCESS,
  POST_UPDATE_SHIPPING_ADDRESS_FAILED,
} from "./types";

import profileServices from "../../api/services/profile";

function* fnGetProfileDetails({ payload }) {
  try {
    const response = yield call(
      profileServices.api.fnGetProfileDetails,
      payload
    );

    if (response) {
      yield put({
        type: GET_PROFILE_INFO_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: GET_PROFILE_INFO_FAILED,
      payload: error,
    });
  }
}

function* fnUpdateProfile({ payload }) {
  try {
    const response = yield call(profileServices.api.fnUpdateProfile, payload);

    if (response) {
      yield put({
        type: POST_UPDATE_PROFILE_SUCCESS,
        payload: {
          data: response,
          message: "Your Profile Info is successfully updated.",
        },
      });
    }
  } catch (error) {
    yield put({
      type: POST_UPDATE_PROFILE_FAILED,
      payload: error,
    });
  }
}

function* fnUpdateShippingAddress({ payload }) {
  try {
    const response = yield call(
      profileServices.api.fnUpdateShippingAddress,
      payload
    );

    if (response) {
      yield put({
        type: POST_UPDATE_SHIPPING_ADDRESS_SUCCESS,
        payload: {
          data: response,
          message: "Your Shipping Address is successfully updated.",
        },
      });
    }
  } catch (error) {
    yield put({
      type: POST_UPDATE_SHIPPING_ADDRESS_FAILED,
      payload: error,
    });
  }
}

export default function* watcher() {
  yield takeLatest(POST_UPDATE_PROFILE, fnUpdateProfile);
  yield takeLatest(GET_PROFILE_INFO, fnGetProfileDetails);
  yield takeLatest(POST_UPDATE_SHIPPING_ADDRESS, fnUpdateShippingAddress);
}
