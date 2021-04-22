pragma solidity >=0.5.0 <0.7.4;

import "hardhat/console.sol";

contract UserLicense  {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // DUDE THIS ABSOLUTELY SLAPS
  // I'm going to merge some of my ideas into here to see what you think.
  // Gonna keep em seperated by the comment here though. Probs wont compile here,
  // just putting this in so we can sort out some ideas. CKM

  // This may be too complex for our proof of concept but here is the struct
  struct Liscense_Full {
    uint256 ID_NUMBER; /// do we want to include the ID in the struct?
    string first_name;
    string last_name;
    uint64 birth_year; /// pack these 6 into a single space (256)
    uint32 birth_month;
    uint32 birth_day;
    uint64 exp_year;
    uint32 exp_month;
    uint32 exp_day;
    enum Gender { FEMALE, MALE, OTHER } // its 2021 babey
    string street_address;
    string city;
    string state;
  }

  // I was thinking we could use the publisher as the defacto 'DMV', I.E. someone
  // who could access all the details of the users too. Or modify things.
  // or both DMV and user are needed to modify things. Anyways we can use a
  // constructor to set a state variable since it is only used once.
  address DMV; // need to be 'payable'?
  constructor() public {
    DMV = msg.sender;
  } // continued down yonder 
  // Intresting thing i learned is that msg.sender can be a contract address...
  // meaning another contract can call this one. So one way we could implement
  // permissions is that a contract is the 'DMV', and we could make a DAPP that
  // users have to log in with DMV creditials or whatever, and if they do, they
  // can use the DAPP to interact with the DMV contract, and then subsequently
  // access this contract. {IDEA} we should also have seperate methods for DMVs
  // access and a users access.


  // Thinking of this mapping to get the user's Liscense
  mapping(uint256 => Liscense_Full) private get_liscense; /// ID_NUMBER
  // Then you can only get the ID number if you have the address
  mapping(address => uint256) private ID_numbers;
  // function to get the basic stuff back (through smaller struct or key value stuff???)
  function getBasicInformation(uint256 id) public view returns(Liscense_basic) {
    // do stuff
  }

  function getFullInformation(uint256 id, address user) public view returns(Liscense2) {
    require (licenseToOwner[user] == id); // probs not exactly this but ya get the point
    // OR
    require (msg.sender == DMV); // so DMV (or authorized point of contact) can access
    // do stuff
  }

  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////


    event NewLicense(string name, string dob);


    struct License {
        string name;
        string dob;
    }

    License[] public licenses;

    mapping (address => uint) public licenseToOwner;
    mapping (address => bool) public ownerHasLicense;


//Checks if sender already owns a license. If false it adds a new license to the
//list and maps its location on the list and sets caller's ownerToLicense to true
    function createLicense(string memory _name, string memory _dob) public {
        require(ownerHasLicense[msg.sender] == false);
        licenses.push(License(_name, _dob));
        uint256 id = licenses.length - 1;
        licenseToOwner[msg.sender] = id;
        ownerHasLicense[msg.sender] = true;
        emit NewLicense(_name, _dob);
    }

}
