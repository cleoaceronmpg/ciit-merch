import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const Checkout = ({
  app,
  cart,
  checkout,
  authentication,
  profile,
  ...props
}) => {
  let navigate = useNavigate();
  const location = useLocation();
  const { isFromCart } = location.state || {};

  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [subTotal, setSubTotal] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [shippingTotalRate, setShippingTotalRate] = React.useState(null);
  const [totalItems, setTotalItems] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(
    !checkout.shipAddressData.length && "for-pickup"
  );
  const [selectedPaymentOption, setSelectedPaymentOption] = React.useState(
    checkout.paymentMethod
  );
  const [notesToOrders, setNotesToOrders] = React.useState(null);
  const { fields } = profile.data;
  const { shippingRate } = app;

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      fullName: fields?.RecipientName || "",
      telephone: fields?.Telephone || "",
      address: fields?.Address || "",
      city: fields?.City || "",
      brgy: fields?.Brgy || "",
      postalCode: fields?.PostalCode || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      telephone: Yup.string().required("Telephone is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      brgy: Yup.string().required("Brgy is required"),
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
              brgy: values.brgy,
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
    if (!isFromCart) {
      navigate("/cart");
    }
    authentication.authenticated && initTempEmail();
  }, [authentication]);

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
    total && totalAmountHandler(total);
  }, [total]);

  React.useEffect(() => {
    // collection && setCatalog(collection);
    cart.data.length > 0 &&
      app.products.length > 0 &&
      cartDataHandler(cart.data);
    cart.data && computeSubTotalAndQty(cart.data);
  }, [cart.data, app.products]);

  React.useEffect(() => {
    cart.data && computeSubTotalAndShippingRate(cart.data);
  }, [selectedOption]);

  const cartDataHandler = async (data) => {
    const updatedArray = data.map((item) => {
      const match = app.products.find((second) => second.id === item.id);

      if (match) {
        // Merge the fields from the second array into the first array item
        return {
          ...item,
          Images: match.Images,
        };
      }

      // If no match, return the original item
      return item;
    });

    setShoppingCart(updatedArray);
  };

  const computeSubTotalAndShippingRate = async (data) => {
    let TotalAmount = data.reduce((acc, product) => {
      // Remove non-numeric characters from price and convert to number
      const numericPrice = parseFloat(product.Price.replace(/[^0-9.-]+/g, ""));
      // Add to accumulator: price * quantity
      return acc + numericPrice * product.Quantity;
    }, 0);

    if (cart.promoCode?.Amount) {
      TotalAmount =
        parseFloat(TotalAmount) - parseFloat(cart.promoCode?.Amount);
    }

    const totalItems = data.reduce((acc, product) => {
      return acc + parseInt(product.Quantity);
    }, 0);

    if (selectedOption === "for-delivery") {
      const filteredShippingRate = shippingRate
        .filter(
          (item) => item["Start"] <= totalItems && item["End"] >= totalItems
        )
        .map((rate) => rate["Shipping Rate"]);

      if (filteredShippingRate.length > 0) {
        setShippingTotalRate(filteredShippingRate[0]);
        const newTotalAmount =
          parseFloat(TotalAmount) + parseFloat(filteredShippingRate[0]);

        setTotal(newTotalAmount);
      }
    } else {
      setTotal(TotalAmount);
    }
  };

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
        ShippingAddress = `${checkout.shipAddressData[0].fullName}, ${checkout.shipAddressData[0].address}, ${checkout.shipAddressData[0].brgy}, ${checkout.shipAddressData[0].postalCode}, ${checkout.shipAddressData[0].city}, ${checkout.shipAddressData[0].telephone}`;
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
          ShippingFee:
            selectedOption === "for-delivery" ? shippingTotalRate : 0,
          DiscountAmount: cart.promoCode?.Amount || 0,
          PromoCode: cart.promoCode?.id ? [cart.promoCode?.id] : [],
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Method",
        text: "Please select your payment method",
      });
    }
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

  const initTempEmail = async () => {
    await props.actionCreator({
      type: types.SET_TEMP_EMAIL,
      payload: {
        email: authentication.data?.fields.Email,
      },
    });
  };

  //meta title
  document.title = "CIIT Merch | Checkout";

  return (
    <React.Fragment>
      <Header />

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
                {!checkout.shipAddressData.length && (
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
                              fontWeight: 700,
                            }}
                          >
                            Seoulful Sweets Cafe (96 Kamuning Rd)
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
                        <div className="mt-3">
                          <Row>
                            <Col xs={6}>
                              <div className="mb-3">
                                <Label className="form-label">
                                  Recipient Full Name{" "}
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
                                <Label className="form-label">Telephone </Label>
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
                                <Label className="form-label">Brgy </Label>
                                <Input
                                  type="text"
                                  name="brgy"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.brgy || ""}
                                  invalid={
                                    validation.touched.brgy &&
                                    validation.errors.brgy
                                      ? true
                                      : false
                                  }
                                />

                                {validation.touched.brgy &&
                                validation.errors.brgy ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.brgy}
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
                          maxWidth: "50%",
                        }}
                        color="primary"
                      >
                        <span>Place Order</span>
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
                      {checkout.tempEmail ? (
                        <span>Place Order</span>
                      ) : (
                        <span>Continue to shipping</span>
                      )}
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
                      <span>Continue Checkout</span>
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
            <div className="checkout-details h-full hidden md:block">
              <div id="checkout-details__items">
                {shoppingCart.map((item, index) => (
                  <div className="checkout-details__item" key={index}>
                    <div className="checkout-details__product-details">
                      <div className="checkout-details__product-image">
                        <img
                          src={item.Images[0].url}
                          alt={item["Product Name"]}
                          height={58}
                          width={58}
                        />
                      </div>
                      <div className="checkout-details__product-info">
                        <div className="checkout-details__product-name">
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
                        <div className="checkout-details__quantity">
                          <h6>Quantity: {item.Quantity}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-details__product-total">
                      <h5>
                        ₱{" "}
                        {item?.TotalAmount
                          ? parseFloat(item.TotalAmount).toFixed(2)
                          : parseFloat(item.Price).toFixed(2)}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout-details-block">
                <div className="checkout-details-block__subtotal">
                  <h5>Subtotal</h5>
                  <h5>₱ {parseFloat(subTotal).toFixed(2)}</h5>
                </div>
                {cart.promoCode && (
                  <div className="checkout-details-block__total">
                    <h5>Promo Code Discount</h5>
                    <h5>₱ -{parseFloat(cart.promoCode?.Amount).toFixed(2)}</h5>
                  </div>
                )}
                {selectedOption === "for-delivery" && (
                  <div className="checkout-details-block__total">
                    <h5>Shipping Fee</h5>
                    <h5>₱ {parseFloat(shippingTotalRate).toFixed(2)}</h5>
                  </div>
                )}
                <div className="checkout-details-block__total">
                  <h5>Total</h5>
                  <h5>₱ {parseFloat(total).toFixed(2)}</h5>
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
                      onChange={(event) => setNotesToOrders(event.target.value)}
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

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, cart, checkout, authentication, profile }) => ({
  app,
  cart,
  checkout,
  authentication,
  profile,
});

export default connect(mapStateToProps, { actionCreator })(Checkout);
