import React, { Component } from "react";
import LandingPage from "./components/Landing.js";
import "./App.css";
import ReadPhase from "./components/ReadState";

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
    const { drizzleState } = this.state;
    if (this.state.loading) {
      return "Loading...";
    }
    return (
      <div className="App">
        <h1> SH-BALLOT </h1>
        <ReadPhase drizzle={drizzle} drizzleState={drizzleState} />
        <LandingPage />
      </div>
    );
  }
}
