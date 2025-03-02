import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import LayoutSaga from "./layout/saga";
import authenticationSaga from "./authentication/saga";
import appSaga from "./app/saga";
import checkoutSaga from "./checkout/saga";
import profileSaga from "./profile/saga";
import cartSaga from "./cart/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(appSaga),
    fork(cartSaga),
    fork(checkoutSaga),
    fork(AccountSaga),
    fork(authenticationSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(LayoutSaga),
    fork(profileSaga),
  ]);
}
