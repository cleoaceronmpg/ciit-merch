import {
  takeEvery,
  takeLatest,
  fork,
  put,
  all,
  call,
} from "redux-saga/effects";

// Login Redux States
import {
  EDIT_PROFILE,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
} from "./types";

import profileServices from "../../../api/services/profile";

function* fnGetProfile() {
  try {
    const data = yield call(profileServices.api.fnGetProfile);
    yield put({
      type: GET_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    yield put({
      type: GET_PROFILE_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
      status: error.response?.status,
    });
  }
}

function* editProfile({ payload }) {
  try {
    const result = yield call(profileServices.api.fneditProfile, payload);

    if (result) {
      yield put({
        type: PROFILE_SUCCESS,
        payload: { message: result.data.message },
      });
      yield put({
        type: GET_PROFILE,
      });
    }
  } catch (error) {
    yield put({
      type: PROFILE_ERROR,
      payload: error.response?.data ? error.response?.data.message : "",
      status: error.response?.status,
    });
  }
}

export function* watchProfile() {
  yield takeLatest(GET_PROFILE, fnGetProfile);
  yield takeLatest(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
