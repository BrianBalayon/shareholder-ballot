import React, { Component } from "react";
import { cacheCallMethod } from "../utils/helper-functions";
import { DEFAULT_STATE, STATE_KEY, STATES } from "./phase-constants";
import PhaseView from "./phase-view";

export default class PhaseContainer extends Component {
  state = {
    dataKey: null
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(drizzle, drizzleState, STATE_KEY);
    this.setState({ dataKey });
  }

  render() {
    const { ShBallot } = this.props.drizzleState.contracts;
    const stateString = ShBallot.state[this.state.dataKey];
    const renderConfig = stateString
      ? STATES[Number(stateString.value)]
      : DEFAULT_STATE;
    return <PhaseView {...renderConfig} />;
  }
}
