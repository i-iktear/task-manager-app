import React from "react";
import { Alert } from "react-bootstrap";

const Toaster = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Toaster.defaultProps = {
  variant: "info",
};

export default Toaster;
