import React, { Component } from "react";
import WinnerView from "./winner-view";
import { VALUE } from "../utils/constants/keys";
import * as Method from "../utils/constants/methods";
import { cacheCallMethod } from "../utils/helper-functions";

class WinnerContainer extends Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(drizzle, drizzleState, Method.GET_WINNER);
    this.setState({ dataKey });
  }

  render() {
    const { drizzleState } = this.props;
    const { dataKey } = this.state;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.getWinner[dataKey];
    let winner = null;
    if (data) {
      winner = data[VALUE];
    }
    if (!winner) {
      return null;
    }
    return <WinnerView proposalNumber={winner} />;
  }
}

export default WinnerContainer;
