pragma solidity 0.8.11;

import "./School.sol";
import "hardhat/console.sol";

contract Organization {
    mapping (uint => School) schools;

     constructor () public {} 

     /* Possibly do null checks here */
     function createSchool(uint schoolID, address lendingPool) public {
         assert(msg.sender == address(this));
         schools[schoolID] = new School(address(this), lendingPool);
     }

     function withdrawFromSchool(uint school, address asset, uint amount) public {
         assert(msg.sender == address(this));
         schools[school].approve(asset, amount);
         schools[school].transfer(asset, amount);
     }
}