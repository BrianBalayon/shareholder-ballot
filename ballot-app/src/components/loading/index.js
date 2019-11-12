import React from "react";
import ReactLoading from "react-loading";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Loading = ({ color, height, type, width }) => (
  <Container>
    <Row>
      <Col></Col>
      <Col xs={4}>
        <ReactLoading type={type} color={color} height={height} width={width} />
      </Col>
      <Col></Col>
    </Row>
  </Container>
);

Loading.defaultProps = {
  color: "black",
  height: 400,
  type: "bars",
  width: 400
};

export default Loading;
