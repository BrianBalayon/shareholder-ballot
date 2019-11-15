import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const TransactionView = ({ status, variant }) => {
  return (
      <Alert variant={variant}>
          Transaction Status: <strong> {status} </strong>
      </Alert>
  );
};

export default TransactionView;
