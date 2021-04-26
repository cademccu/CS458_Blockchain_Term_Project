pragma solidity 0.7.3;

contract Storage {


  // @notice This mapping should convert address to an ID/Liscense number
  //mapping(address => uint256) private ID_numbers; not sure we need this
  mapping(uint256 => Liscense) internal get_liscense;
  mapping (address => uint) public licenseToOwner;
  mapping (address => bool) public ownerHasLicense;
  enum Gender { FEMALE, MALE, OTHER }

  // @notice This is the data structure for storing relevant information
  // about an idividual
  struct Liscense {
    uint256 ID_NUMBER; // primary key of sorts
    string first_name;
    string last_name;
    uint64 birth_year; // pack these 6 into a single space.
    uint32 birth_month;
    uint32 birth_day;
    uint64 exp_year;
    uint32 exp_month;
    uint32 exp_day;
    string street_address;
    string city;
    string state;
    Gender gender;
  }


///////// CADES IDEA CORNER ////////////////
  // getBasicInfo - get name, DOB // access basic info with that comma thing
  // * publicly available

  // getMyInfo (address)
  // * address has to equal ... publisher??
  // * or some other authenticity of sorts

  // mapping address => Liscense?

  // how to give 2 party approval to change?
  // * two mappings, once both are true, fire off an event
  // * store ether from one/both for this transaction
  // * so it can be asynchronous??
  // * maybe some way to put this in an error state


  /// need a way to allow access for DMVs too
  // * publishing address could be the 'DMV'
  //  and they could get full access

  // Intresting thing i learned is that msg.sender can be a contract address...
  // meaning another contract can call this one. So one way we could implement
  // permissions is that a contract is the 'DMV', and we could make a DAPP that
  // users have to log in with DMV creditials or whatever, and if they do, they
  // can use the DAPP to interact with the DMV contract, and then subsequently
  // access this contract. {IDEA} we should also have seperate methods for DMVs
  // access and a users access.

  // Thinking of this mapping to get the user's Liscense
  //mapping(address => Liscense) private get_liscense; // ID_NUMBER
  // Then you can only get the ID number if you have the address.
  // mapping(address => uint256) private ID_numbers;
  // function to get the basic stuff back (through smaller struct or key value stuff???)

  // DUDE THIS ABSOLUTELY SLAPS
  // I'm going to merge some of my ideas into here to see what you think.
  // Gonna keep em seperated by the comment here though. Probs wont compile here,
  // just putting this in so we can sort out some ideas. CKM

  // I was thinking we could use the publisher as the defacto 'DMV', I.E. someone
  // who could access all the details of the users too. Or modify things.
  // or both DMV and user are needed to modify things. Anyways we can use a
  // constructor to set a state variable since it is only used once.







}// end of contract
