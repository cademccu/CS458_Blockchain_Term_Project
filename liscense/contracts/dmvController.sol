// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity >=0.5.0 <0.7.4;

import "./userLicense.sol";


// source
// https://ethereum.stackexchange.com/questions/1415/solidity-create-contract-from-contract/1419
contract dmvController {

  // stores the liscense of the contract we create
  UserLicense liscenseContractAddress;
  address owner;

  // creates the address, thus saving it in this contract and the next
  constructor() {
    liscenseContractAddress = new UserLicense();
    owner = msg.sender;
  }

  function getUserLicenseAddress() public view returns(address) {
    // not sure if we need this require
    require(msg.sender == owner, "Only the DMV can call this contract.");
    return address(liscenseContractAddress); // return should be okay? could emit event
  }

  function getUserLicenseContract() public view returns(UserLicense) {
    // not sure if we need this require
    require(msg.sender == owner, "Only the DMV can call this contract.");
    return liscenseContractAddress; // return should be okay? could emit event
  }






}
