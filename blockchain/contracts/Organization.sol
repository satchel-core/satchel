pragma solidity 0.8.11;
import "hardhat/console.sol";

import "./School.sol";

contract Organization {
    uint orgID;
    address orgWalletAddress;
    mapping (uint => School) public schools;

    event SchoolCreated(uint id);
    event SchoolWithdraw(uint id, address asset, uint amount);

     constructor (uint _orgID, address _orgWalletAddress) {
         orgID = _orgID;
         orgWalletAddress = _orgWalletAddress;
     } 

     function getID() public view returns (uint) {
         return orgID;
     }

     /* Possibly do null checks here */
     function createSchool(uint schoolID, address lendingPool) public {
         assert(msg.sender == orgWalletAddress);
         //assert(schools[schoolID].schoolID != 0);
         schools[schoolID] = new School(schoolID, address(this), lendingPool);
         emit SchoolCreated(schoolID);
     }


    // ensure aTokens cannot be withdrawn
     function withdrawFromSchool(uint school, address asset, uint amount) public {
         assert(msg.sender == orgWalletAddress);
         schools[school].approve(asset, amount);
         schools[school].transfer(asset, amount);
         emit SchoolWithdraw(school, asset, amount);
     }
}