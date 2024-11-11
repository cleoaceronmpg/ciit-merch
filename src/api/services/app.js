import { ciitMerchApi } from "../../api";
import { CHECK_OUT_SERVICE, USER_SERVICE } from "../../api/constants";

class App {
  fnPostLogin = async (payload) => {
    return await ciitMerchApi.post(USER_SERVICE.login, payload);
  };

  fnPostRegister = async (payload) => {
    return await ciitMerchApi.post(USER_SERVICE.register, payload);
  };

  fnPostCheckout = async (payload) => {
    return await ciitMerchApi.post(CHECK_OUT_SERVICE.CHECKOUT, payload);
  };
}

App.api = new App();

export default App;
