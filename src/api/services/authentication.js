import { ciitMerchApi } from "..";
import { USER_SERVICE } from "../constants";

class Authentication {
  fnPostLogin = async (payload) => {
    return await ciitMerchApi.get(`${USER_SERVICE.login}${payload.email}`);
  };

  fnPostRegister = async (payload) => {
    return await ciitMerchApi.post(USER_SERVICE.register, payload);
  };
}

Authentication.api = new Authentication();
export default Authentication;
