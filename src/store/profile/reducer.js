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
  CLEAR_USER_PROFILE,
} from "./types";

const INIT_STATE = {
  loading: false,
  data: [],
  error: false,
  errorMessage: null,
  successMessage: null,
};

const profile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return {
        ...state,
        loading: true,
      };

    case GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        errorMessage: null,
      };

    case GET_PROFILE_INFO_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
        errorMessage: action.payload,
      };

    case POST_UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case POST_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };

    case POST_UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
        errorMessage: action.payload,
      };

    case POST_UPDATE_SHIPPING_ADDRESS:
      return {
        ...state,
        loading: true,
      };

    case POST_UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };

    case POST_UPDATE_SHIPPING_ADDRESS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };

    case CLEAR_USER_PROFILE:
      return INIT_STATE;

    default:
      return state;
  }
};

export default profile;
