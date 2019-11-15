import React from "react";
import Alert from "react-bootstrap/Alert";

const WinnerView = ({proposalNumber}) => {
    return (
        <Alert variant={"primary"}>
          Winning Proposal: <strong> Proposal #{proposalNumber}! </strong>
        </Alert>
    );
};

export default WinnerView;
