import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import NumberProposals from "./util/number-proposals";
import NumberRemainingVotes from "./util/number-remaining-votes";
import VotingDeadline from "./util/voting-deadline";
import VotingMode from "./util/voting-mode";

const PublicInfo = ({drizzle, drizzleState, isChairperson}) => {
    return (
        <div>
            <ListGroup variant="flush">
                <h3>Public Information</h3>
                <VotingMode drizzle={drizzle} drizzleState={drizzleState}/>
                {!isChairperson && (
                    <NumberRemainingVotes
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                    />
                )}
                <VotingDeadline drizzle={drizzle} drizzleState={drizzleState}/>
                <NumberProposals drizzle={drizzle} drizzleState={drizzleState}/>
            </ListGroup>
        </div>
    );
};

export default PublicInfo;
