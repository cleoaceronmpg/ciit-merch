import React from "react";
import { Navigate } from "react-router-dom";

//Utility
import PageMaintenance from "../pages/Utility/PageMaintenance";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import AuthLogout from "../pages/AuthenticationInner/Logout";
// import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

import UserProfile from "../pages/Authentication/user-profile";

// Merch Store
import Home from "../pages/MerchStore/Home";
import Catalog from "../pages/MerchStore/Catalog";
import ShoppingCart from "../pages/MerchStore/Cart";
import Checkout from "../pages/MerchStore/Checkout";
import Thankyou from "../pages/MerchStore/Checkout/ThankyouScreen";
import ProductDetails from "../pages/MerchStore/Catalog/ProductDetails";
import Register from "../pages/MerchStore/Register";
import MerchLogin from "../pages/MerchStore/MerchLogin";
import TermsAndCondition from "../pages/MerchStore/TermsAndCondition";
import PrivacyPolicy from "../pages/MerchStore/TermsAndCondition/PrivacyPolicy";
import Profile from "../pages/MerchStore/Profile";
import Search from "../pages/MerchStore/Search";
import Verify from "../pages/MerchStore/Register/Verify";
import ForgotPassword from "../pages/MerchStore/MerchLogin/ForgotPassword";

const userRoutes = [
  //dashboard
  { path: "/admin/dashboard", component: <Dashboard /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const authRoutes = [
  { path: "/home", component: <Home /> },
  //authencation page
  { path: "/logout", component: <Logout /> },
  // { path: "/forgot-password", component: <ForgetPwd /> },

  //AuthenticationInner pages
  { path: "/page-login", component: <PageLogin /> },
  { path: "/page-register", component: <PageRegister /> },
  { path: "/page-recoverpw", component: <RecoverPassword /> },
  { path: "/page-logout", component: <AuthLogout /> },

  //Utility page
  { path: "/pages-maintenance", component: <PageMaintenance /> },
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/", exact: true, component: <Navigate to="/home" /> },

  //custom page
  { path: "/catalog", component: <Catalog /> },
  { path: "/product/:id", component: <ProductDetails /> },
  { path: "/cart", component: <ShoppingCart /> },
  { path: "/checkout", component: <Checkout /> },
  { path: "/checkout/success", component: <Thankyou /> },
  { path: "/login", component: <MerchLogin /> },
  { path: "/register", component: <Register /> },
  { path: "/terms-condition", component: <TermsAndCondition /> },
  { path: "/privacy-policy", component: <PrivacyPolicy /> },
  { path: "/profile", component: <Profile /> },
  { path: "/search/:key", component: <Search /> },
  { path: "/verify", component: <Verify /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
];

export { userRoutes, authRoutes };
