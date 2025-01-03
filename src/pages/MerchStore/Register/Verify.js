import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import { Button, Container } from "reactstrap";

//import Breadcrumbs
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const Thankyou = ({ app, authentication, ...props }) => {
  let navigate = useNavigate();
  const [urlParamData, setUrlParamData] = React.useState(null);

  React.useEffect(() => {
    clearAuthBeforeVerify();
  }, []);

  React.useEffect(() => {
    if (authentication.emailVerifyData.length) {
      updateEmailVerifiedAccount(authentication.emailVerifyData[0].id);
    }
  }, [authentication.emailVerifyData]);

  React.useEffect(() => {
    urlParamData?.token && verifyAccountToken();
  }, [urlParamData]);

  React.useEffect(() => {
    const urlParams = getAllUrlParams();
    setUrlParamData(urlParams);
  }, []);

  // Get all URL parameters
  const getAllUrlParams = () => {
    const params = new URLSearchParams(window.location.search); // Access the query string
    const paramObject = {};

    // Iterate through each parameter and store it in an object
    params.forEach((value, key) => {
      paramObject[key] = value;
    });

    return paramObject; // Return the object with all parameters
  };

  const verifyAccountToken = async () => {
    await props.actionCreator({
      type: types.POST_VERIFY_ACCOUNT,
      payload: {
        token: urlParamData?.token,
      },
    });
  };

  const updateEmailVerifiedAccount = async (recordId) => {
    await props.actionCreator({
      type: types.POST_UPDATE_VERIFIED_ACCOUNT,
      payload: {
        id: recordId,
      },
    });
  };

  const clearAuthBeforeVerify = async () => {
    await props.actionCreator({
      type: types.CLEAR_AUTH,
    });
  };

  //meta title
  document.title = "CIIT Merch | Email Verification";

  return (
    <React.Fragment>
      <Header />

      <Container>
        <div
          style={{
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          {authentication.emailVerified &&
          authentication.emailVerifyData.length ? (
            <>
              <h5>
                <i className="fa fa-fw fa-check-circle verify__check-icon" />
                Thank you!
              </h5>
              <p className="mt-4">
                Your account has been successfully verified.{" "}
              </p>
              <p>You can now continue shopping.</p>
            </>
          ) : (
            authentication.errorMessage && (
              <p>Oops! Sorry, your {authentication.errorMessage}</p>
            )
          )}

          <Button
            className="btn btn-primary w-100 waves-effect waves-light"
            onClick={() => {
              navigate("/home");
            }}
            style={{
              backgroundColor: "#ff5400",
              borderColor: "#ff5400",
              maxWidth: "50%",
              height: 50,
              marginTop: 20,
            }}
            color="primary"
          >
            <span>Continue to Shopping</span>
          </Button>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, authentication }) => ({
  app,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Thankyou);
