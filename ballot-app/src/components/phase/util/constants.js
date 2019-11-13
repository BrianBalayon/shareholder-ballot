export const DEFAULT_STATE = {
  stateName: "N/A",
  variant: "dark"
};

export const STATE_KEY = "state";

export const STATES = [
  {
    stateName: "Initialized",
    variant: "secondary"
  },
  {
    stateName: "Registering Shareholders",
    variant: "warning"
  },
  {
    stateName: "Voting",
    variant: "info"
  },
  {
    stateName: "Voting Closed",
    variant: "danger"
  },
  {
    stateName: "Winner Released",
    variant: "success"
  }
];
