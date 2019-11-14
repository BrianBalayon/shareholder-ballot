import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const VotingModeButtonToolbar = ({
                                     onClickBeginVoting,
                                     onClickEndVoting,
                                     onClickCountVotes,
                                     onClickReleaseWinner
                                 }) => {
    return (
        <Container>
            <ButtonGroup>
                <Button onClick={onClickBeginVoting}>Begin Voting</Button>
                <Button onClick={onClickEndVoting}>End Voting</Button>
                <Button onClick={onClickCountVotes}>Count Votes</Button>
                <Button onClick={onClickReleaseWinner}>Release Winner</Button>
            </ButtonGroup>
        </Container>
    );
};

export default VotingModeButtonToolbar;
