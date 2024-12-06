import {
  INITIAL_AUTHENTICATION,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  CLEAR_AUTH,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./types";

const initialState = {
  authenticated: false,
  tempEmail: null,
  token:
    "patJGpjGYaObneFdv.381d678ff3bf3362781a22216ab012e96de813240dbbf2af9ec83c9eb12204a7",
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
