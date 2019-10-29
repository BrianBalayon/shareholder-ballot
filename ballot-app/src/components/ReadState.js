import React, { Component } from "react";

const STATES = [
  "Initialize",
  "Registering Voters",
  "Voting",
  "Done",
  "Winner Released"
];

export default class ReadState extends Component {
  state = {
    dataKey: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ShBallot;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["state"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    const { ShBallot } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const stateString = ShBallot.state[this.state.dataKey];
    let text = stateString ? STATES[Number(stateString.value)] : "N/A";
    return <p>PHASE: {text}</p>;
  }
}
