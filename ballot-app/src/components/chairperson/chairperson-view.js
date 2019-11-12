import React from "react";
import RegisterShareholder from "./register-shareholder";
import SetVotingMode from "./set-voting-mode";
import SetVotingTimeline from "./set-voting-timeline";
import VotingModeButtonToolbar from "./voting-mode-button-toolbar";
import TransactionView from "../transaction/transaction-container";

const ChairpersonView = ({
  address,
  drizzleState,
  duration,
  onChangeHandler,
  onClickBeginVoting,
  onClickEndVoting,
  onClickCountVotes,
  onClickReleaseWinner,
  onDropdownItemClick,
  onSetVotingModeButtonClick,
  onSetVotingTimelineButtonClick,
  onRegisterShareholderButtonClick,
  sharesOwned,
  stackId,
  timeUnit
}) => {
  return (
    <div>
      <TransactionView drizzleState={drizzleState} stackId={stackId} />
      <h1>Chairperson</h1>
      <RegisterShareholder
        address={address}
        onChangeHandler={onChangeHandler}
        onClickHandler={onRegisterShareholderButtonClick}
        sharesOwned={sharesOwned}
      />
      <SetVotingMode
        onDropdownItemClick={onDropdownItemClick}
        onSetVotingModeButtonClick={onSetVotingModeButtonClick}
      />
      <SetVotingTimeline
        duration={duration}
        onChangeHandler={onChangeHandler}
        onDropdownItemClick={onDropdownItemClick}
        onSetVotingTimelineButtonClick={onSetVotingTimelineButtonClick}
        timeUnit={timeUnit}
      />
      <VotingModeButtonToolbar
        onClickBeginVoting={onClickBeginVoting}
        onClickEndVoting={onClickEndVoting}
        onClickCountVotes={onClickCountVotes}
        onClickReleaseWinner={onClickReleaseWinner}
      />
    </div>
  );
};

export default ChairpersonView;
