pragma solidity ^0.5.2;

contract ShBallot {

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
    

    enum Phase {Init,Regs, Vote, Done}  
    Phase public state = Phase.Done; 
    
       //modifiers
   modifier validPhase(Phase reqPhase) 
    { require(state == reqPhase); 
      _; 
    } 
    modifier onlyChair() 
     {require(msg.sender == chairperson);
      _;
     }

    
    constructor (uint8 numProposals) public  {
        chairperson = msg.sender;
        voters[chairperson].weight = 2; // weight 2 for testing purposes
        proposals.length = numProposals;
        state = Phase.Regs;
    }
    
     function changeState(Phase x) onlyChair public {
        
        require (x > state );
       
        state = x;
     }
    
    function register(address voter) public validPhase(Phase.Regs) onlyChair {
       
        require (! voters[voter].voted);
        
        voters[voter].weight = 1;
        
       // voters[voter].voted = false;
    }

   
    function vote(uint8 toProposal) public validPhase(Phase.Vote)  {
      
        Voter memory sender = voters[msg.sender];
        
        require (!sender.voted); 
        require (toProposal < proposals.length); 
        
        sender.voted = true;
        sender.vote = toProposal;   
        proposals[toProposal].voteCount += sender.weight;
    }

    function reqWinner() public validPhase(Phase.Done) view returns (uint8 winningProposal) {
       
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++) 
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                winningProposal = prop;
            }
       assert(winningVoteCount>=1);
    }
}
