import { ciitMerchApi } from "..";

class Authentication {
  fnPostLogin = async (payload) => {
    return await ciitMerchApi("Users")
      .select({
        filterByFormula: `AND({Email} = '${payload.email}')`,
        maxRecords: 1,
      })
      .firstPage();
  };

  fnPostRegister = async (payload) => {
    return await ciitMerchApi("Users").create(payload);
  };

  fnPostVerifyAccountViaToken = async (payload) => {
    return await ciitMerchApi("Users")
      .select({
        filterByFormula: `AND({Token} = '${encodeURIComponent(payload.token)}', {EmailVerified} = 'false')`,
        maxRecords: 1,
      })
      .firstPage();
  };

  fnUpdateVerifiedAccount = async (values) => {
    return await ciitMerchApi("Users").update(values.id, {
      EmailVerified: "true",
    });
  };
}

Authentication.api = new Authentication();
export default Authentication;
