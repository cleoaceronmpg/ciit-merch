import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import Layout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import { actionCreator, types } from "./store";

import Login from "./pages/MerchStore/MerchLogin";

// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

const App = ({ authentication, app, ...props }) => {
  React.useEffect(() => {
    fetchProducts();
    fetchShippingRate();
  }, []);

  const fetchProducts = async () => {
    await props.actionCreator({
      type: types.GET_PRODUCTS,
    });
  };

  const fetchShippingRate = async () => {
    await props.actionCreator({
      type: types.GET_SHIPPING_RATE,
    });
  };

  return (
    <React.Fragment>
      {/* <Router> */}
      <Routes>
        {!authentication.authenticated && (
          <Route path="/login" element={<Login />} />
        )}

        {authRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {userRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware path={route.path} authentication={authentication}>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
        <Route path="*" element={<Navigate to="/pages-404" replace />} />
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication, app, ...state }) => {
  return {
    layout: state.layout,
    authentication,
    app,
  };
};

export default connect(mapStateToProps, { actionCreator })(App);
