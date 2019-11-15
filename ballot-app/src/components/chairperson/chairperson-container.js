import React, { Component } from "react";
import ChairpersonView from "./chairperson-view";
import { VALUE } from "../utils/constants/keys";
import * as Method from "../utils/constants/methods";
import { cacheCallMethod, cacheSendMethod } from "../utils/helper-functions";

export default class ChairpersonContainer extends Component {
  state = {
    address: "",
    dataKey: null,
    duration: "",
    sharesOwned: "",
    stackId: null,
    timeUnit: 0,
    votingMode: ""
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

  dropdownItemClickHandler = (key, e) => {
    this.setState({ [key]: e });
  };

  registerShareholder = () => {
    const { address, sharesOwned } = this.state;
    this.cacheSendMethodHelper(
      Method.REGISTER_SHAREHOLDER,
      address,
      sharesOwned
    );
  };

  setVotingMode = () => {
    const { votingMode } = this.state;
    this.cacheSendMethodHelper(Method.SET_VOTING_MODE, votingMode);
  };

  setVotingTimeline = () => {
    const { duration, timeUnit } = this.state;
    this.cacheSendMethodHelper(Method.SET_VOTE_TIMELINE, duration, timeUnit);
  };

  beginVoting = () => this.cacheSendMethodHelper(Method.BEGIN_VOTING);

  endVoting = () => this.cacheSendMethodHelper(Method.END_VOTING);

  countVotes = () => this.cacheSendMethodHelper(Method.COUNT_VOTES);

  releaseWinner = () => this.cacheSendMethodHelper(Method.RELEASE_WINNER);

  render() {
    const { dataKey } = this.state;
    const { drizzle, drizzleState } = this.props;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.isChairperson[dataKey];
    let isChairperson = false;
    if (data) {
      isChairperson = data[VALUE];
    }
    if (!isChairperson) {
      return null;
    }
    return (
      <ChairpersonView
        drizzle={drizzle}
        drizzleState={drizzleState}
        isChairperson={isChairperson}
        onChangeHandler={this.textInputChangeHandler}
        onClickBeginVoting={this.beginVoting}
        onClickDropdownItem={this.dropdownItemClickHandler}
        onClickEndVoting={this.endVoting}
        onClickCountVotes={this.countVotes}
        onClickReleaseWinner={this.releaseWinner}
        onClickRegisterShareholder={this.registerShareholder}
        onClickSetVotingMode={this.setVotingMode}
        onClickSetVotingTimeline={this.setVotingTimeline}
        {...this.state}
      />
    );
  }
}
