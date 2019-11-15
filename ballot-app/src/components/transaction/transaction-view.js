import React from "react";
import Alert from "react-bootstrap/Alert";

const TransactionView = ({ status, variant }) => {
  return (
      <Alert variant={variant}>
          Transaction Status: <strong> {status} </strong>
      </Alert>
  );
};

export default TransactionView;
