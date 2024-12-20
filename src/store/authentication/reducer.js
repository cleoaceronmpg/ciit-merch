import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
  API_ERROR,
  CLEAR_AUTH,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./types";

const initialState = {
  authenticated: false,
  tempEmail: null,
  token: null,
  loading: false,
  data: [],
  error: null,
  errorMessage: null,
  tempUsers: [],
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case REGISTER:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        data: action.payload,
        error: null,
        errorMessage: null,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        tempUsers: [],
        loading: false,
        authenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        data: action.payload,
        // token: action.payload.token,
        error: null,
        errorMessage: null,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        loading: false,
        authenticated: false,
      };

    case LOGOUT_USER:
      return initialState;

    case API_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case CLEAR_AUTH:
      return initialState;

    default:
      return state;
  }
};

export default authentication;
