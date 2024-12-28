import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../../store";
import { Button, Container } from "reactstrap";

//import Breadcrumbs
import Header from "../../../../components/MerchStore/Header";
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

  //meta title
  document.title = "CIIT Merch | Thank you";

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container>
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
              <>
                <div>
                  <div
                    className="thank-you flex justify-start space-x-8"
                    style={{
                      width: "100%",
                      margin: 5,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <div
                      className="check flex justify-center self-center text-interactive"
                      style={{
                        marginRight: 20,
                      }}
                    >
                      <svg
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span
                        style={{
                          fontWeight: 300,
                          fontSize: "1rem",
                        }}
                      >
                        Order Referrence #{urlParamData?.refno}
                        <br />
                        <br />
                        Transaction #: {urlParamData?.txnid}
                        <br />
                        <br />
                        Please check your email for the pickup details and
                        schedule.
                      </span>

                      <h3
                        style={{
                          fontWeight: "inherit",
                        }}
                      >
                        Thank You!
                      </h3>
                    </div>
                  </div>
                  <div
                    className="customer-info mt-12 mb-8"
                    style={{
                      marginRight: 15,
                    }}
                  >
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <div className="mb-3">
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
                      <div>
                        <div className="mb-3">
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
                      <div>
                        <div className="mb-3">
                          <h3>Payment Method</h3>
                        </div>
                        <div className="text-textSubdued">
                          {previousCheckoutData.paymentMethod
                            .charAt(0)
                            .toUpperCase() +
                            previousCheckoutData.paymentMethod.slice(1)}
                        </div>
                      </div>
                      <div>
                        <div className="mb-3">
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
                  <Button
                    className="btn btn-primary w-100 waves-effect waves-light"
                    type="button"
                    style={{
                      backgroundColor: "#ff5400",
                      borderColor: "#ff5400",
                      maxWidth: "50%",
                    }}
                    color="primary"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    <span>CONTINUE SHOPPING</span>
                  </Button>
                </div>

                <div style={{ width: "50%", margin: 5 }}>
                  <div className="checkout-summary h-full hidden md:block">
                    <div id="summary-items">
                      <table className="listing items-table">
                        <tbody>
                          {previousCheckoutData.orderItemsData.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="product-thumbnail">
                                    <div className="thumbnail">
                                      {item.Images.length > 0 && (
                                        <img
                                          src={item.Images[0].url}
                                          alt={item.title}
                                          height={58}
                                          width={58}
                                        />
                                      )}
                                    </div>
                                    <span className="qty">{item.Quantity}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="product-column">
                                    <div>
                                      <span style={{ fontWeight: 600 }}>
                                        {item.title}
                                      </span>
                                    </div>
                                    <div className="cart-item-variant-options mt-2">
                                      <ul
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                          listStyle: "none",
                                        }}
                                      >
                                        <li>
                                          <span className="attribute-name">
                                            Size:{" "}
                                          </span>
                                          <span>{item.size}</span>
                                        </li>
                                        <li>
                                          <span className="attribute-name">
                                            Color:{" "}
                                          </span>
                                          <span>{item.color}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span>
                                    ₱{" "}
                                    {item?.TotalAmount
                                      ? parseInt(
                                          item.TotalAmount
                                        ).toLocaleString("en-US")
                                      : parseInt(item.price).toLocaleString(
                                          "en-US"
                                        )}
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkout-summary-block">
                      <div className="summary-row">
                        <span>Sub total</span>
                        <div>
                          <div>{totalItems} items</div>
                          <div>
                            ₱ {parseInt(subTotal).toLocaleString("en-US")}
                          </div>
                        </div>
                      </div>
                      <div
                        className="summary-row"
                        style={{
                          borderBottomColor: "#e1e3e5",
                          borderBottomWidth: 1,
                        }}
                      >
                        <span>Shipping</span>
                        <div>
                          <div>{previousCheckoutData.shipMethod}</div>
                          <div></div>
                        </div>
                      </div>
                      <div
                        className="summary-row"
                        style={{
                          borderBottomColor: "#e1e3e5",
                          borderBottomWidth: 1,
                        }}
                      >
                        <span>Discount</span>
                        <div>
                          <div></div>
                          <div>₱0.00</div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "1rem",
                          paddingTop: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                        }}
                      >
                        <div>
                          <div>
                            <div className="font-bold">
                              <span
                                style={{
                                  fontWeight: 700,
                                }}
                              >
                                Total
                              </span>
                            </div>
                            <div>
                              <span
                                className="italic"
                                style={{
                                  fontStyle: "italic",
                                }}
                              >
                                (Inclusive of tax ₱0.00)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div></div>
                          <div className="grand-total-value">
                            ₱ {parseInt(subTotal).toLocaleString("en-US")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
        </Container>
      </div>
      <div className="footerStore">
        <div
          className="page-width"
          style={{
            gap: "2rem",
            display: "grid",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                opacity: 1,
                color: "#737373",
                textAlign: "center",
              }}
            >
              <span>
                © {new Date().getFullYear()} CIIT Merch Store. All Rights
                Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ app }) => ({
  app,
});

export default connect(mapStateToProps, { actionCreator })(Thankyou);
