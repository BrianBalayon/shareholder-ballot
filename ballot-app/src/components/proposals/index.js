import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {PROPOSAL_INFO} from "./util/constants";

const Proposals = () => {
    return (
        <div>
            <h3>Proposals</h3>
            <Accordion>
                {PROPOSAL_INFO.map(({description}, index) => (
                    <Card key={`proposal-${index}`}>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            Proposal #{index}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body className="text-left">{description}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </div>
    );
};

export default Proposals;
