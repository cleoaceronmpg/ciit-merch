import React from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = ({ authentication, ...props }) => {
  if (!authentication.authenticated) {
    return (
      <Navigate to={{ pathname: "/home", state: { from: props.location } }} />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
