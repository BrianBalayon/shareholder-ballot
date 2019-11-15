# Shareholder Ballot
This project was created by Brian Balayon and Hans Bas for CSE 426: Blockchain App Development at the University at Buffalo, SUNY. <br /> <br />
*More detailed information can be found in `submission-docs`*

## Abstract
Shareholders to a company have the right to vote in elections that deal with matters that directly affect their stock ownership. The nature of these voting rights and the issues shareholders are entitled to vote on can vary from one company to another. Some companies grant shareholders one vote per share (more shares you own, the more votes), other companies grant shareholders only one vote, regardless of the number of shares owned. These voting rights allow shareholders to influence the company’s corporate direction. Our project idea essentially takes this idea and breaks it down into two actors: company and shareholders. The company is the ultimate deciding factor of the weight of the shareholders’ votes and the issues they can vote upon, while the shareholders can allocate their votes. 

## To Run Shareholder Ballot Locally

0. Make sure you have:
	- Truffle
	- Ganache
	- MetaMask (the Google Chrome extension)
	- Node.js
	- npm
1. Launch Ganache
	- Have MetaMask connect to the Ganache test chain using the provided RPC URL.
	- Import the Ganache accounts into MetaMask using the private keys / mnemonic.
	- Reset the Ganache test chain and the accounts in MetaMask
2. Compile & Deploy the Smart Contracts
	- Run the following commands:<br />
	`cd ballot-contract/`<br />
	`truffle compile`<br />
	`truffle migrate --reset`<br />
3. Set-Up Front-End Dependencies
	- Run the following commands:<br />
	`cp -a build/contracts ../ballot-app/src/`<br />
	`cd ../ballot-app`<br />
	`npm install`<br />
4. Start the Front-End
	- Run the following command:<br />
	`npm start`


## Directory Structure
```bash
.
├── README.md
├── ballot-app
│   ├── README.md
│   ├── js
│   │   └── dist
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── components
│       │   ├── app
│       │   │   ├── app.css
│       │   │   ├── app.test.js
│       │   │   └── index.js
│       │   ├── chairperson
│       │   │   ├── chairperson-container.js
│       │   │   ├── chairperson-view.js
│       │   │   └── util
│       │   │       ├── constants.js
│       │   │       ├── register-shareholder.js
│       │   │       ├── set-voting-mode.js
│       │   │       ├── set-voting-timeline.js
│       │   │       └── voting-mode-button-toolbar.js
│       │   ├── loading
│       │   │   └── index.js
│       │   ├── phase
│       │   │   ├── phase-container.js
│       │   │   ├── phase-view.js
│       │   │   └── util
│       │   │       └── constants.js
│       │   ├── proposals
│       │   │   ├── index.js
│       │   │   └── util
│       │   │       └── constants.js
│       │   ├── public-info
│       │   │   ├── index.js
│       │   │   └── util
│       │   │       ├── constants.js
│       │   │       ├── number-proposals.js
│       │   │       ├── number-remaining-votes.js
│       │   │       ├── voting-deadline.js
│       │   │       └── voting-mode.js
│       │   ├── shareholder
│       │   │   ├── shareholder-container.js
│       │   │   ├── shareholder-view.js
│       │   │   └── util
│       │   │       ├── allocate-votes-by-count.js
│       │   │       ├── allocate-votes-by-percentage.js
│       │   │       ├── constants.js
│       │   │       ├── get-winner-button.js
│       │   │       └── single-vote.js
│       │   ├── transaction
│       │   │   ├── transaction-container.js
│       │   │   ├── transaction-view.js
│       │   │   └── util
│       │   │       └── constants.js
│       │   ├── utils
│       │   │   ├── constants
│       │   │   │   ├── keys.js
│       │   │   │   └── methods.js
│       │   │   ├── helper-functions
│       │   │   │   └── index.js
│       │   │   └── input
│       │   │       ├── dropdown-menu.js
│       │   │       ├── index.js
│       │   │       ├── submit-button.js
│       │   │       └── text-box.js
│       │   └── winner
│       │       ├── winner-container.js
│       │       └── winner-view.js
│       ├── index.css
│       ├── index.js
│       └── serviceWorker.js
├── ballot-contract
│   ├── contracts
│   │   ├── Migrations.sol
│   │   └── SHBallot.sol
│   ├── migrations
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_contracts.js
│   ├── test
│   │   ├── ShBallot.js
│   │   └── exceptions.js
│   └── truffle-config.js
├── makefile
└── submission-docs
    ├── README.pdf
    ├── architecture-diagram.pdf
    ├── contract-diagram.pdf
    ├── directory-structure.txt
    ├── problem-statement.pdf
    ├── sequence-diagram.pdf
    └── use-case-diagram.pdf

30 directories, 69 files

```

## Technology Stack
|Technology| Purpose | Description |
|--|--|--|
| React| Front-End | A JavaScript library for developing UIs |
 | Drizzle | Front-End | A front-end development tool part of the Truffle suite
 | Solidity | Smart Contract | An object-oriented programming language for writing smart contracts |
 | Ganache | Development | A program to create a personal test chain to help with smart contract testing and development
| MetaMask | Development | Allows users to run Ethereum dApps right in a browser without running a full Ethereum node |

### Our Technology Choices
As you have already noticed, this application uses a tech stack different than that in the example Ballot. zip provided to the CSE 426 class. The Ballot provided to us runs using Node.js, Express, and an index.html.

We decided to work with React and Drizzle for the following reasons.

#### Modularity and Ease of Development
React allows us to create reusable components which get rendered as HTML once we run the application. It makes it much easier to create front-end user interfaces that have functionality
and state associated with it. And as we are creating individual components, this means more reusability.

Drizzle is a library we found while researching how to hook up our React front-end to the deployed smart contract. We found that Drizzle would accomplish exactly everything we needed for this dApp: synchronizing contract data and transaction data. Drizzle will handle most of the heavy lifting – it acts as a middle layer between our front-end and our smart contract. It is merely an extension of Web 3.0’s contracts.

#### React Community
The React community is large and only growing. React is based off of Node.js, which means that we can use Node.js modules within React rather than just use Express. This is extremely helpful and it keeps our code uniform.

#### New and Popular Technology Stack
React is rising in popularity and is high in demand. The demand for React engineers or software engineers that know React is growing, so we wanted to create an application that reflected the future of front-end user interfaces.
