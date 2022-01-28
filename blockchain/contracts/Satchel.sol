pragma solidity 0.8.11;
import "./OrganizationFactory.sol";

contract Satchel is OrganizationFactory {
    constructor(address _satchelOwner) OrganizationFactory(_satchelOwner) {
    }
}
