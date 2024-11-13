import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILED,
  GET_SELECTED_WORKSHOP,
  GET_SELECTED_WORKSHOP_SUCCESS,
  GET_SELECTED_WORKSHOP_FAILED,
  WORKSHOP_OPTIONS,
  WORKSHOP_OPTIONS_SUCCESS,
  WORKSHOP_OPTIONS_FAILED,
  CAMP_OPTIONS,
  CAMP_OPTIONS_SUCCESS,
  CAMP_OPTIONS_FAILED,
  UNIT_OPTIONS,
  UNIT_OPTIONS_SUCCESS,
  UNIT_OPTIONS_FAILED,
  EQUIPMENT_PART_OPTIONS,
  EQUIPMENT_PART_OPTIONS_SUCCESS,
  EQUIPMENT_PART_OPTIONS_FAILED,
} from "./types";

import appServices from "../../api/services/app";

export function* fnGetMenus() {
  try {
    const data = yield call(appServices.api.fnGetMenus);
    if (data) {
      yield put({
        type: GET_MENU_SUCCESS,
        payload: { menu: data.data.data.result },
      });
    }
  } catch (error) {
    yield put({
      type: GET_MENU_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}

export function* fnGetSelectedWorkshop() {
  try {
    const data = yield call(appServices.api.fnGetSelectedWorkshop);
    if (data) {
      yield put({
        type: GET_SELECTED_WORKSHOP_SUCCESS,
        payload: data.data.result,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SELECTED_WORKSHOP_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}

export function* fnWorkshopOtions() {
  try {
    const data = yield call(appServices.api.fnGetWorkshopOptions);
    if (data) {
      yield put({
        type: WORKSHOP_OPTIONS_SUCCESS,
        payload: [...data.data.result],
      });
    }
  } catch (error) {
    yield put({
      type: WORKSHOP_OPTIONS_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}

export function* fnCampOtions() {
  try {
    const data = yield call(appServices.api.fnGetCampOptions);
    if (data) {
      yield put({
        type: CAMP_OPTIONS_SUCCESS,
        payload: [...data.data.result],
      });
    }
  } catch (error) {
    yield put({
      type: CAMP_OPTIONS_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}

export function* fnUnitOtions() {
  try {
    const data = yield call(appServices.api.fnGetUnitOptions);
    if (data) {
      yield put({
        type: UNIT_OPTIONS_SUCCESS,
        payload: [...data.data.result ],
      });
    }
  } catch (error) {
    yield put({
      type: UNIT_OPTIONS_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}

export function* fnEquipmentPartOtions({ payload }) {
  try {
    const data = yield call(appServices.api.fnEquipmentPartOtions, payload);
    if (data) {
      yield put({
        type: EQUIPMENT_PART_OPTIONS_SUCCESS,
        payload: data.data.result,
      });
    }
  } catch (error) {
    yield put({
      type: EQUIPMENT_PART_OPTIONS_FAILED,
      payload: error.response?.data ? error.response?.data.message : "",
    });
  }
}


export default function* watcher() {
  yield takeLatest(GET_MENU, fnGetMenus);
  yield takeLatest(GET_SELECTED_WORKSHOP, fnGetSelectedWorkshop);
  yield takeLatest(WORKSHOP_OPTIONS, fnWorkshopOtions);
  yield takeLatest(CAMP_OPTIONS, fnCampOtions);
  yield takeLatest(UNIT_OPTIONS, fnUnitOtions);
  yield takeLatest(EQUIPMENT_PART_OPTIONS, fnEquipmentPartOtions);
}
