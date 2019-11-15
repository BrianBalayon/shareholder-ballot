import React from "react";
import TransactionView from "./transaction-view";
import { NOT_AVAILABLE, STATUS_TO_VARIANT_MAP } from "./util/constants";

const TransactionContainer = ({ drizzleState, stackId }) => {
  if (!drizzleState) {
    return null;
  }
  const { transactions, transactionStack } = drizzleState;
  const transactionHash = transactionStack[stackId];

  if (!transactionHash) return null;
  const status = transactions[transactionHash]
    ? transactions[transactionHash].status
    : NOT_AVAILABLE;
  const variant = STATUS_TO_VARIANT_MAP[status];

  return <TransactionView status={status} variant={variant} />;
};

export default TransactionContainer;
