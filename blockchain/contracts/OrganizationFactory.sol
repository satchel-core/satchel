pragma solidity 0.8.11;

import "./Organization.sol";

contract OrganizationFactory {
    mapping (uint => Organization) public orgs;
    address satchelOwner;

    event OrganizationCreated(uint id);

    constructor (address _satchelOwner) public {
        satchelOwner = _satchelOwner;
    }

    /* Possibly would want to do some null checks here */
    function createOrg(uint orgID) public {
        require(msg.sender == satchelOwner);
        require(orgID != 0);
        require(address(orgs[orgID]) == 0x0000000000000000000000000000000000000000);
        orgs[orgID] = new Organization(orgID);
        emit OrganizationCreated(orgID);
    }
}