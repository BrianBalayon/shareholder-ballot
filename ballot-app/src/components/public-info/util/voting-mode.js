import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { VOTING_MODE_INDEX_TO_STRING_ARRAY } from "./constants";
import { VALUE } from "../../utils/constants/keys";
import * as Method from "../../utils/constants/methods";
import { cacheCallMethod } from "../../utils/helper-functions";

class VotingMode extends Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(drizzle, drizzleState, Method.VOTING_MODE);
    this.setState({ dataKey });
  }

  render() {
    const { drizzleState } = this.props;
    const { dataKey } = this.state;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.votingMode[dataKey];
    let votingMode = 2;
    if (data) {
      votingMode = data[VALUE];
    }
    return (
      <ListGroup.Item>
        Voting Mode: <strong> {" "} {VOTING_MODE_INDEX_TO_STRING_ARRAY[Number(votingMode)]} </strong>
      </ListGroup.Item>
    );
  }
}

export default VotingMode;
