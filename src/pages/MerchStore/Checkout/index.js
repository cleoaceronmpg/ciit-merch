import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import { hashChecksum } from "../../../helpers/crypto_helper";
import {
  Button,
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
import dragonpayLogo from "../../../assets/images/dragonpay.png";

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
  const [notesToOrders, setNotesToOrders] = React.useState(null);

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
    checkout.loading
      ? Swal.fire({
          title: "Loading...",
          text: "Please wait while we process your request.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        })
      : Swal.close();
  }, [checkout.loading]);

  React.useEffect(() => {
    console.log("checkout", checkout);
    checkout.data?.fields?.TransactionID &&
      placeOrderItems(checkout.orderItemsData);
  }, [checkout.data]);

  React.useEffect(() => {
    if (checkout.placedOrderItemsData.length > 0 && checkout.data?.fields) {
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Done!",
        text: "You are now redirecting to Payment Process.",
      });

      setTimeout(() => {
        digestUrlHandler(checkout.data?.fields);
      }, 3000);
    }
  }, [checkout.placedOrderItemsData]);

  React.useEffect(() => {
    subTotal && totalAmountHandler(subTotal);
  }, [subTotal]);

  React.useEffect(() => {
    // collection && setCatalog(collection);
    cart.data && setShoppingCart(cart.data);
    cart.data && computeSubTotalAndQty(cart.data);
  }, [cart.data]);

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
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const totalAmountHandler = async (totalAmount) => {
    await props.actionCreator({
      type: types.SET_TOTAL_AMOUNT,
      payload: totalAmount,
    });
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

  const saveNotesToOrders = async () => {
    await props.actionCreator({
      type: types.SET_ORDER_NOTES,
      payload: notesToOrders,
    });
  };

  const placeOrder = async () => {
    if (selectedPaymentOption) {
      await props.actionCreator({
        type: types.SET_ORDER_ITEMS,
        payload: {
          orderItemsData: shoppingCart,
        },
      });

      const description = `Order-Items-${shoppingCart.map((item) => item["Product Name"]).join(", ")}`;

      let ShippingAddress = "";
      if (checkout.shipMethod === "For Pickup") {
        ShippingAddress = checkout.shipAddressData[0].address;
      } else {
        ShippingAddress = `${checkout.shipAddressData[0].fullName}, ${checkout.shipAddressData[0].address}, ${checkout.shipAddressData[0].postalCode}, ${checkout.shipAddressData[0].city}, ${checkout.shipAddressData[0].country} ${checkout.shipAddressData[0].telephone}`;
      }

      await props.actionCreator({
        type: types.PLACE_ORDER,
        payload: {
          Description: description,
          TotalAmount: parseFloat(checkout.totalAmount),
          CustomerEmail: checkout.tempEmail,
          ShippingMethod: checkout.shipMethod,
          ShippingAddress: ShippingAddress,
          CustomerNotes: checkout.notesToOrders,
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Method",
        text: "Please select your payment method",
      });
    }
    console.log("place order");
  };

  const placeOrderItems = async (orderItems) => {
    if (checkout.data?.fields?.TransactionID && orderItems.length > 0) {
      setPreviousCheckoutData();

      const records = orderItems.map((item) => ({
        fields: {
          TransactionID: [checkout.data.id],
          "Product ID": [item.id],
          Color: item["Color"],
          Size: item["Size"],
          Quantity: item["Quantity"],
          Price: parseFloat(item["Price"]),
          TotalAmount: item["TotalAmount"],
        },
      }));

      await props.actionCreator({
        type: types.PLACE_ORDER_ITEMS,
        payload: records,
      });
    }
  };

  const digestUrlHandler = async (OrderFields) => {
    let merchantId = process.env.REACT_APP_DP_MERCHANT_ID;
    let key = process.env.REACT_APP_DP_KEY;

    // Get data from the record
    let txnId = OrderFields.TransactionID;
    let amount = parseFloat(OrderFields.TotalAmount).toFixed(2);
    let description = OrderFields.Description;
    let email = OrderFields.CustomerEmail;

    // Generate checksum
    let checksumString =
      merchantId +
      ":" +
      txnId +
      ":" +
      amount +
      ":PHP:" +
      description +
      ":" +
      email +
      ":" +
      key;

    let checksum = await hashChecksum(checksumString);

    const newPaymentUrl = `${OrderFields.PaymentUrl}&digest=${checksum}`;

    window.location.href = newPaymentUrl;
  };

  const handlePaymentOption = async (e) => {
    setSelectedPaymentOption(e.target.value);

    await props.actionCreator({
      type: types.SET_PAYMENT_METHOD,
      payload: {
        paymentMethod: e.target.value,
      },
    });
  };

  const setPreviousCheckoutData = async () => {
    await props.actionCreator({
      type: types.SET_PREVIOUS_CHECKOUT,
      payload: {
        shipAddressData: checkout.shipAddressData,
        shipMethod: checkout.shipMethod,
        tempEmail: checkout.tempEmail,
        paymentMethod: checkout.paymentMethod,
        orderItemsData: checkout.orderItemsData,
      },
    });
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
        <Container>
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
                              value="dragonpay"
                              checked={selectedPaymentOption === "dragonpay"}
                              onChange={handlePaymentOption}
                              style={{
                                marginTop: 50,
                                marginRight: 10,
                              }}
                            />
                            <img src={dragonpayLogo} height={100} width={200} />
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
                        <Button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                          style={{
                            backgroundColor: "#ff5400",
                            borderColor: "#ff5400",
                            maxWidth: "40%",
                          }}
                          color="primary"
                        >
                          <span>Continue to payment</span>
                        </Button>
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
                      <Button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                        style={{
                          backgroundColor: "#ff5400",
                          borderColor: "#ff5400",
                          maxWidth: "40%",
                        }}
                        color="primary"
                        onClick={() => continueForPickup()}
                      >
                        <span>Continue to shipping</span>
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="button"
                        style={{
                          backgroundColor: "#ff5400",
                          borderColor: "#ff5400",
                          maxWidth: "40%",
                        }}
                        color="primary"
                        onClick={() => placeOrder()}
                        disabled={checkout.placedOrderItemsData.length > 0}
                      >
                        <span>Place Order</span>
                      </Button>
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
                            {!authentication.authenticated && (
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
                            )}
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
                        <Button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                          style={{
                            backgroundColor: "#ff5400",
                            borderColor: "#ff5400",
                            maxWidth: "40%",
                          }}
                          color="primary"
                        >
                          <span>Continue to shipping</span>
                        </Button>
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
                                  src={item.Images[0].url}
                                  alt={item["Product Name"]}
                                  height={58}
                                  width={58}
                                />
                              </div>
                              <span className="qty">{item.Quantity}</span>
                            </div>
                          </td>
                          <td>
                            <div className="product-column">
                              <div>
                                <span style={{ fontWeight: 600 }}>
                                  {item["Product Name"]}
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
                                    <span>{item.Size}</span>
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
                                ? parseInt(item.TotalAmount).toLocaleString(
                                    "en-US"
                                  )
                                : parseInt(item.Price).toLocaleString("en-US")}
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
                        placeholder="(Optional) Add a note to your order"
                        style={{
                          padding: 15,
                          width: "100%",
                          borderColor: "#c9cccf",
                          borderWidth: 1,
                        }}
                        onChange={(event) =>
                          setNotesToOrders(event.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="btn btn-primary w-100 waves-effect waves-light"
                      type="button"
                      style={{
                        backgroundColor: "#ff5400",
                        borderColor: "#ff5400",
                        maxWidth: "40%",
                      }}
                      color="primary"
                      onClick={() => saveNotesToOrders()}
                    >
                      <span>Save</span>
                    </Button>
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
