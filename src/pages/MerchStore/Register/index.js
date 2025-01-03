import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Row,
  Col,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { actionCreator, types } from "../../../store";
import { encrypt } from "../../../helpers/crypto_helper";
import logoSvg from "../../../assets/images/weare-logo.png";
import "./styles.css";
import moment from "moment";

const Register = ({ account, authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Register";

  React.useEffect(() => {
    clearAuthBeforeRegister();
  }, []);

  React.useEffect(() => {
    if (authentication.tempUsers?.id) {
      toast(
        "Thank you for signing up! Please check your email inbox to verify your account.",
        {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
        }
      );

      validation.resetForm();
      setTimeout(() => {
        clearAuthBeforeRegister();
        navigate("/home");
      }, 2500);
    }
  }, [authentication]);

  React.useEffect(() => {
    if (authentication.error && authentication.errorMessage) {
      toast(authentication.errorMessage, {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
      });
    }
  }, [authentication]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      Email: "",
      FullName: "",
      Password: "",
      ContactNumber: "",
      Access: "Buyer",
    },
    validationSchema: Yup.object({
      Email: Yup.string().required("Enter Your Email"),
      FullName: Yup.string().required("Enter Your Full Name"),
      Password: Yup.string().required("Enter Your Password"),
      ContactNumber: Yup.string().required("Enter Your Contact Number"),
    }),
    onSubmit: async (values) => {
      values.Password = encrypt(
        values.Password,
        process.env.REACT_APP_SECRET_KEY
      );

      values.Token = encrypt(
        moment().format("HH:mm:ss"),
        process.env.REACT_APP_SECRET_KEY
      );

      await props.actionCreator({
        type: types.REGISTER,
        payload: values,
      });
    },
  });

  const clearAuthBeforeRegister = async () => {
    await props.actionCreator({
      type: types.CLEAR_AUTH,
    });
  };

  return (
    <React.Fragment>
      <div className="auth-page">
        {/* Render Breadcrumbs */}
        <Container fluid className="p-0">
          <Row
            className="g-0"
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col lg={6} md={6} className="col-xxl-5">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/home" className="d-block auth-logo">
                        <img src={logoSvg} alt="" height="28" />{" "}
                        <span className="logo-txt">CIIT Merch</span> ❤️
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Register Account</h5>
                        <p className="text-muted mt-2">
                          Get your free CIIT Merch account now.
                        </p>
                      </div>

                      <Form
                        className="needs-validation custom-form mt-4 pt-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {authentication?.id ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}

                        <div className="mb-3">
                          <Label className="form-label">Full Name</Label>
                          <Input
                            name="FullName"
                            type="text"
                            placeholder="Enter Full Name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.FullName || ""}
                            invalid={
                              validation.touched.FullName &&
                              validation.errors.FullName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.FullName &&
                          validation.errors.FullName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.FullName}
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
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.Email || ""}
                            invalid={
                              validation.touched.Email &&
                              validation.errors.Email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.Email &&
                          validation.errors.Email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.Email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="Password"
                            type="Password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.Password || ""}
                            invalid={
                              validation.touched.Password &&
                              validation.errors.Password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.Password &&
                          validation.errors.Password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.Password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Contact Number</Label>
                          <Input
                            name="ContactNumber"
                            type="ContactNumber"
                            placeholder="Enter Contact Number"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.ContactNumber || ""}
                            invalid={
                              validation.touched.ContactNumber &&
                              validation.errors.ContactNumber
                                ? true
                                : false
                            }
                          />
                          {validation.touched.ContactNumber &&
                          validation.errors.ContactNumber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.ContactNumber}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <p className="mb-0">
                            By registering you agree to the CIIT{" "}
                            <Link
                              to="/terms-condition"
                              target="_blank"
                              className="text-primary"
                            >
                              Terms of Condition
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy-policy"
                              target="_blank"
                              className="text-primary"
                              style={{
                                marginTop: 10,
                              }}
                            >
                              Privacy Policy
                            </Link>
                          </p>
                        </div>
                        <div className="mb-3">
                          {/* <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                            style={{
                              backgroundColor: "#ff5400",
                              borderColor: "#ff5400",
                            }}
                          >
                            Register
                          </button> */}
                          <Button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                            style={{
                              backgroundColor: "#ff5400",
                              borderColor: "#ff5400",
                            }}
                            color="primary"
                            disabled={authentication.loading}
                          >
                            {authentication.loading ? (
                              <>
                                <Spinner size="sm">Loading...</Spinner>
                                <span> Loading</span>
                              </>
                            ) : (
                              <span>Register</span>
                            )}
                          </Button>
                        </div>
                      </Form>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="text-primary fw-semibold"
                          >
                            {" "}
                            Login{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} CIIT Merch Store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

// export default Register
const mapStateToProps = ({ account, authentication }) => ({
  account,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Register);
