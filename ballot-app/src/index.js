import React from "react";
import ReactDOM from "react-dom";
import { Drizzle, generateStore } from "drizzle";
import "./index.css";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import ShBallot from "./contracts/ShBallot.json";

const options = {
  contracts: [ShBallot],
  web3: { fallback: { type: "ws", url: "ws://127.0.0.1:7545" } }
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
