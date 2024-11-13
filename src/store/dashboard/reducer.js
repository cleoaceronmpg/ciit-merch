import {
  GET_SCHEDULE_PER_WEEK,
  GET_SCHEDULE_PER_WEEK_SUCCESS,
  GET_SCHEDULE_PER_WEEK_FAILED,
  GET_GAUGES_SUCCESS,
  GET_GAUGES_FAILED,
} from "./types";

const INIT_STATE = {
  loading: true,
  data: [],
  error: false,
  errorMessage: null,
  gaugesData: [],
};

const dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULE_PER_WEEK:
      return {
        ...state,
        loading: true,
      };

    case GET_SCHEDULE_PER_WEEK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        errorMessage: null,
      };

    case GET_SCHEDULE_PER_WEEK_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
        errorMessage: action.payload,
      };

    case GET_GAUGES_SUCCESS:
      return {
        ...state,
        loading: false,
        gaugesData: action.payload,
        error: false,
        errorMessage: null,
      };

    case GET_GAUGES_FAILED:
      return {
        ...state,
        loading: false,
        gaugesData: [],
        error: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default dashboard;
