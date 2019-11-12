import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PhaseView = ({ stateName, variant }) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Alert variant={variant}>PHASE: {stateName}</Alert>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default PhaseView;
