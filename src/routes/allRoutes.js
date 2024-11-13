import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

import UserProfile from "../pages/Authentication/user-profile";

// Merch Store
import Home from "../pages/MerchStore/Home";
import Catalog from "../pages/MerchStore/Catalog";
import ShoppingCart from "../pages/MerchStore/Cart";
import Checkout from "../pages/MerchStore/Checkout";
import Thankyou from "../pages/MerchStore/Checkout/ThankyouScreen";
import ProductDetails from "../pages/MerchStore/Catalog/ProductDetails";

const userRoutes = [
  //dashboard
  { path: "/admin/dashboard", component: <Dashboard /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const authRoutes = [
  //authencation page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/home", component: <Home /> },
  { path: "/catalog", component: <Catalog /> },
  { path: "/product/:id", component: <ProductDetails /> },
  { path: "/cart", component: <ShoppingCart /> },
  { path: "/checkout", component: <Checkout /> },
  { path: "/checkout/success/:id", component: <Thankyou /> },
];

export { userRoutes, authRoutes };
