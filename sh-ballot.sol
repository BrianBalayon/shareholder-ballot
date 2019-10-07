pragma solidity ^0.5.2;

contract ShBallot {

    // DATA STRUCTURES
    struct Shareholder {
        uint numSharesOwned;
        bool registered;
        uint numVotesSent;
    }

    struct Proposal {
        uint voteCount;
    }

    address chairperson;
    mapping(address => Shareholder) shareholders;
    uint numShareholders = 0;
    Proposal[] proposals;

    enum Phase { Init, Regs, Vote, Done, Released }
    enum VoteMode { OnePerShare, OneVote, NotSet }

    Phase public state;
    VoteMode votingMode;

    uint votingDeadline;
    uint votingDuration;

    uint winner;
    bool winnerSelected = false;

    // MODIFIERS
    modifier validPhase(Phase reqPhase) {
        require(state == reqPhase);
        _;
    }

    modifier validVoteMode(VoteMode mode) {
        require(votingMode == mode, "You are voting in a different voting mode. Please use another voting function.");
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
    
    // CONSTRUCTOR
    constructor (uint8 numProposals)
        public
    {
        require(numProposals > 1, "There must be more than one proposal to vote on.");
        chairperson = msg.sender;
        proposals.length = numProposals;
        state = Phase.Regs;
        state = Phase.Done;
        votingMode = VoteMode.NotSet;
        votingDeadline = 0;
        votingDuration = 0;
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
        shareholders[shareholder].numVotesSent = 0;
        numShareholders += 1;
    }
    
    function setVotingMode(VoteMode mode)
        public
        onlyChair
    {
        require(mode != VoteMode.NotSet, "Cannot set voting mode to `NotSet`.");
        votingMode = mode;
    }
    
    function setVoteTimeline(uint timeWithUnit)
        public
        onlyChair
    {
        require(timeWithUnit > 0, "Alpha must be more than zero.");
        votingDuration = timeWithUnit;
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
        validVoteMode(VoteMode.OneVote)
    {
        Shareholder storage shareholder = shareholders[msg.sender];
        require(toProposal < proposals.length);
        if (votingMode == VoteMode.OnePerShare) {
            require(shareholder.numVotesSent < shareholder.numSharesOwned, "Reached maximum number of votes.");
        } else if (votingMode == VoteMode.OneVote) {
            require(shareholder.numVotesSent < 1, "Reached maximum number of votes.");
        }
        shareholder.numVotesSent += 1;
        proposals[toProposal].voteCount += 1;
    }
     
    function allocateVotesByNumber(uint8 toProposal, uint numVotes)
        public
        beforeDeadline
        shareholderRegistered
        validPhase(Phase.Vote)
        validVoteMode(VoteMode.OnePerShare)
    {
        Shareholder storage shareholder = shareholders[msg.sender];
        require(toProposal < proposals.length);
        require(shareholder.numVotesSent < shareholder.numSharesOwned, "Reached maximum number of votes.");
        require(shareholder.numVotesSent + numVotes <= shareholder.numSharesOwned, "Too many votes attempted to be sent.");
        shareholder.numVotesSent += numVotes;
        proposals[toProposal].voteCount += numVotes;
    }
     
    function allocateVotesByPercentage(uint8 toProposal, uint percentage)
        public
        beforeDeadline
        shareholderRegistered
        validPhase(Phase.Vote)
        validVoteMode(VoteMode.OnePerShare)
    {
        require(percentage > 0 && percentage <= 100, "Percentage must be a valid percentage between 1 and 100.");
        Shareholder storage shareholder = shareholders[msg.sender];
        require(shareholder.numVotesSent < shareholder.numSharesOwned, "Reached maximum number of votes.");
        uint numVotes = ((shareholder.numSharesOwned - shareholder.numVotesSent) * percentage) / 100;
        require(numVotes > 0, "Percentage too small. No votes being sent out.");
        shareholder.numVotesSent += numVotes;
        proposals[toProposal].voteCount += numVotes;
    }
    
    function getNumRemainingVotes()
        public
        view
        shareholderRegistered
        returns(uint)
    {
        require(votingMode != VoteMode.NotSet);
        Shareholder memory shareholder = shareholders[msg.sender];
        if (votingMode == VoteMode.OnePerShare) {
            return shareholder.numSharesOwned - shareholder.numVotesSent;
        } else if (votingMode == VoteMode.OneVote) {
            return 1 - shareholder.numVotesSent;
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