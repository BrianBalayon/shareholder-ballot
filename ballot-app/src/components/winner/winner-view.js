import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const WinnerView = ({ proposalNumber }) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <Alert variant={"primary"}>
            <h2>Winning Proposal: Proposal #{proposalNumber}!</h2>
          </Alert>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default WinnerView;
