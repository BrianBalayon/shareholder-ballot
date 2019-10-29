const ShBallot = artifacts.require("../contracts/ShBallot.sol");

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

  it("Should be in Phase.Regs (1)", async () => {
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

  it("Should catch errors when a non-registered voter tries to access their number of votes", async () => {
    await tryCatch(
      shBallot.getNumRemainingVotes({ from: voter2 }),
      errTypes.revert
    );
  });

  it("Should be in Phase.Vote (2)", async () => {
    await shBallot.registerShareholder(voter1, 10, { from: chairperson });
    await shBallot.registerShareholder(voter2, 10, { from: chairperson });
    await shBallot.setVotingMode(1);
    await shBallot.setVoteTimeline(10, 2);
    await shBallot.beginVoting();
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
});
