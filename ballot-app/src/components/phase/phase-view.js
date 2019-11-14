import React from "react";
import Alert from "react-bootstrap/Alert";

const PhaseView = ({stateName, variant}) => {
    return (
        <Alert variant={variant} ClassName="alert">PHASE: {stateName}</Alert>
    );
};

export default PhaseView;
