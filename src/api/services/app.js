import { ciitMerchApi } from "../../api";
class App {
  fnGetProducts = async () => {
    const response = await ciitMerchApi("Products").select().firstPage();

    if (response) {
      const fullProductsPromises = response.map(async (item) => {
        const colorIds = item.fields?.Colors || [];
        const sizesIds = item.fields?.Sizes || [];
        const categoryId = item.fields?.Categories || [];

        // Fetch the OrderItems details
        const colorPromises = colorIds.map((id) =>
          ciitMerchApi("Colors").find(id)
        );
        const sizesPromises = sizesIds.map((id) =>
          ciitMerchApi("Sizes").find(id)
        );
        const categoryPromises = categoryId.map((id) =>
          ciitMerchApi("Category").find(id)
        );

        const colorItems = await Promise.all(colorPromises);
        const sizeItems = await Promise.all(sizesPromises);
        const categoryItems = await Promise.all(categoryPromises);

        // Use a Set to ensure uniqueness
        const uniqueSizesSet = new Set();
        const uniqueColorsSet = new Set();

        const fullProductsDetails = {
          ...item.fields,
          Colors:
            !colorIds || colorIds.length === 0
              ? []
              : colorItems.reduce((acc, currentItem) => {
                  const color = currentItem.fields?.Color;
                  if (color && !uniqueColorsSet.has(color)) {
                    uniqueColorsSet.add(color);
                    acc.push(color);
                  }
                  return acc;
                }, []),
          Sizes:
            !sizesIds || sizesIds.length === 0
              ? []
              : sizeItems.reduce((acc, currentItem) => {
                  const size = currentItem.fields?.Size;
                  if (size && !uniqueSizesSet.has(size)) {
                    uniqueSizesSet.add(size);
                    acc.push(size);
                  }
                  return acc;
                }, []),
          VariantOptions:
            categoryItems.length > 0
              ? categoryItems[0]?.fields["Variants Option"]
              : "No",
          id: item.id,
        };

        return fullProductsDetails;
      });

      // Wait for all orders to be processed
      const fullProductsDetails = await Promise.all(fullProductsPromises);

      return fullProductsDetails;
    } else {
      throw "No Products available.";
    }
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
          return { ...item.fields, OrderItemsDetails: [] };
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

  fnGetRemainingStocks = async (values) => {
    const conditions = [];

    // for accessories, books, etc. remaining stocks
    if (
      values.recordId &&
      values.size === "No Size" &&
      values.color === "No Color"
    ) {
      conditions.push(`AND({Product IDs} = '${values.recordId}')`);
    } else {
      // Add conditions dynamically based on available values
      if (values.recordId && values.size && values.color) {
        conditions.push(
          `AND({Product IDs} = '${values.recordId}', {Size} = '${values.size}', {Colors} = '${values.color}')`
        );
      } else if (values.recordId && values.size) {
        conditions.push(
          `AND({Product IDs} = '${values.recordId}', {Size} = '${values.size}')`
        );
      } else if (values.recordId && values.color) {
        conditions.push(
          `AND({Product IDs} = '${values.recordId}', {Colors} = '${values.color}')`
        );
      }
    }

    // Construct the filter formula
    const filterByFormula =
      conditions.length > 1
        ? `OR(${conditions.join(",")})`
        : conditions[0] || "";

    return await ciitMerchApi("Sizes")
      .select({
        filterByFormula,
      })
      .firstPage();
  };

  fnGetShippingRate = async () => {
    return await ciitMerchApi("ShippingRate").select().firstPage();
  };

  fnPostCustomerRequest = async (payload) => {
    return await ciitMerchApi("Customer Requests").create(payload);
  };

  fnGetPromoCodeByCode = async (values) => {
    return await ciitMerchApi("PromoCodes")
      .select({
        filterByFormula: `AND({PromoCode} = '${values.promoCode}')`,
      })
      .firstPage();
  };
}

App.api = new App();

export default App;
