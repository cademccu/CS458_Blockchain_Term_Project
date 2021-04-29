// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity >=0.5.0 <0.7.4;

import "./licenseFactory.sol";

// sources
// https://ethereum.stackexchange.com/questions/1415/solidity-create-contract-from-contract/1419

// TODO put in request method, struct.

contract dmvController {

  // contract variables
  LicenseFactory liscenseContractAddress; // stores the liscense of the contract we create
  address owner;

  // creates the address, thus saving it in this contract and the next
  constructor() public {
    liscenseContractAddress = new LicenseFactory();
    owner = msg.sender; // save as owner.
  }

  function getUserLicenseAddress() public view returns(address) {
    require(msg.sender == owner, "Only the DMV can call this contract.");
    return address(liscenseContractAddress); // return should be okay? could emit event
  }


}
