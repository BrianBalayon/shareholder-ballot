import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const WinnerView = ({proposalNumber}) => {
    return (
        <Alert variant={"primary"}>
          Winning Proposal: <strong> Proposal #{proposalNumber}! </strong>
        </Alert>
    );
};

export default WinnerView;
