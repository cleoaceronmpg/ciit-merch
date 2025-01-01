import { ciitMerchApi } from "../../api";
class App {
  fnGetProducts = async () => {
    return await ciitMerchApi("Products").select().firstPage();
  };

  fnGetCampaign = async () => {
    return await ciitMerchApi("Campaign").select().firstPage();
  };

  fnGetOrderHistory = async (values) => {
    const response = await ciitMerchApi("Orders")
      .select({
        filterByFormula: `AND({CustomerEmail} = '${values.email}')`,
      })
      .firstPage();

    if (response) {
      const fullOrderDetailsPromises = response.map(async (item) => {
        const orderItemIds = item.fields.OrderItems;

        if (!orderItemIds || orderItemIds.length === 0) {
          console.log("No OrderItems found for this order.");
          return { ...item.fields, OrderItemsDetails: [] };
          return;
        }

        // Fetch the OrderItems details
        const orderItemsPromises = orderItemIds.map((id) =>
          ciitMerchApi("OrderItems").find(id)
        );

        const orderItems = await Promise.all(orderItemsPromises);

        // Combine order and order items data
        const fullOrderDetails = {
          ...item.fields,
          OrderItemsDetails: orderItems.map((item) => item.fields),
          id: item.id,
        };

        return fullOrderDetails;
      });

      // Wait for all orders to be processed
      const fullOrderDetails = await Promise.all(fullOrderDetailsPromises);

      return fullOrderDetails;
    } else {
      throw "No Order History";
    }
  };

  fnGetOrderItemsHistory = async (id) => {
    return await ciitMerchApi("OrderItems").find(id);
  };

  fnSearchProducts = async (search) => {
    return await ciitMerchApi("Products")
      .select({
        filterByFormula: `SEARCH("${search}", ARRAYJOIN({Tags}, ","))`,
      })
      .firstPage();
  };
}

App.api = new App();

export default App;
