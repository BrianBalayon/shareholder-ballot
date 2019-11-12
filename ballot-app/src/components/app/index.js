import React, { Component } from "react";
import "./app.css";
import ChairpersonContainer from "../chairperson/chairperson-container";
import Loading from "../loading";
import PhaseContainer from "../phase/phase-container";

export default class App extends Component {
  state = {
    drizzleState: null,
    isChairperson: false,
    loading: true
  };

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { drizzle } = this.props;
    const { drizzleState, loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div className="App">
        <h1>SHAREHOLDER BALLOT</h1>
        <PhaseContainer drizzle={drizzle} drizzleState={drizzleState} />
        <ChairpersonContainer drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}
