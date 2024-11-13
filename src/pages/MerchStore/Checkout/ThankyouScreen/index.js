import React from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { actionCreator } from "../../../../store";
import { Col, Container, Row } from "reactstrap";

//import Breadcrumbs
import Breadcrumbs from "../../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../../components/MerchStore/Header";
import "./styles.css";

const Thankyou = ({ checkout, ...props }) => {
  let navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(null);

  React.useEffect(() => {
    console.log(checkout);
    checkout.orderItemsData && computeSubTotalAndQty(checkout.orderItemsData);
  }, [checkout]);

  const computeSubTotalAndQty = async (data) => {
    const totalPrice = data.reduce((acc, product) => {
      // Remove non-numeric characters from price and convert to number
      const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      // Add to accumulator: price * quantity
      return acc + numericPrice * product.quantity;
    }, 0);
    setSubTotal(totalPrice);
    const totalItems = data.reduce((acc, product) => {
      return acc + parseInt(product.quantity);
    }, 0);

    setTotalItems(totalItems);
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
        <Container fluid>
          <div
            style={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div>
              <div
                className="thank-you flex justify-start space-x-8"
                style={{
                  width: 530,
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
                    Order Referrence #{checkout.orderID}
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
                    {checkout.shipMethod === "For Pickup" && (
                      <div className="text-textSubdued">
                        {checkout.shipAddressData[0].fullName}
                      </div>
                    )}
                    <div className="text-textSubdued">{checkout.tempEmail}</div>
                  </div>
                  <div>
                    <div className="mb-3">
                      {checkout.shipMethod === "For Pickup" ? (
                        <h3>For Pickup Address</h3>
                      ) : (
                        <h3>Shipping Address</h3>
                      )}
                    </div>
                    <div className="text-textSubdued">
                      {checkout.shipMethod === "For Pickup" ? (
                        <div className="address__summary">
                          <div className="full-name">Seoulful Sweets Store</div>
                          <div className="address-one">
                            {checkout.shipAddressData[0].address}
                          </div>
                          <div className="telephone">09153255438</div>
                        </div>
                      ) : (
                        <div className="address__summary">
                          <div className="full-name">
                            {checkout.shipAddressData[0].fullName}
                          </div>
                          <div className="address-one">
                            {checkout.shipAddressData[0].address}
                          </div>
                          <div className="city-province-postcode">
                            <div>
                              {checkout.shipAddressData[0].postalCode},{" "}
                              {checkout.shipAddressData[0].city}
                            </div>
                            <div>
                              <span>{checkout.shipAddressData[0].city}, </span>{" "}
                              <span>{checkout.shipAddressData[0].country}</span>
                            </div>
                          </div>
                          <div className="telephone">
                            {checkout.shipAddressData[0].telephone}
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
                      {checkout.paymentMethod.charAt(0).toUpperCase() +
                        checkout.paymentMethod.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <h3>Billing Address</h3>
                    </div>
                    <div className="text-textSubdued">
                      <div className="address__summary">
                        <div className="full-name">{checkout.tempEmail}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/home" className="button primary">
                <span>CONTINUE SHOPPING</span>
              </a>
            </div>

            <div style={{ width: 530, margin: 5 }}>
              <div className="checkout-summary h-full hidden md:block">
                <div id="summary-items">
                  <table className="listing items-table">
                    <tbody>
                      {checkout.orderItemsData.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="product-thumbnail">
                              <div className="thumbnail">
                                <img
                                  src={item.img}
                                  alt={item.title}
                                  height={58}
                                  width={58}
                                />
                              </div>
                              <span className="qty">{item.quantity}</span>
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
                              {item?.totalPrice
                                ? parseInt(item.totalPrice).toLocaleString(
                                    "en-US"
                                  )
                                : parseInt(item.price).toLocaleString("en-US")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="checkout-summary-block">
                  <div className="summary-row">
                    <span>Sub total</span>
                    <div>
                      <div>{totalItems} items</div>
                      <div>₱ {parseInt(subTotal).toLocaleString("en-US")}</div>
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
                      <div>{checkout.shipMethod}</div>
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
              <span>© 2024 CIIT Merch Store. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ checkout }) => ({
  checkout,
});

export default connect(mapStateToProps, { actionCreator })(Thankyou);
