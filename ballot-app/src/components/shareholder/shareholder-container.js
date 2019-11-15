import React, { Component } from "react";
import ShareholderView from "./shareholder-view";
import { VALUE } from "../utils/constants/keys";
import * as Method from "../utils/constants/methods";
import { cacheCallMethod, cacheSendMethod } from "../utils/helper-functions";

class ShareholderContainer extends Component {
  state = {
    count: "",
    dataKey: null,
    percentage: "",
    proposalByNumber: "",
    proposalByPercentage: "",
    proposalBySingleVote: ""
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(
      drizzle,
      drizzleState,
      Method.IS_CHAIRPERSON
    );
    this.setState({ dataKey });
  }

  cacheSendMethodHelper = (methodName, ...args) => {
    const { drizzle, drizzleState } = this.props;
    let cacheSendArgs = [drizzle, drizzleState, methodName].concat(args);
    const stackId = cacheSendMethod(...cacheSendArgs);
    this.setState({ stackId });
  };

  textInputChangeHandler = (key, e) => {
    this.setState({ [key]: e.target.value });
  };

  allocateVotesByNumber = () => {
    const { count, proposalByNumber } = this.state;
    this.cacheSendMethodHelper(
      Method.ALLOCATE_VOTES_BY_NUMBER,
      proposalByNumber,
      count
    );
  };

  allocateVotesByPercentage = () => {
    const { percentage, proposalByPercentage } = this.state;
    this.cacheSendMethodHelper(
      Method.ALLOCATE_VOTES_BY_PERCENTAGE,
      proposalByPercentage,
      percentage
    );
  };

  singleVote = () => {
    const { proposalBySingleVote } = this.state;
    this.cacheSendMethodHelper(Method.SINGLE_VOTE, proposalBySingleVote);
  };

  render() {
    const { dataKey } = this.state;
    const { drizzle, drizzleState } = this.props;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.isChairperson[dataKey];
    let isChairperson = false;
    if (data) {
      isChairperson = data[VALUE];
    }
    return (
      !isChairperson && (
        <ShareholderView
          drizzle={drizzle}
          drizzleState={drizzleState}
          isChairperson={isChairperson}
          onChangeHandler={this.textInputChangeHandler}
          onClickAllocateVotesByNumber={this.allocateVotesByNumber}
          onClickAllocateVotesByPercentage={this.allocateVotesByPercentage}
          onClickSingleVote={this.singleVote}
          {...this.state}
        />
      )
    );
  }
}

export default ShareholderContainer;
