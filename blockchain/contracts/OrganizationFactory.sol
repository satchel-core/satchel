pragma solidity 0.8.11;

import "./Organization.sol";

contract OrganizationFactory {
    mapping (uint => Organization) public orgs;
    address satchelOwner;

    event OrganizationCreated(uint id);

    constructor (address _satchelOwner) public {
        satchelOwner = _satchelOwner;
    }

    function getOrg(uint id) public view returns () {
        return orgs[]
    }

    /* Possibly would want to do some null checks here */
    function createOrg(uint orgID) public {
        require(msg.sender == satchelOwner);
        require(orgID != 0);
        require(orgs[orgID].orgID == 0);
        orgs[orgID] = new Organization(orgID);
        emit OrganizationCreated(orgID);
    }
}