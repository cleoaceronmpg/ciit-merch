import {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_CART,
  CLEAR_CART,
  APPLY_PROMO_CODE,
  APPLY_PROMO_CODE_SUCCESS,
  APPLY_PROMO_CODE_FAILED,
  CLEAR_PROMO_CODE,
} from "./types";

const INIT_STATE = {
  loading: true,
  data: [],
  error: false,
  errorMessage: null,
  promoCode: null,
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
          .filter((item) => item.uid !== action.payload.uid)
          .map((item) => item),
        error: false,
        errorMessage: null,
      };

    case APPLY_PROMO_CODE:
      return {
        ...state,
        loading: true,
      };

    case APPLY_PROMO_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        promoCode: action.payload,
        error: null,
        errorMessage: null,
      };

    case APPLY_PROMO_CODE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        promoCode: null,
      };

    case CLEAR_CART:
      return INIT_STATE;

    case CLEAR_PROMO_CODE:
      return {
        ...state,
        promoCode: null,
      };

    default:
      return state;
  }
};

export default cart;
