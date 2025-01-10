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
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILED,
  GET_REMAINING_STOCKS,
  GET_REMAINING_STOCKS_SUCCESS,
  GET_REMAINING_STOCKS_FAILED,
  GET_SHIPPING_RATE,
  GET_SHIPPING_RATE_SUCCESS,
  GET_SHIPPING_RATE_FAILED,
  POST_CUSTOMER_REQUEST,
  POST_CUSTOMER_REQUEST_SUCCESS,
  POST_CUSTOMER_REQUEST_FAILED,
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
  searchData: [],
  selectedProductRemainingStock: null,
  shippingRate: [],
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

    case SEARCH_PRODUCTS:
      return {
        ...state,
        loading: false,
      };

    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchData: action.payload.searchData,
        error: null,
        errorMessage: null,
      };

    case SEARCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
        searchData: [],
      };

    case GET_REMAINING_STOCKS:
      return {
        ...state,
        loading: false,
      };

    case GET_REMAINING_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProductRemainingStock: action.payload.remainingStocks,
        error: null,
        errorMessage: null,
      };

    case GET_REMAINING_STOCKS_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
        selectedProductRemainingStock: [],
      };

    case GET_SHIPPING_RATE:
      return {
        ...state,
        loading: false,
      };

    case GET_SHIPPING_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingRate: action.payload.shippingRate,
        error: null,
        errorMessage: null,
      };

    case GET_SHIPPING_RATE_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
        shippingRate: [],
      };

    case POST_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_CUSTOMER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        errorMessage: null,
      };

    case POST_CUSTOMER_REQUEST_FAILED:
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
