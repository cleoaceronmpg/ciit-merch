import { combineReducers } from "redux";

// Front
import layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import authentication from "./authentication/reducer";
import cart from "./cart/reducer";
import checkout from "./checkout/reducer";
import app from "./app/reducer";
import profile from "./profile/reducer";

const rootReducer = combineReducers({
  app,
  layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  authentication,
  cart,
  checkout,
  profile,
});

export default rootReducer;
