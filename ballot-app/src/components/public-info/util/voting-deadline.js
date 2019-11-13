import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { VALUE } from "../../utils/constants/keys";
import * as Method from "../../utils/constants/methods";
import { cacheCallMethod } from "../../utils/helper-functions";

class VotingDeadline extends Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(
      drizzle,
      drizzleState,
      Method.VOTING_DEADLINE
    );
    this.setState({ dataKey });
  }

  render() {
    const { drizzleState } = this.props;
    const { dataKey } = this.state;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.votingDeadline[dataKey];
    let votingDeadline = "N/A";
    if (data) {
      votingDeadline = Number(data[VALUE]);
      if (votingDeadline !== 0) {
        const date = new Date(votingDeadline * 1000);
        votingDeadline = date.toLocaleString();
      }
    }
    return (
      <ListGroup.Item>
        <strong>Voting Deadline:</strong> {votingDeadline}
      </ListGroup.Item>
    );
  }
}

export default VotingDeadline;
