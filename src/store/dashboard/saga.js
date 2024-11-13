import { call, put, takeLatest, all, fork } from "redux-saga/effects";

import {
  GET_SCHEDULE_PER_WEEK,
  GET_SCHEDULE_PER_WEEK_SUCCESS,
  GET_SCHEDULE_PER_WEEK_FAILED,
  GET_GAUGES,
  GET_GAUGES_SUCCESS,
  GET_GAUGES_FAILED,
} from "./types";

import dashboardServices from "../../api/services/dashboard";

function* fnGetWorkerSchedulePerWeek({ payload }) {
  try {
    const data = yield call(
      dashboardServices.api.fnGetWorkerSchedulePerWeek,
      payload
    );
    yield put({
      type: GET_SCHEDULE_PER_WEEK_SUCCESS,
      payload: [...data.data.result],
    });
  } catch (error) {
    yield put({
      type: GET_SCHEDULE_PER_WEEK_FAILED,
      payload: error.response.data ? error.response.data.message : "",
    });
  }
}

function* fnGetGaugesList() {
  try {
    const data = yield call(dashboardServices.api.fnGetGaugesList);
    yield put({
      type: GET_GAUGES_SUCCESS,
      payload: [...data.data.result],
    });
  } catch (error) {
    yield put({
      type: GET_GAUGES_FAILED,
      payload: error.response.data ? error.response.data.message : "",
    });
  }
}

export function* watchGetSerialLogsData() {
  yield takeLatest(GET_SCHEDULE_PER_WEEK, fnGetWorkerSchedulePerWeek);
  yield takeLatest(GET_GAUGES, fnGetGaugesList);
}

function* dashboardSaga() {
  yield all([fork(watchGetSerialLogsData)]);
}

export default dashboardSaga;
