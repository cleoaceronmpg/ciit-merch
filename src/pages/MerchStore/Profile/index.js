import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import { encrypt, decrypt } from "../../../helpers/crypto_helper";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  Button,
  Label,
  Row,
  Col,
  Container,
  Input,
  Form,
  FormFeedback,
  Spinner,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const Profile = ({ app, authentication, profile, ...props }) => {
  let navigate = useNavigate();

  const { fields } = profile.data;
  const [updateShippingAddress, setUpdateShippingAddress] =
    React.useState(false);

  React.useEffect(() => {
    clearProfile();
    authentication.data?.id && fetchProfileDetails();
  }, []);

  React.useEffect(() => {
    if (!profile.loading) {
      profile.error &&
        profile.errorMessage &&
        Swal.fire({
          icon: "error",
          title: "Update Profile Error",
          text: profile.errorMessage,
        });

      !profile.error &&
        profile.successMessage &&
        Swal.fire({
          icon: "success",
          title: "Update Profile Success",
          text: profile.successMessage,
        });
    }
  }, [profile]);

  React.useEffect(() => {
    fields?.Email && fetchOrderHistory();
  }, [fields]);

  const validationPersonalDetails = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: authentication.data?.id,
      Email: fields?.Email || "",
      FullName: fields?.FullName || "",
      Password: fields?.Password
        ? decrypt(fields?.Password, process.env.REACT_APP_SECRET_KEY)
        : "",
      ContactNumber: fields?.ContactNumber || "",
    },
    validationSchema: Yup.object({
      Email: Yup.string().required("Email Address is required"),
      FullName: Yup.string().required("Full Name is required"),
      Password: Yup.string().required("Password is required"),
      ContactNumber: Yup.string().required("Contact Number is required"),
    }),
    onSubmit: async (values) => {
      values.Password = encrypt(
        values.Password,
        process.env.REACT_APP_SECRET_KEY
      );

      await props.actionCreator({
        type: types.POST_UPDATE_PROFILE,
        payload: {
          ...values,
        },
      });
    },
  });

  // validation
  const validationShippAddress = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: authentication.data?.id,
      RecipientName: fields?.RecipientName || "",
      Telephone: fields?.Telephone || "",
      Address: fields?.Address || "",
      Brgy: fields?.Brgy || "",
      City: fields?.City || "",
      PostalCode: fields?.PostalCode || "",
    },
    validationSchema: Yup.object({
      RecipientName: Yup.string().required("Recipient Name is required"),
      Telephone: Yup.string().required("Telephone is required"),
      Address: Yup.string().required("Address is required"),
      City: Yup.string().required("City is required"),
      Brgy: Yup.string().required("Brgy is required"),
      PostalCode: Yup.string().required("Postal Code is required"),
    }),
    onSubmit: async (values) => {
      await props.actionCreator({
        type: types.POST_UPDATE_SHIPPING_ADDRESS,
        payload: {
          ...values,
        },
      });

      setUpdateShippingAddress(false);
    },
  });

  const fetchProfileDetails = async () => {
    await props.actionCreator({
      type: types.GET_PROFILE_INFO,
      payload: {
        id: authentication.data?.id,
      },
    });
  };

  const fetchOrderHistory = async () => {
    await props.actionCreator({
      type: types.GET_ORDER_HISTORY,
      payload: {
        email: fields?.Email,
      },
    });
  };

  const clearProfile = async () => {
    await props.actionCreator({
      type: types.CLEAR_USER_PROFILE,
    });
  };

  //meta title
  document.title = "CIIT Merch | Profile";

  return (
    <React.Fragment>
      <Header />

      <div className="auth-page">
        {/* Render Breadcrumbs */}
        <Container className="container">
          <Row>
            <Col sm={12} md={12} lg={5} xxl={5}>
              <h5>Personal Details</h5>
              <Form
                className="needs-validation custom-form mt-4 pt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  validationPersonalDetails.handleSubmit();
                  return false;
                }}
              >
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    name="FullName"
                    type="text"
                    placeholder="Enter Full Name"
                    onChange={validationPersonalDetails.handleChange}
                    onBlur={validationPersonalDetails.handleBlur}
                    value={validationPersonalDetails.values.FullName || ""}
                    invalid={
                      validationPersonalDetails.touched.FullName &&
                      validationPersonalDetails.errors.FullName
                        ? true
                        : false
                    }
                  />
                  {validationPersonalDetails.touched.FullName &&
                  validationPersonalDetails.errors.FullName ? (
                    <FormFeedback type="invalid">
                      {validationPersonalDetails.errors.FullName}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    id="Email"
                    name="Email"
                    className="form-control"
                    placeholder="Enter Email"
                    type="Email"
                    onChange={validationPersonalDetails.handleChange}
                    onBlur={validationPersonalDetails.handleBlur}
                    value={validationPersonalDetails.values.Email || ""}
                    invalid={
                      validationPersonalDetails.touched.Email &&
                      validationPersonalDetails.errors.Email
                        ? true
                        : false
                    }
                  />
                  {validationPersonalDetails.touched.Email &&
                  validationPersonalDetails.errors.Email ? (
                    <FormFeedback type="invalid">
                      {validationPersonalDetails.errors.Email}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    name="Password"
                    type="Password"
                    placeholder="Enter Password"
                    onChange={validationPersonalDetails.handleChange}
                    onBlur={validationPersonalDetails.handleBlur}
                    value={validationPersonalDetails.values.Password || ""}
                    invalid={
                      validationPersonalDetails.touched.Password &&
                      validationPersonalDetails.errors.Password
                        ? true
                        : false
                    }
                  />
                  {validationPersonalDetails.touched.Password &&
                  validationPersonalDetails.errors.Password ? (
                    <FormFeedback type="invalid">
                      {validationPersonalDetails.errors.Password}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Contact Number</Label>
                  <Input
                    name="ContactNumber"
                    type="ContactNumber"
                    placeholder="Enter Contact Number"
                    onChange={validationPersonalDetails.handleChange}
                    onBlur={validationPersonalDetails.handleBlur}
                    value={validationPersonalDetails.values.ContactNumber || ""}
                    invalid={
                      validationPersonalDetails.touched.ContactNumber &&
                      validationPersonalDetails.errors.ContactNumber
                        ? true
                        : false
                    }
                  />
                  {validationPersonalDetails.touched.ContactNumber &&
                  validationPersonalDetails.errors.ContactNumber ? (
                    <FormFeedback type="invalid">
                      {validationPersonalDetails.errors.ContactNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div
                  className="mb-3"
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
                    disabled={profile.loading}
                  >
                    {profile.loading ? (
                      <>
                        <Spinner size="sm">Loading...</Spinner>
                        <span> Loading</span>
                      </>
                    ) : (
                      <span>Save Info</span>
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
            <Col sm={12} md={12} lg={6} xxl={6}>
              <h5>Shipping Address</h5>
              {!updateShippingAddress && fields?.Address ? (
                <>
                  <p className="waves-effect waves-light">
                    {fields?.RecipientName} {fields?.Telephone},{" "}
                    {fields?.Address}, {fields?.Brgy}, {fields?.City},{" "}
                    {fields?.PostalCode}
                  </p>
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
                      type="button"
                      style={{
                        backgroundColor: "#ff5400",
                        borderColor: "#ff5400",
                        maxWidth: "20%",
                      }}
                      color="primary"
                      onClick={() =>
                        setUpdateShippingAddress(!updateShippingAddress)
                      }
                    >
                      <span>Edit</span>
                    </Button>
                  </div>
                </>
              ) : (
                <Form
                  className="needs-validation custom-form mt-4 pt-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validationShippAddress.handleSubmit();
                    return false;
                  }}
                >
                  <div className="mb-3">
                    <Label className="form-label">Recipient Name </Label>
                    <Input
                      type="text"
                      name="RecipientName"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.RecipientName || ""}
                      invalid={
                        validationShippAddress.touched.RecipientName &&
                        validationShippAddress.errors.RecipientName
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.RecipientName &&
                    validationShippAddress.errors.RecipientName ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.RecipientName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Telephone </Label>
                    <Input
                      type="text"
                      name="Telephone"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.Telephone || ""}
                      invalid={
                        validationShippAddress.touched.Telephone &&
                        validationShippAddress.errors.Telephone
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.Telephone &&
                    validationShippAddress.errors.Telephone ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.Telephone}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Address </Label>
                    <Input
                      type="text"
                      name="Address"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.Address || ""}
                      invalid={
                        validationShippAddress.touched.Address &&
                        validationShippAddress.errors.Address
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.Address &&
                    validationShippAddress.errors.Address ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.Address}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">City </Label>
                    <Input
                      type="text"
                      name="City"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.City || ""}
                      invalid={
                        validationShippAddress.touched.City &&
                        validationShippAddress.errors.City
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.City &&
                    validationShippAddress.errors.City ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.City}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Brgy </Label>
                    <Input
                      type="text"
                      name="Brgy"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.Brgy || ""}
                      invalid={
                        validationShippAddress.touched.Brgy &&
                        validationShippAddress.errors.Brgy
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.Brgy &&
                    validationShippAddress.errors.Brgy ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.Brgy}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Postal Code </Label>
                    <Input
                      type="text"
                      name="PostalCode"
                      onChange={validationShippAddress.handleChange}
                      onBlur={validationShippAddress.handleBlur}
                      value={validationShippAddress.values.PostalCode || ""}
                      invalid={
                        validationShippAddress.touched.PostalCode &&
                        validationShippAddress.errors.PostalCode
                          ? true
                          : false
                      }
                    />

                    {validationShippAddress.touched.PostalCode &&
                    validationShippAddress.errors.PostalCode ? (
                      <FormFeedback type="invalid">
                        {validationShippAddress.errors.PostalCode}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div
                    style={{
                      marginTop: 15,
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href="#"
                      type="submit"
                      style={{
                        maxWidth: "40%",
                        margin: 15,
                      }}
                      color="primary"
                      onClick={() =>
                        setUpdateShippingAddress(!updateShippingAddress)
                      }
                    >
                      <span>Cancel</span>
                    </a>

                    <Button
                      className="btn btn-primary w-100 waves-effect waves-light"
                      type="submit"
                      style={{
                        backgroundColor: "#ff5400",
                        borderColor: "#ff5400",
                        maxWidth: "40%",
                      }}
                      color="primary"
                      disabled={profile.loading}
                    >
                      {profile.loading ? (
                        <>
                          <Spinner size="sm">Loading...</Spinner>
                          <span> Loading</span>
                        </>
                      ) : (
                        <span>Save Shipping Address</span>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
          <Row className="mt-5" sm={12} md={12} lg={12} xxl={12}>
            <Col>
              {app.orderHistoryData !== undefined &&
              app.orderHistoryData.length > 0 ? (
                <Card>
                  <CardHeader>
                    <h4 className="card-title">Order History</h4>
                    <p className="card-title-desc">
                      List of your order history.
                    </p>
                  </CardHeader>
                  <CardBody>
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                      >
                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered"
                        >
                          <Thead>
                            <Tr>
                              <Th>Transaction ID</Th>
                              <Th data-priority="1">Order</Th>
                              <Th data-priority="3">Ordered Date</Th>
                              <Th data-priority="1">Shipping Method</Th>
                              <Th data-priority="3">Total Amount</Th>
                              <Th data-priority="3">Order Status</Th>
                              <Th data-priority="3">Shipping Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {app.orderHistoryData.map((rowData, index) => (
                              <Tr key={index}>
                                <Th>
                                  <span className="co-name">
                                    {rowData.TransactionID}
                                  </span>
                                </Th>
                                <Td>
                                  <span className="co-name">
                                    {rowData.Description}
                                  </span>
                                </Td>
                                <Td>
                                  {moment(rowData["Order Date"]).format(
                                    "YYYY-MM-DD"
                                  )}
                                </Td>
                                <Td>{rowData.ShippingMethod}</Td>
                                <Td>
                                  ₱{" "}
                                  {parseInt(rowData.TotalAmount).toLocaleString(
                                    "en-US"
                                  )}
                                </Td>
                                <Td>
                                  {rowData.DPStatus === "S"
                                    ? "Success"
                                    : "Pending"}
                                </Td>
                                <Td>
                                  {rowData["New Order Tracker"] !== undefined
                                    ? rowData["New Order Tracker"]
                                    : "Pending"}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                          {/* <Pagination
                          perPageData={perPageData}
                          data={tabledata}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          currentData={tabledata}
                          className="d-flex align-items-center justify-content-between text-center text-sm-start mb-3" /> */}
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <p className="waves-effect waves-light">
                  No Order History yet.
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, authentication, profile }) => ({
  app,
  authentication,
  profile,
});

export default connect(mapStateToProps, { actionCreator })(Profile);
