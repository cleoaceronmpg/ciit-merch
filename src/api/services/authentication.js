import { ciitMerchApi } from "..";

class Authentication {
  fnPostLogin = async (payload) => {
    return await ciitMerchApi("Users")
      .select({
        filterByFormula: `AND({Email} = '${payload.email}', {Password} = '${payload.password}')`,
        maxRecords: 1,
      })
      .firstPage();
  };

  fnPostRegister = async (payload) => {
    return await ciitMerchApi("Users").create(payload);
  };
}

Authentication.api = new Authentication();
export default Authentication;
