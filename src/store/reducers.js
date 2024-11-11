import { combineReducers } from "redux";

// Front
import layout from "./layout/reducer";

// Authentication
import login from "./auth/login/reducer";
import account from "./auth/register/reducer";
import forgetPassword from "./auth/forgetpwd/reducer";
import profile from "./auth/profile/reducer";
import authentication from "./authentication/reducer";
import cart from "./cart/reducer";

const rootReducer = combineReducers({
  // public
  layout,
  login,
  account,
  forgetPassword,
  profile,
  authentication,
  cart,
});

export default rootReducer;
