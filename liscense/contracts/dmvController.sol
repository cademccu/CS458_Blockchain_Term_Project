// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity >=0.5.0 <0.7.4;

import "./userLicense.sol";


// source
// https://ethereum.stackexchange.com/questions/1415/solidity-create-contract-from-contract/1419
contract dmvController {

  // stores the liscense of the contract we create
  UserLicense liscenseContractAddress;

  // creates the address, thus saving it in this contract and the next
  constructor() {
    liscenseContractAddress = new UserLicense();
  }






}
