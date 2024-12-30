import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_CAMPAIGN,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_FAILED,
  SET_PREVIOUS_CHECKOUT,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILED,
} from "./types";

const INITIAL_STATE = {
  loading: true,
  data: [],
  error: null,
  errorMessage: null,
  products: [],
  campaignData: [],
  previousCheckoutData: null,
  orderHistoryData: [],
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return {
        ...state,
        loading: false,
      };

    case GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        orderHistoryData: action.payload.orderHistory,
        error: null,
        errorMessage: null,
      };

    case GET_ORDER_HISTORY_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
        orderHistoryData: [],
      };

    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        error: null,
        errorMessage: null,
      };

    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      };

    case GET_CAMPAIGN:
      return {
        ...state,
        loading: false,
      };

    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignData: action.payload.campaign,
        error: null,
        errorMessage: null,
      };

    case GET_CAMPAIGN_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      };

    case SET_PREVIOUS_CHECKOUT:
      return {
        ...state,
        previousCheckoutData: action.payload,
      };
    default:
      return state;
  }
};

export default app;
