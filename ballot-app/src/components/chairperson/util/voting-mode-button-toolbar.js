import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import ButtonGroup from "react-bootstrap/ButtonGroup";

const VotingModeButtonToolbar = ({
                                     onClickBeginVoting,
                                     onClickEndVoting,
                                     onClickCountVotes,
                                     onClickReleaseWinner
                                 }) => {
    return (
        <Container>
            <div className="d-flex flex-column">
                <ButtonGroup>
                    <Button variant="outline-success" onClick={onClickBeginVoting}>Begin Voting</Button>
                    <Button variant="outline-danger" onClick={onClickEndVoting}>End Voting</Button>
                    <Button variant="outline-primary" onClick={onClickCountVotes}>Count Votes</Button>
                    <Button variant="outline-warning" onClick={onClickReleaseWinner}>Release Winner</Button>
                </ButtonGroup>
            </div>
        </Container>
    );
};

export default VotingModeButtonToolbar;
