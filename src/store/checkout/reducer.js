import {
  CLEAR_CHECKOUT,
  SET_TEMP_EMAIL,
  SET_SHIP_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_ORDER_ID,
  SET_ORDER_ITEMS,
} from "./types";

const initialState = {
  tempEmail: null,
  loading: true,
  data: [],
  error: null,
  errorMessage: null,
  shipMethod: null,
  shipAddressData: [],
  orderItemsData: [],
  orderID: null,
  paymentMethod: null,
};

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_EMAIL:
      return {
        ...state,
        loading: false,
        tempEmail: action.payload.email,
      };

    case SET_SHIP_ADDRESS:
      return {
        ...state,
        loading: false,
        shipMethod: action.payload.shipMethod,
        shipAddressData: action.payload.data,
      };

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        loading: false,
        paymentMethod: action.payload.paymentMethod,
      };

    case SET_ORDER_ID:
      return {
        ...state,
        loading: false,
        orderID: action.payload.orderID,
      };

    case SET_ORDER_ITEMS:
      return {
        ...state,
        loading: false,
        orderItemsData: action.payload.orderItemsData,
      };

    case CLEAR_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default checkout;
