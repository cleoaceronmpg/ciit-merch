import {
  INITIAL_AUTHENTICATION,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SESSION_TIMEOUT,
  CLEAR_AUTH,
  REGISTER,
} from "./types";

const initialState = {
  authenticated: false,
  token: null,
  loading: true,
  data: [],
  error: null,
  errorMessage: null,
  tempUsers: [],
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        authenticated: true,
      };

    case REGISTER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        tempUsers: action.payload,
        error: null,
        errorMessage: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        data: action.payload,
        token: action.payload.token,
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
      return {
        ...state,
        error: null,
        authenticated: false,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        error: null,
        token: null,
        authenticated: false,
      };

    case API_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case SESSION_TIMEOUT:
      return {
        ...state,
        token: null,
        authenticated: false,
        error: true,
        errorMessage: action.payload,
      };

    case CLEAR_AUTH:
      return initialState;

    default:
      return state;
  }
};

export default authentication;
