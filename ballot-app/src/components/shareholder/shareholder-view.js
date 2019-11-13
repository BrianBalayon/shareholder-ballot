import React from "react";
import AllocateVotesByNumber from "./util/allocate-votes-by-count";
import AllocateVotesByPercentage from "./util/allocate-votes-by-percentage";
import SingleVote from "./util/single-vote";
import PublicInfo from "../public-info";
import TransactionContainer from "../transaction/transaction-container";

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
      <TransactionContainer drizzleState={drizzleState} stackId={stackId} />
      <h1>Shareholder</h1>
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
      <PublicInfo
        drizzle={drizzle}
        drizzleState={drizzleState}
        isChairperson={isChairperson}
      />
    </div>
  );
};

export default ShareholderView;
