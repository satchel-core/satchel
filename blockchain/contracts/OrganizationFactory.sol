pragma solidity 0.8.11;

import "./Organization.sol";
import "hardhat/console.sol";


contract OrganizationFactory {
    mapping (uint => Organization) orgs;
    address satchelOwner;

    constructor (address _satchelOwner) public {
        satchelOwner = _satchelOwner;
    }

    /* Possibly would want to do some null checks here */
    function createOrg(uint orgID) public {
        orgs[orgID] = new Organization();
    }
}