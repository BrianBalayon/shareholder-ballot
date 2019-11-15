import React from "react";
import Card from "react-bootstrap/Card";
import {PROPOSAL_INFO} from "./util/constants";
import {Accordion} from "react-bootstrap";

const Proposals = () => {
    return (
        <div>
            <h3>Proposals</h3>
            <Accordion defaultActiveKey="0">
                {PROPOSAL_INFO.map(({description}, index) => (
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            Proposal #{index}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>{description}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </div>
    );
};

export default Proposals;
