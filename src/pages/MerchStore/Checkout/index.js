import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import {
  Col,
  Container,
  Row,
  Form,
  Label,
  Input,
  FormFeedback,
  FormGroup,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import gcashLogo from "../../../assets/images/gcash.png";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import "./styles.css";

const Checkout = ({ cart, checkout, authentication, ...props }) => {
  let navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [subTotal, setSubTotal] = React.useState(null);
  const [totalItems, setTotalItems] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(
    !checkout.shipAddressData.length && "for-pickup"
  );
  const [selectedPaymentOption, setSelectedPaymentOption] =
    React.useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      telephone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      options: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      telephone: Yup.string().required("Telephone is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal Code is required"),
    }),
    onSubmit: async (values) => {
      await props.actionCreator({
        type: types.SET_SHIP_ADDRESS,
        payload: {
          shipMethod: "For Delivery",
          data: [
            {
              fullName: values.fullName,
              telephone: values.telephone,
              address: values.address,
              city: values.city,
              country: values.country,
              postalCode: values.postalCode,
            },
          ],
        },
      });
      validation.resetForm();
    },
  });

  const validation2 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values) => {
      await props.actionCreator({
        type: types.SET_TEMP_EMAIL,
        payload: {
          email: values.email,
        },
      });

      validation2.resetForm();
    },
  });

  React.useEffect(() => {
    // collection && setCatalog(collection);
    cart.data && setShoppingCart(cart.data);
    cart.data && computeSubTotalAndQty(cart.data);
    console.log(cart.data);
  }, [cart.data]);

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

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const changeEmail = async () => {
    await props.actionCreator({
      type: types.SET_TEMP_EMAIL,
      payload: {
        email: null,
      },
    });
  };

  const continueForPickup = async () => {
    await props.actionCreator({
      type: types.SET_SHIP_ADDRESS,
      payload: {
        shipMethod: "For Pickup",
        data: [{ address: "94 Kamuning St. Quezon City" }],
      },
    });
  };

  const changeAddress = async () => {
    await props.actionCreator({
      type: types.SET_SHIP_ADDRESS,
      payload: {
        shipMethod: null,
        data: [],
      },
    });
  };

  const placeOrder = async () => {
    if (selectedPaymentOption) {
      const orderID = generateRandomString();

      await props.actionCreator({
        type: types.SET_PAYMENT_METHOD,
        payload: {
          paymentMethod: selectedPaymentOption,
        },
      });

      await props.actionCreator({
        type: types.SET_ORDER_ITEMS,
        payload: {
          orderItemsData: shoppingCart,
        },
      });

      await props.actionCreator({
        type: types.SET_ORDER_ID,
        payload: {
          orderID: orderID,
        },
      });

      await props.actionCreator({
        type: types.CLEAR_CART,
      });

      navigate(`/checkout/success/${orderID}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Method",
        text: "Please select your payment method",
      });
    }
    console.log("place order");
  };

  const handlePaymentOption = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  const generateRandomString = (length = 16) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const cryptoObj = window.crypto || window.msCrypto; // For cross-browser compatibility

    for (let i = 0; i < length; i++) {
      // Generate a random index within the charset length
      const randomIndex = Math.floor(
        (cryptoObj.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
          charset.length
      );
      result += charset[randomIndex];
    }
    return result;
  };

  //meta title
  document.title = "CIIT Merch | Checkout";

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Contact Information"
            breadcrumbItem="Shipment | Payment"
          />

          <div
            style={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 530, margin: 5 }}>
              {checkout.tempEmail ? (
                <>
                  <div
                    style={{
                      margin: 10,
                      border: "#ccc solid 1px",
                      padding: 15,
                      borderColor: "rgb(225 227 229)",
                      borderRadius: ".25rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span>Contact</span>
                      </div>
                      <div>
                        <span>{checkout.tempEmail}</span>
                      </div>
                      <div>
                        <a
                          href="#"
                          className="text-interactive hover:underline"
                          onClick={() => changeEmail()}
                        >
                          Change
                        </a>
                      </div>
                    </div>

                    {checkout.shipAddressData.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 15,
                          borderTop: "rgb(225 227 229) solid 1px",
                          paddingTop: 15,
                        }}
                      >
                        <div>
                          {checkout.shipMethod === "For Pickup" ? (
                            <span>For Pickup</span>
                          ) : (
                            <span>Ship to</span>
                          )}
                        </div>
                        <div>
                          <span>{checkout.shipAddressData[0].address}</span>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-interactive hover:underline"
                            onClick={() => changeAddress()}
                          >
                            Change
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  {!checkout.shipAddressData.length ? (
                    <div
                      style={{
                        marginTop: "1rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <h4
                        style={{
                          fontWeight: "inherit",
                        }}
                      >
                        Shipping Method
                      </h4>
                      <div
                        style={{
                          justifyContent: "space-between",
                          marginTop: 10,
                          border: "#ccc solid 1px",
                          padding: 15,
                          borderColor: "rgb(225 227 229)",
                          borderRadius: ".25rem",
                        }}
                      >
                        <FormGroup
                          check
                          style={{
                            marginBottom: 10,
                          }}
                        >
                          <Label
                            style={{
                              fontWeight: 400,
                            }}
                            check
                          >
                            <Input
                              type="radio"
                              name="options"
                              value="for-pickup"
                              checked={selectedOption === "for-pickup"}
                              onChange={handleRadioChange}
                            />
                            For Pickup at{" "}
                            <span
                              style={{
                                fontWeight: 400,
                                fontStyle: "italic",
                              }}
                            >
                              "94 Kamuning St. Quezon City"
                            </span>
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label
                            style={{
                              fontWeight: 400,
                            }}
                            check
                          >
                            <Input
                              type="radio"
                              name="options"
                              value="for-delivery"
                              checked={selectedOption === "for-delivery"}
                              onChange={handleRadioChange}
                            />
                            For Delivery
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "1rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <h4
                        style={{
                          fontWeight: "inherit",
                        }}
                      >
                        Payment Method
                      </h4>
                      <div
                        style={{
                          justifyContent: "space-between",
                          marginTop: 10,
                          border: "#ccc solid 1px",
                          padding: 15,
                          borderColor: "rgb(225 227 229)",
                          borderRadius: ".25rem",
                        }}
                      >
                        <FormGroup
                          check
                          style={{
                            marginBottom: 10,
                          }}
                        >
                          <Label
                            style={{
                              fontWeight: 400,
                            }}
                            check
                          >
                            <Input
                              type="radio"
                              name="paymentOptions"
                              value="gcash"
                              checked={selectedPaymentOption === "gcash"}
                              onChange={handlePaymentOption}
                              style={{
                                marginTop: 10,
                                marginRight: 10,
                              }}
                            />
                            <img src={gcashLogo} height={40} width={50} />
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  )}
                  {selectedOption === "for-delivery" &&
                  !checkout.shipAddressData.length ? (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div
                        style={{
                          marginTop: "3rem",
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        <>
                          <h4
                            style={{
                              fontWeight: "inherit",
                            }}
                          >
                            Shipping Address
                          </h4>
                          <div>
                            <Row>
                              <Col xs={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Full Name{" "}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="fullName"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.fullName || ""}
                                    invalid={
                                      validation.touched.fullName &&
                                      validation.errors.fullName
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.fullName &&
                                  validation.errors.fullName ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.fullName}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col xs={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Telephone{" "}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="telephone"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.telephone || ""}
                                    invalid={
                                      validation.touched.telephone &&
                                      validation.errors.telephone
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.telephone &&
                                  validation.errors.telephone ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.telephone}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12}>
                                <div className="mb-3">
                                  <Label className="form-label">Address </Label>
                                  <Input
                                    type="text"
                                    name="address"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.address || ""}
                                    invalid={
                                      validation.touched.address &&
                                      validation.errors.address
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.address &&
                                  validation.errors.address ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.address}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12}>
                                <div className="mb-3">
                                  <Label className="form-label">City </Label>
                                  <Input
                                    type="text"
                                    name="city"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.city || ""}
                                    invalid={
                                      validation.touched.city &&
                                      validation.errors.city
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.city &&
                                  validation.errors.city ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.city}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12}>
                                <div className="mb-3">
                                  <Label className="form-label">Country </Label>
                                  <Input
                                    type="text"
                                    name="country"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.country || ""}
                                    invalid={
                                      validation.touched.country &&
                                      validation.errors.country
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.country &&
                                  validation.errors.country ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.country}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={6}>
                                <div className="mb-3">
                                  <Label className="form-label">
                                    Postal Code{" "}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="postalCode"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.postalCode || ""}
                                    invalid={
                                      validation.touched.postalCode &&
                                      validation.errors.postalCode
                                        ? true
                                        : false
                                    }
                                  />

                                  {validation.touched.postalCode &&
                                  validation.errors.postalCode ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.postalCode}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </>
                      </div>

                      <div
                        style={{
                          marginTop: 15,
                          marginRight: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button type="submit" className="button primary">
                          <span>Continue to payment</span>
                        </button>
                      </div>
                    </Form>
                  ) : !checkout.shipAddressData.length ? (
                    <div
                      style={{
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        type="button"
                        className="button primary"
                        onClick={() => continueForPickup()}
                      >
                        <span>Continue to shipping</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        type="button"
                        className="button primary"
                        onClick={() => placeOrder()}
                      >
                        <span>Place Order</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation2.handleSubmit();
                    return false;
                  }}
                >
                  <div
                    style={{
                      marginTop: "3rem",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: "inherit",
                      }}
                    >
                      Contact information
                    </h4>
                    <div>
                      <Row>
                        <Col xs={12}>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              style={{
                                fontWeight: 400,
                              }}
                            >
                              Already have an account?
                              {"  "}
                              <Link to={"/login"}>Login</Link>
                            </Label>
                            <Input
                              type="text"
                              name="email"
                              placeholder="Email"
                              onChange={validation2.handleChange}
                              onBlur={validation2.handleBlur}
                              value={validation2.values.email || ""}
                              invalid={
                                validation2.touched.email &&
                                validation2.errors.email
                                  ? true
                                  : false
                              }
                            />

                            {validation2.touched.email &&
                            validation2.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation2.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <div
                        style={{
                          marginTop: 15,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button type="submit" className="button primary">
                          <span>Continue to shipping</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </div>
            <div style={{ width: 530, margin: 5 }}>
              <div className="checkout-summary h-full hidden md:block">
                <div id="summary-items">
                  <table className="listing items-table">
                    <tbody>
                      {shoppingCart.map((item, index) => (
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
                <div className="shipping-note mt-8">
                  <div className="form-field-container null">
                    <div className="field-wrapper flex flex-grow">
                      <textarea
                        type="text"
                        className="form-field"
                        id="note"
                        name="note"
                        placeholder="Add a note to your order"
                        style={{
                          padding: 15,
                          width: "100%",
                          borderColor: "#c9cccf",
                          borderWidth: 1,
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="button" className="button primary">
                      <span>Save</span>
                    </button>
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

const mapStateToProps = ({ cart, checkout, authentication }) => ({
  cart,
  checkout,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Checkout);
