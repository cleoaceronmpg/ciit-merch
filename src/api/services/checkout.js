import { ciitMerchApi } from "../../api";

class Checkout {
  fnPostCheckout = async (payload) => {
    return await ciitMerchApi("Orders").create(payload);
  };
}

Checkout.api = new Checkout();

export default Checkout;
