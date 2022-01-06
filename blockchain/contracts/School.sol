pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./floating_point/Exponential.sol";
import "./ILendingPool.sol";

contract School is Exponential {
    
    struct UserData {
        uint neib;
        uint shares;
    }

    // Asset addresses are ** aToken ** addresses
    mapping (address => uint) public totalShares;

    // User address -> aToken address -> UserData
    mapping (address => mapping (address => UserData)) userData; 
    
    Exp fractionToWithdraw;
    address public organization;
    address public lendingPool;
    uint shareDecimals = 10 ** 12;

    constructor (address _organization, address _lendingPool) public {
        organization = _organization;
        lendingPool = _lendingPool;

        (MathError mErr, uint _shareDecimals) = getExp(3,4);
        if (mErr != MathError.NO_ERROR) {
            revert("Exponential Failure when setting interestSplit");
        }
        shareDecimals = _shareDecimals;

    }

    /**
     * Allow a user to deposit tokens into the protocol
     * NOTE: Users must call _erc20Contract.approve() before calling this function
     * since we this contract will be using their tokens to deposit into aave
     * @param asset the ERC contract for the underlying token
     * @param amount the amount of token supplied, multipled by 10^12
     * @return nothing, emits Deposit event upon successful completion
     */
    function deposit(address asset, uint amount, address lendingPool) public {
        if (totalShares[asset] == 0){
            return depositInitial(asset, amount);
        }
        
        // Convert amount to shares
        uint shares = convertToShares(asset, amount);

        // Calculate how much interest has been earned so far
        uint interestSoFar = calculateInterest(asset, userData[msg.sender][asset].neib, shares);

        // Update the new shares
        userData[msg.sender][asset].shares = shares;
        totalShares[asset] += shares;

        // Do the aave stuff to transfer the asset in
        ILendingPool pool = ILendingPool(lendingPool);


        // Calculate new neib based on new share proportion and 
        userData[msg.sender][asset].neib = calculateInterest(asset, interestSoFar, shares);
        
        // do Aave stuff, properly set UserData, transfer aTokens to school contract

    }

    function depositInitial(address asset, uint amount) private {
        userData[msg.sender][asset].shares = amount;
        userData[msg.sender][asset].neib = amount;
        totalShares[asset] = amount;
    }
    
    /**
     * Allow a user to withdraw tokens out of the protocol, splitting interest acccordingly
     * NOTE: Users must call _erc20Contract.approve() before calling this function
     * since we this contract will be using their tokens to deposit into aave
     * @param asset the ERC contract for the underlying token
     * @param amount the amount of token user wishes to withdraw, multipled by 10^12
     * @return nothing, emits Deposit event upon successful completion
     */
    function withdraw(address asset, uint amount) public {

    }

    /**
     * Gets the total amount of atokens owned by the user
     * @param asset the ATOKEN contract address for the underlying token
     * @param user the address of the user
     * @return the number of ATOKENS the user has in the protocol, multipled by 10^12
     */
    function getBalance(address asset, address user) public view {

    }

    /**
     * Gets the total amount of atokens owned
     * @param asset the ATOKEN contract address for the underlying token
     * @return the number of ATOKENS the school has, multipled by 10^12
     */
    function getTotalBalance(address asset) public view {
        IERC20 aTokenContract = IERC20(asset);
        return aTokenContract.balanceOf(address(this));
    }

    function convertToShares(address asset, uint amount) internal view returns(uint) {
        return amount * totalShares[asset] / getTotalBalance(asset);
    }
    
    function convertToAsset(address asset, uint amount) internal view returns(uint) {
        return amount * getTotalBalance(asset) / totalShares[asset];
    }

    /**
     * Approves tokens for withdraw by the overarching organization
     * NOTE should prob be access controlled, only organization contract
     * @param asset the token contract address for the underlying token
     * @param amount the amount of assets to approve in the asset's native decimal amount
     */
    function calculateInterest(address asset, uint neib, uint shares) internal view returns(uint) {
        uint withdraw = shares * getTotalBalance(asset) / totalShares[asset];
        return withdraw - neib;
    }

    /**
     * Approves tokens for withdraw by the overarching organization
     * NOTE should prob be access controlled, only organization contract
     * @param asset the token contract address for the underlying token
     * @param amount the amount of assets to approve in the asset's native decimal amount
     */
    function approve(address asset, uint amount) public {
        IERC20 aTokenContract = IERC20(asset);
        aTokenContract.approve(organization, amount);
    }

     
}