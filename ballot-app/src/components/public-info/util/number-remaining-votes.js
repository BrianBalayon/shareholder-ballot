import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { VALUE } from "../../utils/constants/keys";
import * as Method from "../../utils/constants/methods";
import { cacheCallMethod } from "../../utils/helper-functions";

class NumberRemainingVotes extends Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(
      drizzle,
      drizzleState,
      Method.GET_NUM_REMAINING_VOTES
    );
    this.setState({ dataKey });
  }

  render() {
    const { drizzleState } = this.props;
    const { dataKey } = this.state;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.getNumRemainingVotes[dataKey];
    let numRemainingVotes = "N/A";
    if (data) {
      numRemainingVotes = data[VALUE];
    }
    return (
      <ListGroup.Item>
        Number of Remaining Votes: <strong> {numRemainingVotes} </strong>
      </ListGroup.Item>
    );
  }
}

export default NumberRemainingVotes;
