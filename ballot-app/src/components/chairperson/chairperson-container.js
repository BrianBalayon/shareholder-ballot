import React, { Component } from "react";
import ChairpersonView from "./chairperson-view";
import { VALUE } from "../utils/constants/keys";
import { IS_CHAIRPERSON } from "../utils/constants/methods";
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
    const dataKey = cacheCallMethod(drizzle, drizzleState, IS_CHAIRPERSON);
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
    const { drizzle, drizzleState } = this.props;
    const { address, sharesOwned } = this.state;
    const stackId = cacheSendMethod(
      drizzle,
      drizzleState,
      "registerShareholder",
      address,
      sharesOwned
    );
    this.setState({ stackId });
  };

  setVotingMode = () => {
    const { drizzle, drizzleState } = this.props;
    const { votingMode } = this.state;
    const stackId = cacheSendMethod(
      drizzle,
      drizzleState,
      "setVotingMode",
      votingMode
    );
    this.setState({ stackId });
  };

  setVotingTimeline = () => {
    const { drizzle, drizzleState } = this.props;
    const { duration, timeUnit } = this.state;
    const stackId = cacheSendMethod(
      drizzle,
      drizzleState,
      "setVoteTimeline",
      duration,
      timeUnit
    );
    this.setState({ stackId });
  };

  beginVoting = () => {
    this.cacheSendMethodHelper("beginVoting");
  };

  endVoting = () => {
    this.cacheSendMethodHelper("endVoting");
  };

  countVotes = () => {
    this.cacheSendMethodHelper("countVotes");
  };

  releaseWinner = () => {
    this.cacheSendMethodHelper("releaseWinner");
  };

  render() {
    const { dataKey, stackId } = this.state;
    const { drizzleState } = this.props;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.isChairperson[dataKey];
    let isChairperson = false;
    if (data) {
      isChairperson = data[VALUE];
    }
    return (
      isChairperson && (
        <ChairpersonView
          drizzleState={drizzleState}
          onChangeHandler={this.textInputChangeHandler}
          onClickBeginVoting={this.beginVoting}
          onClickEndVoting={this.endVoting}
          onClickCountVotes={this.countVotes}
          onClickReleaseWinner={this.releaseWinner}
          onDropdownItemClick={this.dropdownItemClickHandler}
          onRegisterShareholderButtonClick={this.registerShareholder}
          onSetVotingModeButtonClick={this.setVotingMode}
          onSetVotingTimelineButtonClick={this.setVotingTimeline}
          stackId={stackId}
          {...this.state}
        />
      )
    );
  }
}
