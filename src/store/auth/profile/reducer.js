import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  RESET_PROFILE_FLAG,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  CLEAR_PROFILE,
  CLEAR_PROFILE_ERROR_MESSAGE,
} from "./types";

const initialState = {
  error: "",
  success: "",
  error: false,
  errorMessage: null,
  status: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        errorMessage: null,
        status: null,
      };
      break;
    case GET_PROFILE_FAILED:
      state = {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        status: action.status,
      };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
        isProfileSubmitted: true,
        message: action.payload.message,
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        isCommissionSubmitted: false,
      };
      break;
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null };
      break;
    case CLEAR_PROFILE:
      state = initialState;
      break;
    case CLEAR_PROFILE_ERROR_MESSAGE:
      state = {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
        status: null,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
