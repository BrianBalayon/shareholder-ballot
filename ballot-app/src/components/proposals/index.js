import React from "react";
import Card from "react-bootstrap/Card";
import {PROPOSAL_INFO} from "./util/constants";
import CardDeck from "react-bootstrap/CardDeck";
import {Accordion} from "react-bootstrap";
import Button from "bootstrap/js/src/button";

const Proposals = () => {
    return (
        <div>
            <h3>Proposals</h3>
            <CardDeck>
                {PROPOSAL_INFO.map(({description}, index) => (
                    <Card key={`proposal-${index}`}>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            Proposal #{index}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>
                                <Card.Body> {description} </Card.Body>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </CardDeck>
        </div>
    );
};

export default Proposals;
