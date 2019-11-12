import InputField from "./InputField";
import InputField2 from "./InputField2";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";

class Chairperson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChairpersonDataKey: null,
      stackId: null,
      address: "",
      sharesOwned: "",
      votingMode: "",
      timeUnit: "",
      duration: "",
      page: this.props.page
    };
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    // let drizzle know we want to watch the `myString` method
    const isChairpersonDataKey = contract.methods["isChairperson"].cacheCall({
      from: drizzleState.accounts[0]
    });

    // save the `dataKey` to local component state for later reference
    this.setState({ isChairpersonDataKey });
  }

  onTextInputChange = (key, e) => {
    this.setState({ [key]: e.target.value });
  };

  registerShareholder = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const { address, sharesOwned } = this.state;
    const stackId = contract.methods["registerShareholder"].cacheSend(
      address,
      sharesOwned,
      {
        from: drizzleState.accounts[0]
      }
    );
    this.setState({ stackId });
  };

  setVotingMode = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const { votingMode } = this.state;
    const stackId = contract.methods["setVotingMode"].cacheSend(votingMode, {
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };

  setVotingTimeline = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const { duration, timeUnit } = this.state;
    const stackId = contract.methods["setVoteTimeline"].cacheSend(
      duration,
      timeUnit,
      {
        from: drizzleState.accounts[0]
      }
    );
    this.setState({ stackId });
  };

  beginVoting = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const stackId = contract.methods["beginVoting"].cacheSend({
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };

  endVoting = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const stackId = contract.methods["endVoting"].cacheSend({
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };

  countVotes = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const stackId = contract.methods["countVotes"].cacheSend({
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };

  releaseWinner = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ShBallot;

    const stackId = contract.methods["releaseWinner"].cacheSend({
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];

    if (!txHash) return null;

    return `Transaction status: ${transactions[txHash] &&
      transactions[txHash].status}`;
  };

  render() {
    const { ShBallot } = this.props.drizzleState.contracts;
    const state = ShBallot.isChairperson[this.state.isChairpersonDataKey];
    let isChairperson = false;
    if (state) {
      isChairperson = state["value"];
    }
    if (!isChairperson) {
      return null;
    }
    return (
      <div>
        <h2> Chairperson </h2>
        <div>{this.getTxStatus()}</div>
        <InputField2
          calls="Register Shareholder"
          units="shareholder: address"
          units2="shares owned: uint"
          value1={this.state.address}
          value2={this.state.sharesOwned}
          key1="address"
          key2="sharesOwned"
          onChangeHandler={this.onTextInputChange}
          onSubmitHandler={this.registerShareholder}
        />
        <InputField
          calls="Set Voting Mode"
          units="voting mode: uint"
          value1={this.state.votingMode}
          key1="votingMode"
          onChangeHandler={this.onTextInputChange}
          onSubmitHandler={this.setVotingMode}
        />
        <InputField2
          calls="Set Voting Timeline"
          units="time unit: uint"
          units2="duration: uint"
          value1={this.state.timeUnit}
          value2={this.state.duration}
          key1="timeUnit"
          key2="duration"
          onChangeHandler={this.onTextInputChange}
          onSubmitHandler={this.setVotingTimeline}
        />
        <DropdownButton title="Voting Mode" onSelect={e => console.log(e)}>
          <Dropdown.Item eventKey={"OnePerShare"}>
            One Vote Per Share
          </Dropdown.Item>
          <Dropdown.Item eventKey={"OneVote"}>One Vote</Dropdown.Item>
        </DropdownButton>
        <ButtonToolbar>
          <Button variant="outline-secondary" onClick={this.beginVoting}>
            Begin Voting
          </Button>
          <Button variant="outline-secondary" onClick={this.endVoting}>
            End Voting
          </Button>
          <Button variant="outline-secondary" onClick={this.countVotes}>
            Count Votes
          </Button>
          <Button variant="outline-secondary" onClick={this.releaseWinner}>
            Release Winner
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Chairperson;
