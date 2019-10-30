pragma solidity ^0.5.2;

contract ShBallot {
    // DATA STRUCTURES
    struct Shareholder {
        uint numSharesOwned;
        bool registered;
    }

    struct Proposal {
        uint256 voteCount;
    }

    address chairperson;
    mapping(address => Shareholder) shareholders;
    uint numShareholders;
    Proposal[] proposals;

    enum Phase { Init, Regs, Vote, Done, Released }
    enum VoteMode { OnePerShare, OneVote, NotSet }

    Phase public state;
    uint public numChoices;

    VoteMode public votingMode;
    uint public votingDeadline;
    uint public votingDuration;

    uint winner;
    bool public winnerSelected;

    // MODIFIERS
    modifier validPhase(Phase reqPhase) {
        require(state == reqPhase, "Invalid phase");
        _;
    }

    modifier validVoteMode(VoteMode mode) {
        require(votingMode == mode, "You are voting in a different voting mode.");
        _;
    }

    modifier shareholderRegistered() {
        require(shareholders[msg.sender].registered, "Shareholder not registered.");
        _;
    }

    modifier onlyChair() {
        require(msg.sender == chairperson, "You are not the Chairperson");
        _;
    }

    modifier onlyShareholder() {
        require(msg.sender != chairperson, "You are not a shareholder");
        _;
    }

    modifier beforeDeadline() {
        require(now <= votingDeadline, "Voting deadline has passed!");
        _;
    }

    modifier validProposal(uint num) {
        require(num >= 0 && num < numChoices, "There not that many proposals.");
        _;
    }

    modifier canStillVote(address toCheck) {
        require(shareholders[toCheck].numSharesOwned > 0, "You have used all of your votes");
        _;
    }

    // CONSTRUCTOR
    constructor (uint8 numProposals)
        public
    {
        require(numProposals > 1, "There must be more than one proposal to vote on.");
        chairperson = msg.sender;
        proposals.length = numProposals;
        state = Phase.Regs;
        votingMode = VoteMode.NotSet;
        votingDeadline = 0;
        votingDuration = 0;
        winnerSelected = false;
        numChoices = numProposals;
        numShareholders = 0;
    }

    //chairperson functions
    function registerShareholder(address shareholder, uint numSharesOwned)
        public
        onlyChair
        validPhase(Phase.Regs)
    {
        require(!shareholders[shareholder].registered, "This shareholder has already been registered.");
        require(numSharesOwned > 0, "A shareholder should have more than zero shares.");
        shareholders[shareholder].registered = true;
        shareholders[shareholder].numSharesOwned = numSharesOwned;
        numShareholders += 1;
    }

    function setVotingMode(VoteMode mode)
        public
        onlyChair
    {
        require(mode != VoteMode.NotSet, "Cannot set voting mode to `NotSet`.");
        votingMode = mode;
    }

    function setVoteTimeline(uint8 howLong, uint8 unit)
        public
        onlyChair
        validPhase(Phase.Regs)
    {
        require(howLong > 0, "Alpha must be more than zero.");
        require(unit>=1 && unit<=5, "Cannot have `NotSet` as a time unit. 1: weeks, 2: days, 3: hours, 4: minutes, 5: seconds");
        if (unit == 1) {
            votingDuration = howLong * 1 weeks;
        } else if (unit == 2) {
            votingDuration = howLong * 1 days;
        } else if (unit == 3) {
            votingDuration = howLong * 1 hours;
        } else if (unit == 4) {
            votingDuration = howLong * 1 minutes;
        } else if (unit == 5) {
            votingDuration = howLong * 1 seconds;
        }
    }

    function beginVoting()
        public
        onlyChair
        validPhase(Phase.Regs)
    {
        require(numShareholders > 0, "No shareholders have been registered.");
        require(votingMode != VoteMode.NotSet, "Voting mode not set. Run `setVotingMode(...)`.");
        require(votingDuration != 0, "Voting deadline not set. Run `setVoteTimeline(...)`.");
        votingDeadline = now + votingDuration;
        state = Phase.Vote;
    }

    function endVoting()
        public
        onlyChair
        validPhase(Phase.Vote)
    {
        state = Phase.Done;
    }

    function countVotes()
        public
        onlyChair
        validPhase(Phase.Done)
    {
        uint winningVoteCount = 0;
        for (uint prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                winner = prop;
            }
        winnerSelected = true;
    }

    function releaseWinner()
        public
        onlyChair
        validPhase(Phase.Done)
    {
        require(winnerSelected, "Winner has not been selected yet. Run `countVotes()`.");
        state = Phase.Released;
    }

    //shareholder functions
    function singleVote(uint8 toProposal)
        public
        beforeDeadline
        shareholderRegistered
        validPhase(Phase.Vote)
        validProposal(toProposal)
        validVoteMode(VoteMode.OneVote)
        canStillVote(msg.sender)
    {
        Shareholder storage shareholder = shareholders[msg.sender];
        proposals[toProposal].voteCount += 1;
        shareholder.numSharesOwned = 0;
    }

    function allocateVotesByNumber(uint8 toProposal, uint numVotes)
        public
        beforeDeadline
        shareholderRegistered
        validPhase(Phase.Vote)
        validProposal(toProposal)
        validVoteMode(VoteMode.OnePerShare)
        canStillVote(msg.sender)
    {
        Shareholder storage shareholder = shareholders[msg.sender];
        require(numVotes <= shareholder.numSharesOwned, "You sent more votes than you have left.");
        proposals[toProposal].voteCount += numVotes;
        shareholder.numSharesOwned -= numVotes;
    }

    function allocateVotesByPercentage(uint8 toProposal, uint8 percentage)
        public
        beforeDeadline
        shareholderRegistered
        validPhase(Phase.Vote)
        validProposal(toProposal)
        validVoteMode(VoteMode.OnePerShare)
        canStillVote(msg.sender)
    {
        require(percentage > 0 && percentage <= 100, "Percentage must be a valid percentage between 1 and 100.");
        Shareholder storage shareholder = shareholders[msg.sender];
        uint numVotes = (shareholder.numSharesOwned * percentage) / 100;
        require(numVotes > 0, "Percentage too small. No votes being sent out.");
        require(shareholder.numSharesOwned + numVotes >= 0, "You sent more votes / larger percentage than you have left.");
        proposals[toProposal].voteCount += numVotes;
        shareholder.numSharesOwned -= numVotes;
    }

    function getNumRemainingVotes()
        public
        view
        shareholderRegistered
        returns(uint)
    {
        Shareholder memory shareholder = shareholders[msg.sender];
        if (shareholder.numSharesOwned == 0) {
            return 0;
        } else {
            if (votingMode == VoteMode.OneVote) {
                return 1;
            }
            return shareholder.numSharesOwned;
        }
    }

    function getWinner()
        public
        view
        validPhase(Phase.Released)
        returns (uint)
    {
        return winner;
    }
}
