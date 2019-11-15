import React from "react";
import AllocateVotesByNumber from "./util/allocate-votes-by-count";
import AllocateVotesByPercentage from "./util/allocate-votes-by-percentage";
import SingleVote from "./util/single-vote";
import PublicInfo from "../public-info";
import TransactionContainer from "../transaction/transaction-container";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";

const ShareholderView = ({
                             count,
                             drizzle,
                             drizzleState,
                             isChairperson,
                             onChangeHandler,
                             onClickAllocateVotesByNumber,
                             onClickAllocateVotesByPercentage,
                             onClickSingleVote,
                             percentage,
                             proposalByNumber,
                             proposalByPercentage,
                             proposalBySingleVote,
                             stackId
                         }) => {
    return (
        <div>
            <TransactionContainer drizzleState={drizzleState} stackId={stackId}/>
            <h2> You are a <strong> Shareholder </strong> </h2>
            <Row>
                <Col>
                    <h3>Actions You Can Make</h3>
                    <AllocateVotesByNumber
                        count={count}
                        onChangeHandler={onChangeHandler}
                        onClickAllocateVotesByNumber={onClickAllocateVotesByNumber}
                        proposal={proposalByNumber}
                    />
                    <AllocateVotesByPercentage
                        onChangeHandler={onChangeHandler}
                        onClickAllocateVotesByPercentage={onClickAllocateVotesByPercentage}
                        percentage={percentage}
                        proposal={proposalByPercentage}
                    />
                    <SingleVote
                        onChangeHandler={onChangeHandler}
                        onClickSingleVote={onClickSingleVote}
                        proposal={proposalBySingleVote}
                    />
                </Col>
                <Col>
                    <PublicInfo
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        isChairperson={isChairperson}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ShareholderView;
