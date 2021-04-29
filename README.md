# CS458_Blockchain_Term_Project

A repository dedicated to our Blockchain term project, Spring semester 2021



### To deploy with Infura and Rinkyby:
* Log into infura using your Metamask account. 
* Create a new project in Infura.
* Set the network to Rinkeby.
* Copy the https endpoint from the project. Paste it into the license/hardhat.config.js file in the Infura project location.
* Get your private key from Metamask. (DO NOT CHECK THIS FILE IN WITH YOUR PRIVATE KEY!) Paste into private key area in license/hardhat.config.js
* From license directory, run ./deploy.sh (or the command below under \'DEPLOY]\'.
* Copy the contract address that is logged to the terminal, this is now the address of the deployed contract.
* You can test this functionality with the ABI and the address in oneclickdapp.com


### COMPILE

```
npx hardhat compile
```

### TEST

```
npx hardhat test
```

### DEPLOY
```
npx hardhat run scripts/deploy.js --network rinkeby
```

Additionally, scripts are available in the license directory to run these commands for you.
