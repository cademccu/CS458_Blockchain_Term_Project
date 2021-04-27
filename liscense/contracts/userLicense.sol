pragma solidity >=0.5.0 <0.7.4;

import "hardhat/console.sol";
import "./Storage.sol";



contract UserLicense is Storage {


  address DMV;// need to be 'payable'?
  event NewLicense(string name, uint256 ID_NUMBER);
  constructor() public {
    DMV = msg.sender;
  }

  function getBasicInformation(uint256 id) external view returns (string memory, string memory) { //Full)// pack these 6 into a single space.
      License storage u_license = get_license[id];
      return (u_license.name, u_license.dob);
  }

  function getFullInformation(uint256 id, address user) public view  returns (uint256, string memory, string memory, string memory, string memory, string memory ){//view returns(License)
    require (licenseToOwner[user] == id); // probs not exactly this but ya get the point
    require (msg.sender == DMV); // so DMV (or authorized point of contact) can access
      License storage u_license =  get_license[id];
    return (u_license.ID_NUMBER, u_license.name, u_license.dob, u_license.exp_date, u_license.street_address, u_license.city_state);
  }

//Checks if sender already owns a license. If false it adds a new license to the
//list and maps its location on the list and sets caller's ownerToLicense to true
//Ugliest paramater line i've ever typed into existence researching alternatives but its gross for now
    function createLicense(uint256 _ID_NUMBER, string memory _name, string memory _dob, string memory _exp_date, string memory _address, string memory city_state) public {
       //need some method to create random unique ID
        require(ownerHasLicense[msg.sender] == false);
      //here we go again
        //had coded MALE for gender due to solidity compiling error with enums in parameter, will fix later
        get_license[_ID_NUMBER] = License(_ID_NUMBER, _name, _dob, _exp_date, _address, city_state, Gender.OTHER);
        count++;
        licenseToOwner[msg.sender] = count;
        ownerHasLicense[msg.sender] = true;
        emit NewLicense(_name, _ID_NUMBER);
    }

}
