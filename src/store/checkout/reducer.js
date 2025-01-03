import {
  CLEAR_CHECKOUT,
  SET_TEMP_EMAIL,
  SET_SHIP_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_ORDER_ID,
  SET_ORDER_ITEMS,
  SET_ORDER_NOTES,
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_SUCCESS,
  PLACE_ORDER_ITEMS_FAILED,
  SET_TOTAL_AMOUNT,
} from "./types";

const initialState = {
  tempEmail: null,
  loading: false,
  data: [],
  error: null,
  errorMessage: null,
  shipMethod: null,
  shipAddressData: [],
  orderItemsData: [],
  orderID: null,
  paymentMethod: "dragonpay",
  notesToOrders: null,
  totalAmount: null,
  placedOrderItemsData: [],
};

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_EMAIL:
      return {
        ...state,
        tempEmail: action.payload.email,
      };

    case SET_SHIP_ADDRESS:
      return {
        ...state,
        shipMethod: action.payload.shipMethod,
        shipAddressData: action.payload.data,
      };

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload.paymentMethod,
      };

    case SET_ORDER_ID:
      return {
        ...state,
        orderID: action.payload.orderID,
      };

    case SET_ORDER_ITEMS:
      return {
        ...state,
        orderItemsData: action.payload.orderItemsData,
      };

    case SET_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload,
      };

    case SET_ORDER_NOTES:
      return {
        ...state,
        notesToOrders: action.payload,
      };

    case PLACE_ORDER:
      return {
        ...state,
        loading: true,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        errorMessage: null,
      };

    case PLACE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        data: [],
      };

    case PLACE_ORDER_ITEMS:
      return {
        ...state,
        loading: true,
      };

    case PLACE_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        placedOrderItemsData: action.payload,
        error: null,
        errorMessage: null,
      };

    case PLACE_ORDER_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        placedOrderItemsData: [],
      };

    case CLEAR_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default checkout;
