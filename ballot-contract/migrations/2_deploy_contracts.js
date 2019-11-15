var Ballot = artifacts.require("ShBallot");

module.exports = function(deployer) {
  deployer.deploy(Ballot, 4);
};
