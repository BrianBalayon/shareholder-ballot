import React from "react";
import Alert from "react-bootstrap/Alert";

const PhaseView = ({stateName, variant}) => {
    return (
        <Alert variant={variant} ClassName="alert">
            Phase: <strong> {stateName} </strong>
        </Alert>
    );
};

export default PhaseView;
