pragma solidity 0.7.3;

Contract Storage {


  /// @notice This mapping should convert address to an ID/Liscense number
  mapping(address => uint256) private ID_numbers;

  /// @notice This is the data structure for storing relevant information
  /// about an idividual
  struct Liscense {
    uint256 ID_NUMBER; // primary key of sorts
    string first_name;
    string last_name;
    uint128 birth_year; /// pack these 3 into a single space.
    uint64 birth_month;
    uint64 birth_day;
    enum Gender { FEMALE, MALE, OTHER }
    // address stuff?????
    string street_address;
    string city;
    string state;

    // exp date?
    //

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




}// end of contract
