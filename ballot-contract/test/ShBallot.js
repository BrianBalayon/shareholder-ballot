const ShBallot = artifacts.require("../contracts/ShBallot.sol");

const sleep = numSeconds => {
  return new Promise(resolve => setTimeout(resolve, numSeconds * 1000));
};

contract("ShBallot", accounts => {
  let shBallot;
  let chairperson = accounts[0];
  let voter1 = accounts[1];
  let voter2 = accounts[2];
  let errTypes = require("./exceptions.js").errTypes;
  let tryCatch = require("./exceptions.js").tryCatch;

  beforeEach("setup contract", async () => {
    shBallot = await ShBallot.new(chairperson);
  });

  it("Should be in Phase.Regs (1) upon deploying the smart contract", async () => {
    // Get state from public variable getter
    const storedPhase = await shBallot.state.call();
    assert.equal(storedPhase, 1, "Incorrect phase!");
  });

  it("Should be able to have chairperson register other accounts and they can access the correct number of votes", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    const numRemainingVotes = await shBallot.getNumRemainingVotes({
      from: voter1
    });
    assert.equal(numRemainingVotes, 10, "Incorrect number of votes!");
  });

  it("Should not let a voter begin voting -- only chairperson can begin voting", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.setVotingMode(1, { from: chairperson });
    await shBallot.setVoteTimeline(10, 2, { from: chairperson });
    await tryCatch(shBallot.beginVoting({ from: voter1 }), errTypes.revert);
  });

  it("Should not let a non-registered voter tries to access their number of votes", async () => {
    await tryCatch(
      shBallot.getNumRemainingVotes({ from: voter2 }),
      errTypes.revert
    );
  });

  it("Should be in Phase.Vote (2)", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1, { from: chairperson });
    await shBallot.setVoteTimeline(10, 2, { from: chairperson });
    await shBallot.beginVoting({ from: chairperson });
    const storedPhase = await shBallot.state.call();
    assert.equal(storedPhase, 2, "Incorrect phase!");
  });

  it("Should have voters have only one vote if in VoteMode.OneVote (1)", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1);
    const numRemainingVotes = await shBallot.getNumRemainingVotes({
      from: voter1
    });
    assert.equal(numRemainingVotes, 1, "Incorrect number of votes!");
  });

  it("Should not let a voter allocate votes by number if in VoteMode.OneVote", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting({ from: chairperson });
    await tryCatch(
      shBallot.allocateVotesByNumber(0, 5, { from: voter1 }),
      errTypes.revert
    );
  });

  it("Should not let a voter allocate votes by percentage if in VoteMode.OneVote", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting({ from: chairperson });
    await tryCatch(
      shBallot.allocateVotesByPercentage(0, 50, { from: voter1 }),
      errTypes.revert
    );
  });

  it("Should have the correct number of votes after calling allocateVotesByPercentage", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting({ from: chairperson });
    await shBallot.allocateVotesByPercentage(0, 50, { from: voter1 });
    const numRemainingVotes1 = await shBallot.getNumRemainingVotes({
      from: voter1
    });
    assert.equal(numRemainingVotes1, 5, "Incorrect number of votes!");

    await shBallot.allocateVotesByPercentage(1, 60, { from: voter2 });
    const numRemainingVotes2 = await shBallot.getNumRemainingVotes({
      from: voter2
    });
    assert.equal(numRemainingVotes2, 4, "Incorrect number of votes!");
  });

  it("Should not let a voter see the winner early", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting({ from: chairperson });
    await shBallot.allocateVotesByNumber(0, 5, { from: voter1 });
    await shBallot.allocateVotesByNumber(1, 6, { from: voter2 });
    await shBallot.endVoting({ from: chairperson });
    await shBallot.countVotes({ from: chairperson });
    await tryCatch(shBallot.getWinner({ from: voter1 }), errTypes.revert);
  });

  it("Should have the correct proposal as winner", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting({ from: chairperson });
    await shBallot.allocateVotesByNumber(0, 5, { from: voter1 });
    await shBallot.allocateVotesByNumber(1, 6, { from: voter2 });
    await shBallot.endVoting({ from: chairperson });
    await shBallot.countVotes({ from: chairperson });
    await shBallot.releaseWinner({ from: chairperson });
    const winner = await shBallot.getWinner({ from: voter1 });
    assert.equal(winner, 1, "Incorrect winner!");
  });

  it("Should not let voters vote after the deadline has passed", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await shBallot.beginVoting({ from: chairperson });
    await sleep(3);
    await tryCatch(
      shBallot.allocateVotesByNumber(0, 5, { from: voter1 }),
      errTypes.revert
    );
  });

  it("Should not let voters vote if not in Phase.Vote", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await shBallot.beginVoting({ from: chairperson });
    await shBallot.allocateVotesByNumber(0, 5, { from: voter1 });
    await shBallot.allocateVotesByNumber(1, 6, { from: voter2 });
    await shBallot.endVoting({ from: chairperson });
    await tryCatch(
      shBallot.allocateVotesByNumber(0, 5, { from: voter1 }),
      errTypes.revert
    );
  });

  it("Should not let voters allocate more votes than they have", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(0, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await shBallot.beginVoting({ from: chairperson });
    await tryCatch(
      shBallot.allocateVotesByNumber(0, 15, { from: voter1 }),
      errTypes.revert
    );
  });

  it("Should not let voters vote more than once for VoteMode.OneVote", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await shBallot.beginVoting({ from: chairperson });
    await shBallot.singleVote(0, { from: voter1 });
    await tryCatch(shBallot.singleVote(0, { from: voter1 }), errTypes.revert);
  });

  it("Should not let chairperson start voting without anyone registered", async () => {
    await shBallot.setVotingMode(1, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await tryCatch(
      shBallot.beginVoting({ from: chairperson }),
      errTypes.revert
    );
  });

  it("Should not let chairperson start voting without setting voting timeline", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1, { from: chairperson });
    await tryCatch(
      shBallot.beginVoting({ from: chairperson }),
      errTypes.revert
    );
  });

  it("Should not let chairperson start voting without setting voting mode", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVoteTimeline(1, 5, { from: chairperson });
    await tryCatch(
      shBallot.beginVoting({ from: chairperson }),
      errTypes.revert
    );
  });
});
