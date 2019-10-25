var Ballot = artifacts.require("SHBallot");

module.exports = function(deployer) {
    deployer.deploy(Ballot,4);
};
