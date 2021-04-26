pragma solidity >=0.5.0 <0.7.4;

import "hardhat/console.sol";
import "./Storage.sol";



contract UserLicense is Storage {


  address DMV;// need to be 'payable'?
  event BasicRequest(string first_name, string last_name, uint64 birth_year, uint32 birth_month, uint32 birth_day);
  event FullRequest(uint256 _ID_NUMBER, string _first_name, string _last_name, uint64 _birth_year,uint32 _birth_month ,uint32 _birth_day,
uint64 _exp_year, uint32 _exp_month, uint32 _exp_day, string _street_address, string  _city, string _state);
  event NewLicense(string first_name, string last_name, uint256 ID_NUMBER);
  constructor() public {
    DMV = msg.sender;
  }

  function getBasicInformation(uint256 id) public view { //Full)
      Liscense storage u_license = get_liscense[id];
      emit BasicRequest(u_license.first_name, u_license.last_name, u_license.birth_year, u_license.birth_month, u_license.birth_day);
  }

  function getFullInformation(uint256 id, address user) public view {//view returns(Liscense)
    require (licenseToOwner[user] == id); // probs not exactly this but ya get the point
    // OR
    require (msg.sender == DMV); // so DMV (or authorized point of contact) can access
      Liscense storage u_license =  get_liscense[id];
    emit FullRequest(u_license.ID_NUMBER, u_license.first_name, u_license.last_name, u_license.birth_year, u_license.birth_month, u_license.birth_day, u_license.exp_year,
        u_license.exp_month, u_license.exp_day, u_license.street_address, u_license.city, u_license.state);
  }

//Checks if sender already owns a license. If false it adds a new license to the
//list and maps its location on the list and sets caller's ownerToLicense to true
//Ugliest paramater line i've ever typed into existence researching alternatives but its gross for now
    function createLicense(uint256 _ID_NUMBER, string memory _first_name, string memory _last_name, uint64 _birth_year,uint32 _birth_month ,uint32 _birth_day,
                           uint64 _exp_year, uint32 _exp_month, uint32 _exp_day, string memory _street_address, string memory _city, string memory _state) public {
       //need some method to create random unique ID
        require(ownerHasLicense[msg.sender] == false);
      //here we go again
        //had coded MALE for gender due to solidity compiling error with enums in parameter, will fix later
        get_liscense[_ID_NUMBER] = Liscense(_ID_NUMBER, _first_name, _last_name, _birth_year, _birth_month, _birth_day, _exp_year, _exp_month, _exp_day, _street_address,
                                   _city, _state, Gender.MALE);
        uint256 id = get_liscense.length - 1;
        licenseToOwner[msg.sender] = id;
        ownerHasLicense[msg.sender] = true;
        emit NewLicense(_first_name, _last_name, _ID_NUMBER);
    }

}
