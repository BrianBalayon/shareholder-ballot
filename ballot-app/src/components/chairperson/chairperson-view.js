import React from "react";
import RegisterShareholder from "./util/register-shareholder";
import SetVotingMode from "./util/set-voting-mode";
import SetVotingTimeline from "./util/set-voting-timeline";
import VotingModeButtonToolbar from "./util/voting-mode-button-toolbar";
import PublicInfo from "../public-info";
import TransactionView from "../transaction/transaction-container";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";

const ChairpersonView = ({
                             address,
                             drizzle,
                             drizzleState,
                             duration,
                             isChairperson,
                             onChangeHandler,
                             onClickBeginVoting,
                             onClickDropdownItem,
                             onClickEndVoting,
                             onClickCountVotes,
                             onClickReleaseWinner,
                             onClickRegisterShareholder,
                             onClickSetVotingMode,
                             onClickSetVotingTimeline,
                             sharesOwned,
                             stackId,
                             timeUnit
                         }) => {
    return (
        <div>
            <TransactionView drizzleState={drizzleState} stackId={stackId}/>
            <h2>You are the <strong> Chairperson </strong> </h2>
            <Row>
                <Col>
                    <h3> Actions You Can Take </h3>
                    <RegisterShareholder
                        address={address}
                        onChangeHandler={onChangeHandler}
                        onClickHandler={onClickRegisterShareholder}
                        sharesOwned={sharesOwned}
                    />
                    <SetVotingMode
                        onClickDropdownItem={onClickDropdownItem}
                        onSetVotingModeButtonClick={onClickSetVotingMode}
                    />
                    <SetVotingTimeline
                        duration={duration}
                        onChangeHandler={onChangeHandler}
                        onClickDropdownItem={onClickDropdownItem}
                        onSetVotingTimelineButtonClick={onClickSetVotingTimeline}
                        timeUnit={timeUnit}
                    />
                    <VotingModeButtonToolbar
                        onClickBeginVoting={onClickBeginVoting}
                        onClickEndVoting={onClickEndVoting}
                        onClickCountVotes={onClickCountVotes}
                        onClickReleaseWinner={onClickReleaseWinner}
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

export default ChairpersonView;
