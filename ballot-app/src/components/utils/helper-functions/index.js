export const cacheCallMethod = (drizzle, drizzleState, methodName) => {
  const contract = drizzle.contracts.ShBallot;
  const dataKey = contract.methods[methodName].cacheCall({
    from: drizzleState.accounts[0]
  });
  return dataKey;
};

export const cacheSendMethod = (drizzle, drizzleState, methodName, ...args) => {
  const contract = drizzle.contracts.ShBallot;
  args.push({
    from: drizzleState.accounts[0]
  });
  const stackId = contract.methods[methodName].cacheSend(...args);
  return stackId;
};
