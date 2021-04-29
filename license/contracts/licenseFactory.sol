// SPDX-License-Identifier: CSU Blockchain final project
pragma solidity >=0.5.0 <=0.8.0; //<0.7.4;

import "hardhat/console.sol";



contract LicenseFactory {

  mapping(uint256 => address) public licenseToOwner;
  mapping (address => uint) public ownerToLicense;
  mapping (address => bool) public ownerHasLicense;

  // @notice This is the data structure for storing relevant information
  // about an individual
  struct License {
    uint256 ID_NUMBER;
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

  License[] internal licenses;

  constructor() public {
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

  // testing
  function getID(address _owner) external view returns(uint256) {
    return ownerToLicense[_owner];
  }

  function getAddress(uint256 _ID) external view returns(address) {
    require (licenseToOwner[_ID] == msg.sender || DMV == msg.sender, "Only the Owner of the license or the DMV can get user address.");
    return licenseToOwner[_ID];
  }


//Checks if sender already owns a license. If false it adds a new license to the
//list and maps its location on the list and sets caller's ownerToLicense to true
  function createLicense(string memory _name,
    string memory _dob,
    string memory _exp_date,
    string memory _address,
    string memory _city_state,
    string memory _gender) public {
      require(ownerHasLicense[msg.sender] == false);
      licenses.push( License(count, _name, _dob, _exp_date, _address, _city_state, _gender));
      licenseToOwner[count] = msg.sender;
      ownerToLicense[msg.sender] = count;
      ownerHasLicense[msg.sender] = true;
      emit NewLicense(_name, count);
      count++;
  }

  // ******************************************************
  // This section is to: E X P E R I M E N T A L C O D E A L E R T
  // * storage and events associated with holding state
  // * request a change (user)
  // * check that change (DMV)
  // * apply/confirm that change (DMV)
  // NOTE: This actually sucked way more than i thought to write lol and its so basic
  // ******************************************************

  mapping(uint256 => bool) public requestingChange;

  License[] internal changes;

  event UpdatedLicense(string name, uint256 ID_NUMBER);


  // for user to request a change
  function setChange(uint256 id,
      string memory _name,
      string memory _dob,
      string memory _exp_date,
      string memory _address,
      string memory _city_state,
      string memory _gender  ) public {
    require(ownerHasLicense[msg.sender] == true, "You have to have a license to change it.");
    require(licenseToOwner[id] == msg.sender, "Only user can request a change.");
    changes.push( License(count, _name, _dob, _exp_date, _address, _city_state, _gender));
    requestingChange[id] = true;
  }

// helper function to get the specific change
  function _getChange(uint256 id) view internal returns(uint256) {
    require(requestingChange[id] == true, "Change was not been requested for this user.");
    uint i= 0;
    for (uint256 index; index < changes.length; index++) {
      if (changes[index].ID_NUMBER == id){
          break;
      }
      i++;
    }
    return i;
  }
  // gets the staged change
  function getChange(uint id) public view returns(uint256,
  string memory,
  string memory,
  string memory,
  string memory,
  string memory,
  string memory ){
    require(msg.sender == DMV, "Only DMV can access scheduled changes.");
    uint256 i = _getChange(id);
    return (licenses[i].ID_NUMBER,
      changes[i].name,
      changes[i].dob,
      changes[i].exp_date,
      changes[i].street_address,
      changes[i].city_state,
      changes[i].gender);
  }
  // confirms the change
  function confirmChange(uint256 id) public {
    require(msg.sender == DMV, "Only DMV can confirm changes.");
    uint256 i = _getChange(id);
    // change license
    licenses[id].name = changes[i].name;
    licenses[id].dob = changes[i].dob;
    licenses[id].exp_date = changes[i].exp_date;
    licenses[id].street_address = changes[i].street_address;
    licenses[id].city_state = changes[i].city_state;
    licenses[id].gender = changes[i].gender;
    // delete from array
    //License memory element = changes[i]; // if we need to save the deleted element??
    changes[i] = changes[changes.length - 1];
    delete changes[changes.length - 1];
    //changes.length--;
    // emit change if we need it
    emit UpdatedLicense(licenses[id].name, id);
  }



}
