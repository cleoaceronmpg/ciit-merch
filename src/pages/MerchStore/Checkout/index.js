import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import "./styles.css";

const Checkout = ({ cart, ...props }) => {
  const [shoppingCart, setShoppingCart] = React.useState([]);
  let navigate = useNavigate();

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
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      telephone: Yup.string().required("Telephone is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal Code is required"),
    }),
    onSubmit: (values) => {
      validation.resetForm();
    },
  });

  React.useEffect(() => {
    // collection && setCatalog(collection);
    cart.data && setShoppingCart(cart.data);
    console.log(cart.data);
  }, [cart.data]);

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
            breadcrumbItem="Shipment Payment"
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                  border: "#ccc solid 1px",
                  padding: 15,
                  borderColor: "rgb(225 227 229)",
                  borderRadius: ".25rem",
                }}
              >
                <div>
                  <span>Contact</span>
                </div>
                <div>
                  <span>cleo.aceron@gmail.com</span>
                </div>
                <div>
                  <a href="#" className="text-interactive hover:underline">
                    Change
                  </a>
                </div>
              </div>
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
                          <Label className="form-label">Full Name </Label>
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
                          <Label className="form-label">City </Label>
                          <Input
                            type="text"
                            name="city"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.city || ""}
                            invalid={
                              validation.touched.city && validation.errors.city
                                ? true
                                : false
                            }
                          />

                          {validation.touched.city && validation.errors.city ? (
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
                          <Label className="form-label">Postal Code </Label>
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
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    marginLeft: 10,
                    marginRight: 10,
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
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 10,
                      border: "#ccc solid 1px",
                      padding: 15,
                      borderColor: "rgb(225 227 229)",
                      borderRadius: ".25rem",
                    }}
                  >
                    <span>
                      Sorry, there is no available method for your address
                    </span>
                  </div>
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
            </div>
            <div style={{ width: 530, margin: 5 }}></div>
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

const mapStateToProps = ({ cart, authentication }) => ({
  cart,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Checkout);
