import React, { Component } from "react";
import "./App.css";
import Chairperson from "./components/chairperson/chairperson-container";
import PublicInfo from "./components/PublicInfo";
import PhaseContainer from "./components/phase/phase-container";
import Shareholder from "./components/Shareholder";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      drizzleState: null
    };
  }

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
    if (loading) {
      return "Loading...";
    } else {
      return (
        <div className="App">
          <h1>SHAREHOLDER BALLOT</h1>
          <PhaseContainer drizzle={drizzle} drizzleState={drizzleState} />
          <Chairperson drizzle={drizzle} drizzleState={drizzleState} />
          <Shareholder drizzle={drizzle} drizzleState={drizzleState} />
          <PublicInfo drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }
  }
}
