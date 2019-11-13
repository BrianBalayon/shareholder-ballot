import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { VALUE } from "../../utils/constants/keys";
import * as Method from "../../utils/constants/methods";
import { cacheCallMethod } from "../../utils/helper-functions";

class NumberProposals extends Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const dataKey = cacheCallMethod(drizzle, drizzleState, Method.NUM_CHOICES);
    this.setState({ dataKey });
  }

  render() {
    const { drizzleState } = this.props;
    const { dataKey } = this.state;
    const { ShBallot } = drizzleState.contracts;
    const data = ShBallot.numChoices[dataKey];
    let numberProposals = "N/A";
    if (data) {
      numberProposals = data[VALUE];
    }

    return (
      <ListGroup.Item>
        <strong># of Proposals:</strong> {numberProposals}
      </ListGroup.Item>
    );
  }
}

export default NumberProposals;
