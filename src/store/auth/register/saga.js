import { takeEvery, takeLatest, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER, REGISTER_USER_SUCCESSFUL } from "./types"

import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(postFakeRegister, user)

    yield put({
      type: REGISTER_USER_SUCCESSFUL,
      payload: { data: response.data },
    });
  } catch (error) {
    yield put({
      type: REGISTER_USER_SUCCESSFUL,
      payload: { error },
    });
  }
}

export function* watchUserRegister() {
  yield takeLatest(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
