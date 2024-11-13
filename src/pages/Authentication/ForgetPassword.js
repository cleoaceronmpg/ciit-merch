import React from 'react';
import { connect } from 'react-redux';

import { FORGET_PASSWORD } from '../../store/auth/forgetpwd/types';

import { actionCreator } from '../../store';

import {
  Row,
  Col,
  Alert,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from 'reactstrap';

import { Link } from 'react-router-dom';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// import images
import logo from '../../assets/images/logo-sm.svg';
import stEngrLogo from '../../assets/images/ste-logo.png';

import CarouselPage from '../AuthenticationInner/CarouselPage';

const ForgetPasswordPage = ({ history, forgetPassword }) => {
  //meta title
  document.title = 'Forget Password | EMS | Camp';

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please Enter Your Email'),
    }),
    onSubmit: (values) => {
      props.actionCreator({
        type: FORGET_PASSWORD,
        payload: {
          user: values,
          history,
        },
      });
    },
  });

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
                        <img src={stEngrLogo} alt="" height="28" />{' '}
                        <span className="logo-txt">EMS</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Reset Password</h5>
                        {/* <p className="text-muted mt-2">
                          Reset Password with Minia.
                        </p> */}
                      </div>
                      <div
                        className="alert alert-success text-center my-4"
                        role="alert"
                      >
                        Enter your Email and instructions will be sent to you!
                      </div>

                      {forgetPassword.forgetError &&
                      forgetPassword.forgetError ? (
                        <Alert color="danger" style={{ marginTop: '13px' }}>
                          {forgetPassword.forgetError}
                        </Alert>
                      ) : null}
                      {forgetPassword.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: '13px' }}>
                          {forgetPassword.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <Form
                        className="custom-form mt-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ''}
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

                        <Row className="mb-3">
                          <Col className="text-end">
                            <button
                              className="btn btn-primary w-100 waves-effect waves-light"
                              type="submit"
                            >
                              Reset
                            </button>
                          </Col>
                        </Row>
                      </Form>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Remember It ?{' '}
                          <Link
                            to="/login"
                            className="text-primary fw-semibold"
                          >
                            {' '}
                            Sign In{' '}
                          </Link>{' '}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} ST Engineering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            {/* <CarouselPage /> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ forgetPassword }) => ({ forgetPassword });

export default connect(mapStateToProps, { actionCreator })(ForgetPasswordPage);
