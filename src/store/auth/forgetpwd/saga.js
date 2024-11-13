import { takeEvery, takeLatest, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_ERROR } from "./types"

import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper"

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(postFakeForgetPwd, "/fake-forget-pwd", {
      email: user.email,
    })
    if (response) {
      yield put({
        type: FORGET_PASSWORD_SUCCESS,
        payload: { data: "Reset link are sended to your mailbox, check there first"},
      });
    }
  } catch (error) {
    yield put({
      type: FORGET_PASSWORD_ERROR,
      payload: { error },
    });
  }
}

export function* watchUserPasswordForget() {
  yield takeLatest(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
