pragma solidity 0.8.11;

import "./Organization.sol";

contract OrganizationFactory {
    mapping (uint => Organization) public orgs;
    address satchelOwner;

    event OrganizationCreated(uint id);

    constructor (address _satchelOwner) {
        satchelOwner = _satchelOwner;
    }

    /* Possibly would want to do some null checks here */
    function createOrg(uint orgID) public {
        require(msg.sender == satchelOwner, "You must be the owner!");
        require(orgID != 0, "You may not create the zero org!");
        require(address(orgs[orgID]) == 0x0000000000000000000000000000000000000000, "The org ID must be unique!");
        orgs[orgID] = new Organization(orgID);
        emit OrganizationCreated(orgID);
    }
}