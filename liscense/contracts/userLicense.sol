pragma solidity >=0.5.0 <0.7.4;

import "hardhat/console.sol";

contract UserLicense  {


    event NewLicense(string name, string dob);


    struct License {
        string name;
        string dob;
    }

    License[] public licenses;

    mapping (address => uint) public licenseToOwner;

    mapping (address => bool) public ownerHasLicense;
//Checks if sender already owns a license. If false it adds a new license to the list and maps its location on the list and sets caller's ownerToLicense to true
    function createLicense(string memory _name, string memory _dob) public {
        require(ownerHasLicense[msg.sender] == false);
        licenses.push(License(_name, _dob));
        uint id = licenses.length - 1;
        licenseToOwner[msg.sender] = id;
        ownerHasLicense[msg.sender] = true;
        emit NewLicense(_name, _dob);
    }

}
