pragma solidity 0.8.11;

import "./School.sol";

contract Organization {
    uint orgID;
    mapping (uint => School) public schools;

    event SchoolCreated(uint id);
    event SchoolWithdraw(uint id, address asset, uint amount);

     constructor (uint _orgID) {
         orgID = _orgID;
     } 

     function getID() public view returns (uint) {
         return orgID;
     }

     /* Possibly do null checks here */
     function createSchool(uint schoolID, address lendingPool) public {
         assert(msg.sender == address(this));
         //assert(schools[schoolID].schoolID != 0);
         schools[schoolID] = new School(address(this), lendingPool);
         emit SchoolCreated(schoolID);
     }


    // ensure aTokens cannot be withdrawn
     function withdrawFromSchool(uint school, address asset, uint amount) public {
         assert(msg.sender == address(this));
         schools[school].approve(asset, amount);
         schools[school].transfer(asset, amount);
         emit SchoolWithdraw(school, asset, amount);
     }
}