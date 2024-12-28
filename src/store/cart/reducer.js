import { ADD_TO_CART, UPDATE_CART, REMOVE_CART, CLEAR_CART } from "./types";

const INIT_STATE = {
  loading: true,
  data: [],
  error: false,
  errorMessage: null,
};

const cart = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
        error: false,
        errorMessage: null,
      };

    case UPDATE_CART:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        errorMessage: null,
      };

    case REMOVE_CART:
      return {
        ...state,
        loading: false,
        data: state.data
          .filter((item) => item["Product ID"] !== action.payload.id)
          .map((item) => item),
        error: false,
        errorMessage: null,
      };

    case CLEAR_CART:
      return INIT_STATE;

    default:
      return state;
  }
};

export default cart;
