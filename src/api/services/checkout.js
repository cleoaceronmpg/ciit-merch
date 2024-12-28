import { ciitMerchApi } from "../../api";

class Checkout {
  fnPostPlaceOrderItems = async (payload) => {
    return await ciitMerchApi("OrderItems").create(payload);
  };

  fnPostPlaceOrder = async (payload) => {
    return await ciitMerchApi("Orders").create(payload);
  };
}

Checkout.api = new Checkout();

export default Checkout;
