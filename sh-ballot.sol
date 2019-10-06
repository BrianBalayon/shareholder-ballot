pragma solidity ^0.5.2;

contract ShBallot {
    
    // DATA STRUCTURES
    struct Voter {                     
        uint weight;
        bool voted;
        uint8 vote;
    }
    
    struct Proposal {                  
        uint voteCount;
    }

    address chairperson;
    mapping(address => Voter) voters;  
    Proposal[] proposals;
    
    enum Phase {Init, Regs, Vote, Done}  
    Phase public state = Phase.Done; 
    
    bool public votePerShare;
    
    // MODIFIERS
   modifier validPhase(Phase reqPhase) 
    { require(state == reqPhase); 
      _; 
    } 
    
    modifier onlyChair() 
     {require(msg.sender == chairperson);
      _;
     }

    // CONSTRUCTOR
    constructor (uint8 numProposals) public  {
        chairperson = msg.sender;
        proposals.length = numProposals;
        state = Phase.Regs;
        votePerShare = false;
    }
    
    // FUNCTIONS
    //    onlyChair functions
     function changeState(Phase x) public onlyChair{
        require (x > state );
        state = x;
     }
    
    function register(address voter, uint numShares) public validPhase(Phase.Regs) onlyChair {
        require (! voters[voter].voted);
        voters[voter].weight = numShares;
        //voters[voter].voted = false;
    }
    
    function perShareVoting(bool mode) public validPhase(Phase.Regs) onlyChair {
        votePerShare = mode;
    }

    //    voter functions
    function voteForOne(uint8 toProposal) public validPhase(Phase.Vote)  {
        Voter memory sender = voters[msg.sender];
        require (!sender.voted); 
        require (toProposal < proposals.length); 
        sender.voted = true;
        sender.vote = toProposal;
        if (votePerShare) {
            proposals[toProposal].voteCount += sender.weight;
        } else {
            proposals[toProposal].voteCount += 1;
        }
    }

    //    truly public functions
    function requestWinner() public validPhase(Phase.Done) view returns (uint8 winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++) 
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                winningProposal = prop;
            }
       assert(winningVoteCount>=1);
    }
}
