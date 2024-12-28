import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import authenticationSaga from "./authentication/saga";
import appSaga from "./app/saga";
import checkoutSaga from "./checkout/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(appSaga),
    fork(checkoutSaga),
    fork(AccountSaga),
    fork(authenticationSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
  ]);
}
