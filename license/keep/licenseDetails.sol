// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity 0.7.3;

contract licenseDetails {


  // @notice This mapping should convert address to an ID/Liscense number
  //mapping(address => uint256) private ID_numbers; not sure we need this
  uint64 count;
  mapping(uint256 => License) public get_license;
  mapping (address => uint) public licenseToOwner;
  mapping (address => bool) public ownerHasLicense;
  enum Gender { FEMALE, MALE, OTHER }

  // @notice This is the data structure for storing relevant information
  // about an individual
  struct License {
    uint256 ID_NUMBER; // primary key of sorts
    string name;
    string dob;
    string exp_date;
    string street_address;
    string city_state;
    Gender gender;
  }

}// end of contract
