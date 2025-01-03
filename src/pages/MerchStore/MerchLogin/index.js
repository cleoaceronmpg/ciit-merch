import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Spinner,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import withRouter from "../../../components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
// import images
import weareLogo from "../../../assets/images/weare-logo.png";

const MerchLogin = ({ authentication, ...props }) => {
  const [passwordShow, setPasswordShow] = React.useState(false);
  let navigate = useNavigate();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email Address"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      await props.actionCreator({
        type: types.LOGIN_USER,
        payload: values,
      });
    },
  });

  React.useEffect(() => {
    // notify after error
    if (!authentication.loading && authentication.error) {
      toast(authentication.errorMessage, {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
      });
    }

    if (authentication.authenticated) {
      toast(
        "Thank you for signing in! You're all set to continue your shopping adventure!",
        {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
        }
      );

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [authentication]);

  document.title = "CIIT Merch | Login";

  return (
    <React.Fragment>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3 mx-auto">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/home" className="d-block auth-logo">
                        <img src={weareLogo} alt="" height="45" />{" "}
                        {/* <span className="logo-txt">CIIT Merch ❤️</span> */}
                      </Link>
                    </div>
                    <div className="mb-0 mb-md-0 text-center">
                      <h5>CIIT Merch ❤️</h5>
                    </div>
                    <div className="auth-content my-auto">
                      <Form
                        className="custom-form mt-4 pt-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <Label className="form-label">Password</Label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="input-group auth-pass-inputgroup">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            <button
                              onClick={() => setPasswordShow(!passwordShow)}
                              className="btn btn-light shadow-none ms-0"
                              type="button"
                              id="password-addon"
                            >
                              <i className="mdi mdi-eye-outline"></i>
                            </button>
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="mt-3 d-grid">
                              <Button
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
                                  <span>Log In</span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
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
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication }) => ({ authentication });

export default withRouter(
  connect(mapStateToProps, { actionCreator })(MerchLogin)
);
