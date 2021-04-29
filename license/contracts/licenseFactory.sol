// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity >=0.5.0 <=0.8.0; //<0.7.4;

import "hardhat/console.sol";
import "./licenseDetails.sol";



contract LicenseFactory {

  mapping(uint256 => address) public licenseToOwner;
  mapping (address => uint) public ownerToLicense;
  mapping (address => bool) public ownerHasLicense;

  // @notice This is the data structure for storing relevant information
  // about an individual
  struct License {
    uint256 ID_NUMBER; // primary key of sorts
    string name;
    string dob;
    string exp_date;
    string street_address;
    string city_state;
    string gender;
  }

  uint64 count;
  address DMV;

  event NewLicense(string name, uint256 ID_NUMBER);
  event UpdatedLicense(string name, uint256 ID_NUMBER);

  License[] internal licenses;

  constructor() {
    DMV = msg.sender;
    count = 0;
  }

  function getBasicInformation(uint256 id) external view returns (string memory, string memory) {
      return (licenses[id].name, licenses[id].dob);
  }

  // gets the full information from a license
  function getFullInformation(uint256 id) public view returns (
    uint256,
    string memory,
    string memory,
    string memory,
    string memory,
    string memory,
    string memory ){
    require (licenseToOwner[id] == msg.sender || DMV == msg.sender, "Only the Owner of the license or the DMV can access the full information.");
    return (licenses[id].ID_NUMBER,
      licenses[id].name,
      licenses[id].dob,
      licenses[id].exp_date,
      licenses[id].street_address,
      licenses[id].city_state,
      licenses[id].gender );
  }

  function updateLicense(string memory _name,
    string memory _dob,
    string memory _exp_date,
    string memory _address,
    string memory city_state,
    string memory gender) public {
        // TODO emit environment
        // async?
    }

  // testing
  function getID(address _owner) external view returns(uint256) {
    return ownerToLicense[_owner];
  }

  function getAddress(uint256 ID) external view returns(address) {
    require (licenseToOwner[ID] == msg.sender || DMV == msg.sender, "Only the Owner of the license or the DMV can get user address.");
    return licenseToOwner[ID];
  }


//Checks if sender already owns a license. If false it adds a new license to the
//list and maps its location on the list and sets caller's ownerToLicense to true
  function createLicense(string memory _name,
    string memory _dob,
    string memory _exp_date,
    string memory _address,
    string memory city_state,
    string memory gender) public {
      require(ownerHasLicense[msg.sender] == false);
      licenses.push( License(count, _name, _dob, _exp_date, _address, city_state, gender));
      licenseToOwner[count] = msg.sender;
      ownerToLicense[msg.sender] = count;
      ownerHasLicense[msg.sender] = true;
      emit NewLicense(_name, count);
      count++;
  }

}
