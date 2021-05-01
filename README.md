# User License Dapp
## CS458 Term Project
## Team: 	
* Tyler Ewing (sauciest javascript coder)
* Yosief Gebremedhin (head chef)
* Isaac Haas (eloquent team person)
* Cade McCumber (solidly solidity solutions)


## Setup:


* run the following commands from the license/dapp dir:
```
npm install react-scripts@latest
npm install semantic-ui-react semantic-ui-css
```

## Deploying the Contracts:

The contracts are currently available at the address found in license/dapp/src/utils/initBlockchain.js


If you want to redeploy:
* Change the information inside `license/hardhat.config.js`
* Then run  `./deploy` from the license dir.
* Copy the contract address to the `license/dapp/src/utils/initBlockchain.js`
* To help you find the correct line, there is a comment you can search for with the phrase: *Change contract address here*

