import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import NumberProposals from "./util/number-proposals";
import NumberRemainingVotes from "./util/number-remaining-votes";
import VotingDeadline from "./util/voting-deadline";
import VotingMode from "./util/voting-mode";
import Card from "react-bootstrap/Card";

const PublicInfo = ({drizzle, drizzleState, isChairperson}) => {
    return (
        <div>
            <h3>Public Information</h3>
            <Card>
                <VotingMode drizzle={drizzle} drizzleState={drizzleState}/>
                {!isChairperson && (
                    <NumberRemainingVotes
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                    />
                )}
                <VotingDeadline drizzle={drizzle} drizzleState={drizzleState}/>
                <NumberProposals drizzle={drizzle} drizzleState={drizzleState}/>
            </ Card>
        </div>
    );
};

export default PublicInfo;
