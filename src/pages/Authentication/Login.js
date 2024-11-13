import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
// import images
import weareLogo from "../../assets/images/weare-logo.png";
import { LOGIN_USER } from "../../store/authentication/types";
import { actionCreator } from "../../store";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Login = ({ authentication, ...props }) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      props.actionCreator({
        type: LOGIN_USER,
        payload: {
          user: values,
          history: props.router.navigate,
        },
      });
    },
  });

  React.useEffect(() => {
    // notify after error
    if (authentication.error) {
      setErrorMessage(authentication.errorMessage);
    }

    if (authentication.authenticated) {
      navigate(authentication.data.data.accessUrl[0].url);
    }
  }, [authentication]);

  document.title = "Login | EMS | Camp";

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
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={weareLogo} alt="" height="28" />{" "}
                        <span className="logo-txt">EMS</span>
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
                        <div className=" text-center">
                          {errorMessage ? (
                            <Alert color="danger">{errorMessage}</Alert>
                          ) : (
                            <div>&nbsp;</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Username</Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder="Enter username"
                            type="username"
                            //onChange={validation.handleChange}
                            onChange={(value) => {
                              validation.handleChange(value);
                              //setErrorMessage("");
                            }}
                            onBlur={(value) => {
                              validation.handleBlur(value);
                              //setErrorMessage("");
                            }}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
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
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Seoulful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication }) => ({ authentication });

export default withRouter(connect(mapStateToProps, { actionCreator })(Login));
