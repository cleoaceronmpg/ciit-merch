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
import { encrypt, decrypt } from "../../../helpers/crypto_helper";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const ForgotPassword = ({ app, authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Forgot Password";

  React.useEffect(() => {}, []);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Enter Your Email"),
    }),
    onSubmit: async (values) => {
      //   values.Password = encrypt(
      //     values.Password,
      //     process.env.REACT_APP_SECRET_KEY
      //   );
      //   const encryptedToken = encrypt(
      //     moment().format("HH:mm:ss"),
      //     process.env.REACT_APP_SECRET_KEY
      //   );
      //   values.Token = encodeURIComponent(encryptedToken);
      //   await props.actionCreator({
      //     type: types.REGISTER,
      //     payload: values,
      //   });
    },
  });

  const fetchEmailInfo = async () => {
    await props.actionCreator({
      type: types.CLEAR_AUTH,
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="forgot-password__container">
        {/* Render Breadcrumbs */}
        <Container className="p-0">
          <Row>
            <Col lg={12} xxl={12} md={12}>
              <Form
                className="needs-validation custom-form mt-4 pt-2 forgot-password__container-column"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="mb-3 m-4 forgot-password__container-form">
                  <Label className="form-label">Enter your email address</Label>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}

                  <div className="mb-3 mt-3">
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
                        <span>Forgot Password</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
      <Footer />
    </React.Fragment>
  );
};

// export default Register
const mapStateToProps = ({ app, authentication }) => ({
  app,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(ForgotPassword);
