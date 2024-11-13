import {
  GET_MENU_SUCCESS,
  GET_MENU_FAILED,
  CLEAR_MENU,
  GET_SELECTED_WORKSHOP_SUCCESS,
  GET_SELECTED_WORKSHOP_FAILED,
  WORKSHOP_OPTIONS_SUCCESS,
  WORKSHOP_OPTIONS_FAILED,
  CAMP_OPTIONS_SUCCESS,
  CAMP_OPTIONS_FAILED,
  UNIT_OPTIONS_SUCCESS,
  UNIT_OPTIONS_FAILED,
  EQUIPMENT_PART_OPTIONS,
  EQUIPMENT_PART_OPTIONS_SUCCESS,
  EQUIPMENT_PART_OPTIONS_FAILED
} from "./types";

const INITIAL_STATE = {
  loading: true,
  data: [],
  selectedWorkshopData: [],
  workshopOptions: [],
  campOptions: [],
  unitOptions: [],
  equipmentPartOptions: [],
  error: null,
  errorMessage: null,
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.menu,
        error: null,
        errorMessage: null,
      };

    case GET_MENU_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      };

    case CLEAR_MENU:
      return INITIAL_STATE;

    case GET_SELECTED_WORKSHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedWorkshopData: action.payload,
        error: null,
        errorMessage: null,
      };

    case GET_SELECTED_WORKSHOP_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };

    case WORKSHOP_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        workshopOptions: action.payload,
        error: null,
        errorMessage: null,
      };

    case WORKSHOP_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };

    case CAMP_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        campOptions: action.payload,
        error: null,
        errorMessage: null,
      };

    case CAMP_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };

    case UNIT_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        unitOptions: action.payload,
        error: null,
        errorMessage: null,
      };

    case UNIT_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };
    case EQUIPMENT_PART_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        equipmentPartOptions: action.payload,
        error: null,
        errorMessage: null,
      };

    case EQUIPMENT_PART_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export default app;
