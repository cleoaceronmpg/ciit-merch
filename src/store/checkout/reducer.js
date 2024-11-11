import { CLEAR_CHECKOUT, SET_TEMP_EMAIL, SET_SHIP_ADDRESS } from "./types";

const initialState = {
  tempEmail: null,
  loading: true,
  data: [],
  error: null,
  errorMessage: null,
  shipMethod: null,
  shipAddressData: [],
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

    case CLEAR_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default checkout;
