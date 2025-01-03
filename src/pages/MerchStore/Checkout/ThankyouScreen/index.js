import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../../store";
import { Button, Container } from "reactstrap";

//import Breadcrumbs
import Header from "../../../../components/MerchStore/Header";
import Footer from "../../../../components/MerchStore/Footer";
import "./styles.css";

const Thankyou = ({ app, ...props }) => {
  let navigate = useNavigate();
  const { previousCheckoutData } = app;
  const [totalItems, setTotalItems] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(null);
  const [urlParamData, setUrlParamData] = React.useState(null);

  React.useEffect(() => {
    const urlParams = getAllUrlParams();
    setUrlParamData(urlParams);

    previousCheckoutData?.orderItemsData &&
      computeSubTotalAndQty(previousCheckoutData.orderItemsData);
  }, [previousCheckoutData]);

  React.useEffect(() => {
    urlParamData && invalidUrlHandler();
  }, [urlParamData]);

  const computeSubTotalAndQty = async (data) => {
    const TotalAmount = data.reduce((acc, product) => {
      // Remove non-numeric characters from price and convert to number
      const numericPrice = parseFloat(product.Price.replace(/[^0-9.-]+/g, ""));
      // Add to accumulator: price * quantity
      return acc + numericPrice * product.Quantity;
    }, 0);
    setSubTotal(TotalAmount);
    const totalItems = data.reduce((acc, product) => {
      return acc + parseInt(product.Quantity);
    }, 0);

    setTotalItems(totalItems);
    clearCart();
  };

  // Get all URL parameters
  const getAllUrlParams = () => {
    const params = new URLSearchParams(window.location.search); // Access the query string
    const paramObject = {};

    // Iterate through each parameter and store it in an object
    params.forEach((value, key) => {
      paramObject[key] = value;
    });

    return paramObject; // Return the object with all parameters
  };

  const clearCart = async () => {
    await props.actionCreator({
      type: types.CLEAR_CART,
    });
  };

  const invalidUrlHandler = () => {
    if (!urlParamData?.digest) {
      navigate("/home");
    }
  };

  //meta title
  document.title = "CIIT Merch | Thank you";

  return (
    <React.Fragment>
      <Header />

      <Container>
        {urlParamData?.digest && (
          <div
            style={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {previousCheckoutData ? (
              <div className="thank-you__page">
                <div>
                  <div className="thank-banner">
                    <div className="thank-banner__check-icon">
                      <i className="fa fa-fw fa-check-circle" />
                    </div>
                    <div className="thank-banner__details">
                      <div className="thank-banner__order-reference">
                        <h5>Order Reference #:</h5>
                        <h5>{urlParamData?.refno}</h5>
                      </div>
                      <div className="thank-banner__transaction-number">
                        <h5>Transaction #:</h5>
                        <h5>{urlParamData?.txnid}</h5>
                      </div>
                      <div>
                        <h5>
                          Please check your email for the pickup details and
                          schedule. Thank you.
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="customer-info">
                    <div className="customer-info__row">
                      <div className="customer-info__contacts">
                        <div>
                          <h3>Contact information</h3>
                        </div>
                        {previousCheckoutData.shipMethod === "For Pickup" && (
                          <div className="text-textSubdued">
                            {previousCheckoutData.shipAddressData[0]?.fullName}
                          </div>
                        )}
                        <div className="text-textSubdued">
                          {previousCheckoutData.tempEmail}
                        </div>
                      </div>
                      <div className="customer-info__ship-method">
                        <div>
                          {previousCheckoutData.shipMethod === "For Pickup" ? (
                            <h3>For Pickup Address</h3>
                          ) : (
                            <h3>Shipping Address</h3>
                          )}
                        </div>
                        <div className="text-textSubdued">
                          {previousCheckoutData.shipMethod === "For Pickup" ? (
                            <div className="address__summary">
                              <div className="full-name">
                                Seoulful Sweets Store
                              </div>
                              <div className="address-one">
                                {
                                  previousCheckoutData.shipAddressData[0]
                                    .address
                                }
                              </div>
                              <div className="telephone">09153255438</div>
                            </div>
                          ) : (
                            <div className="address__summary">
                              <div className="full-name">
                                {
                                  previousCheckoutData.shipAddressData[0]
                                    ?.fullName
                                }
                              </div>
                              <div className="address-one">
                                {
                                  previousCheckoutData.shipAddressData[0]
                                    .address
                                }
                              </div>
                              <div className="city-province-postcode">
                                <div>
                                  {
                                    previousCheckoutData.shipAddressData[0]
                                      .postalCode
                                  }
                                  ,{" "}
                                  {previousCheckoutData.shipAddressData[0].city}
                                </div>
                                <div>
                                  <span>
                                    {
                                      previousCheckoutData.shipAddressData[0]
                                        .city
                                    }
                                    ,{" "}
                                  </span>{" "}
                                  <span>
                                    {
                                      previousCheckoutData.shipAddressData[0]
                                        .country
                                    }
                                  </span>
                                </div>
                              </div>
                              <div className="telephone">
                                {
                                  previousCheckoutData.shipAddressData[0]
                                    .telephone
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="customer-info__row">
                      <div className="customer-info__payment-method">
                        <div>
                          <h3>Payment Method</h3>
                        </div>
                        <div className="text-textSubdued">
                          {previousCheckoutData.paymentMethod
                            .charAt(0)
                            .toUpperCase() +
                            previousCheckoutData.paymentMethod.slice(1)}
                        </div>
                      </div>
                      <div className="customer-info__billing-address">
                        <div>
                          <h3>Billing Address</h3>
                        </div>
                        <div className="text-textSubdued">
                          <div className="address__summary">
                            <div className="full-name">
                              {previousCheckoutData.tempEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="thanks-details__continue-shopping btn btn-primary w-100 waves-effect waves-light"
                      type="button"
                      style={{
                        backgroundColor: "#ff5400",
                        borderColor: "#ff5400",
                      }}
                      color="primary"
                      onClick={() => {
                        navigate("/home");
                      }}
                    >
                      <span>CONTINUE SHOPPING</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="thank-details h-full hidden md:block">
                    <div id="thank-details__items">
                      {previousCheckoutData.orderItemsData.map(
                        (item, index) => (
                          <div className="thank-details__item" key={index}>
                            <div className="thank-details__product-details">
                              <div className="thank-details__product-image">
                                <img
                                  src={item.Images[0].url}
                                  alt={item["Product Name"]}
                                  height={58}
                                  width={58}
                                />
                              </div>
                              <div className="thank-details__product-info">
                                <div className="thank-details__product-name">
                                  <h5>{item["Product Name"]}</h5>
                                </div>
                                {item.Size ||
                                  (item.color && (
                                    <div>
                                      <ul
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                          listStyle: "none",
                                        }}
                                      >
                                        {item.Size && (
                                          <li>
                                            <span className="attribute-name">
                                              Color:{" "}
                                            </span>
                                            <span>{item.Size}</span>
                                          </li>
                                        )}
                                        {item.color && (
                                          <li>
                                            <span className="attribute-name">
                                              Color:{" "}
                                            </span>
                                            <span>{item.color}</span>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                  ))}
                                <div className="thank-details__quantity">
                                  <h6>Quantity: {item.Quantity}</h6>
                                </div>
                              </div>
                            </div>
                            <div className="thank-details__product-total">
                              <h5>
                                ₱{" "}
                                {item?.TotalAmount
                                  ? parseFloat(item.TotalAmount).toFixed(2)
                                  : parseFloat(item.Price).toFixed(2)}
                              </h5>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="thank-details-block">
                      <div className="thank-details-block__total-items">
                        <h5>Total Items</h5>
                        <h5>{totalItems} item(s)</h5>
                      </div>
                      <div className="thank-details-block__subtotal">
                        <h5>Shipping</h5>
                        <h5>{previousCheckoutData.shipMethod}</h5>
                      </div>
                      <div className="thank-details-block__subtotal">
                        <h5>Subtotal</h5>
                        <h5>₱ {parseFloat(subTotal).toFixed(2)}</h5>
                      </div>
                      <div className="thank-details-block__total">
                        <h5>Total</h5>
                        <h5>₱ {parseFloat(subTotal).toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: 500,
                }}
              >
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: "1rem",
                  }}
                >
                  No available Data
                  <br />
                  <br />
                  Please check your email for the pickup details and schedule.
                </span>
                <br />

                <br />
                <h3
                  style={{
                    fontWeight: "inherit",
                  }}
                >
                  Thank You!
                </h3>
              </div>
            )}
          </div>
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app }) => ({
  app,
});

export default connect(mapStateToProps, { actionCreator })(Thankyou);
