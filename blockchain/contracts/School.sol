pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./floating_point/Exponential.sol";
import "./ILendingPool.sol";
import "hardhat/console.sol";

contract School is Exponential {
    
    struct UserData {
        uint neib;
        uint shares;
    }

    uint schoolID;

    // Asset addresses are ** aToken ** addresses
    mapping (address => uint) public totalShares;

    // User address -> aToken address -> UserData
    mapping (address => mapping (address => UserData)) userData; 
    
    Exp fractionToWithdraw;
    address public organization;
    address public lendingPool;
    uint shareDecimals = 10 ** 12;

    event DepositMade(address user, address asset, address lpAsset, uint amount);
    event UserWithdrawMade(address user, address asset, address lpAsset, uint amount);
    event WithdrawToSchool(address asset, uint amount);

    constructor (uint _schoolID, address _organization, address _lendingPool) public {
        schoolID = _schoolID;
        organization = _organization;
        lendingPool = _lendingPool;

        (MathError mErr, Exp memory _fractionToWithdraw) = getExp(3,4);
        if (mErr != MathError.NO_ERROR) {
            revert("Exponential Failure when setting interestSplit");
        }
        fractionToWithdraw = _fractionToWithdraw;
    }

    /**
     * Allow a user to deposit tokens into the protocol
     * NOTE: Users must call _erc20Contract.approve() before calling this function
     * since we this contract will be using their tokens to deposit into aave
     * NOTE: We force all decimals to be 18 regardless of asset
     * @param asset the ERC contract for the underlying token
     * @param lpAsset the ERC contract for the liquidity token
     * @param amount the amount of token supplied, multipled by 10^18
     */
    function deposit(address asset, address lpAsset, uint amount) public {

        // console.log(totalShares[lpAsset]);
        // Check if the user has previously deposited
        if (totalShares[lpAsset] == 0){
            return depositInitial(asset, lpAsset, amount);
        }
        // console.log(totalShares[lpAsset]);
        // Convert amount to shares
        uint shares = convertToShares(lpAsset, amount);
        // console.log("Shares");
        // console.log(shares);

        // Calculate how much interest has been earned so far
        uint interestSoFar = calculateInterest(lpAsset, userData[msg.sender][lpAsset].neib, userData[msg.sender][lpAsset].shares);
        // console.log("Interest so far");
        // console.log(interestSoFar);

        // Issue new shares at the current rate
        userData[msg.sender][lpAsset].shares += shares;
        totalShares[lpAsset] += shares;

        // Temporarily move user's assets into the School contract 
        IERC20 assetContract = IERC20(asset);
        assetContract.transferFrom(msg.sender, address(this), amount);

        // Deposit assets into Aave's lending pool and receive tokens
        ILendingPool pool = ILendingPool(lendingPool);
        assetContract.approve(lendingPool, amount);
        pool.deposit(asset, amount, address(this), 0);

        // Calculate new neib based on new share proportion and previously  earned interest
        // console.log("Old neib");
        // console.log(userData[msg.sender][lpAsset].neib);

        userData[msg.sender][lpAsset].neib = convertToAsset(lpAsset, userData[msg.sender][lpAsset].shares) - interestSoFar;

        emit DepositMade(msg.sender, asset, lpAsset, amount);
        // console.log("Adjusted neib");
        // console.log(userData[msg.sender][lpAsset].neib);

        // console.log("Testing Interest");
        // console.log(calculateInterest(lpAsset, userData[msg.sender][lpAsset].neib, userData[msg.sender][lpAsset].shares));
    }

    function depositInitial(address asset, address lpAsset, uint amount) private {

        // Temporarily move user's assets into the School contract 
        IERC20 assetContract = IERC20(asset);
        assetContract.transferFrom(msg.sender, address(this), amount);

        // Deposit assets into Aave's lending pool and receive tokens
        ILendingPool pool = ILendingPool(lendingPool);
        assetContract.approve(lendingPool, amount);
        pool.deposit(asset, amount, address(this), 0);

        // Issue shares at a rate of one share per asset
        userData[msg.sender][lpAsset].shares = amount;
        userData[msg.sender][lpAsset].neib = amount;
        totalShares[lpAsset] = amount;
        emit DepositMade(msg.sender, asset, lpAsset, amount);
    }
    
    /**
     * Allow a user to withdraw tokens out of the protocol, splitting interest acccordingly
     * NOTE: 
     * @param asset the ERC contract for the underlying token
     * @param lpAsset the ERC contract for the liquidity token
     * @param amount the amount of token user wishes to withdraw, multipled by 10^18
     */
    function withdraw(address asset, address lpAsset, uint amount) public {
        
        // Convert asset amount to shares 
        uint shares = convertToShares(lpAsset, amount);
        // console.log("Shares");
        // console.log(shares);

        // Require that the user has enough shares to withdraw
        require(userData[msg.sender][lpAsset].shares >= shares, "Not enough tokens");

        // Calculate interest and school interest cut
        uint interest = calculateInterest(lpAsset, userData[msg.sender][lpAsset].neib, shares);
        // console.log("Interest");
        // console.log(interest);
        (MathError mErr, uint schoolCut) = mulScalarTruncate(fractionToWithdraw, interest);
        if (mErr != MathError.NO_ERROR) {
            revert("Exponential Failure when calculating school interest cut");
        }

        // Withdraw the user's cut and the school's cut
        ILendingPool pool = ILendingPool(lendingPool);
        pool.withdraw(asset, amount - schoolCut, msg.sender);
        if (schoolCut > 0) {
            pool.withdraw(asset, schoolCut, address(this));
            emit WithdrawToSchool(asset, schoolCut);
        }

        // Update userData based on new shares 
        uint oldShares = userData[msg.sender][lpAsset].shares;
        userData[msg.sender][lpAsset].shares -= shares;
        userData[msg.sender][lpAsset].neib = userData[msg.sender][lpAsset].neib * userData[msg.sender][lpAsset].shares / oldShares;
        totalShares[lpAsset] -= shares;

        emit UserWithdrawMade(msg.sender, asset, lpAsset, amount);
    }

    /**
     * Gets the total amount of tokens owned by the user
     * @param asset the ATOKEN contract address for the underlying token
     * @param user the address of the user
     * @return the number of TOKENS the user has in the protocol, multipled by 10^18
     */
    function getBalance(address asset, address user) public view returns(uint) {
        return getTotalBalance(asset) * userData[user][asset].shares / totalShares[asset];
    }

    /**
     * Gets the total amount of atokens owned
     * @param asset the ATOKEN contract address for the underlying token
     * @return the number of ATOKENS the school has, multipled by 10^18
     */
    function getTotalBalance(address asset) public view returns(uint) {
        IERC20 aTokenContract = IERC20(asset);
        return aTokenContract.balanceOf(address(this));
    }

    /**
     * Converts some amount of atokens to shares
     * @param lpAsset the ATOKEN contract address for the underlying token
     * @param amount the number of ATOKENS the school has, multipled by 10^18 
     * @return the number of shares that amount of ATOKENS is equivalent to
     */
    function convertToShares(address lpAsset, uint amount) internal view returns(uint) {
        return amount * totalShares[lpAsset] / getTotalBalance(lpAsset);
    }
    
    /**
     * Converts some amount of atokens to shares
     * @param lpAsset the ATOKEN contract address for the underlying token
     * @param shares the number of ATOKENS the school has, multipled by 10^18 
     * @return the number of shares that amount of ATOKENS is equivalent to
     */
    function convertToAsset(address lpAsset, uint shares) internal view returns(uint) {
        return shares * getTotalBalance(lpAsset) / totalShares[lpAsset];
    }

    /**
     * Calculates the interest earned so far.
     * NOTE should prob be access controlled, only organization contract
     * @param lpAsset the ATOKEN contract address for the underlying token
     * @param neib non interest bearing part of the asset
     * @param shares number of shares that the interest is being calculated for
     */
    function calculateInterest(address lpAsset, uint neib, uint shares) internal view returns(uint) {
        if (userData[msg.sender][lpAsset].shares == 0) {
            return 0;
        }

        uint assetEquivalent = convertToAsset(lpAsset, shares);
        uint neibEquivalent = neib * shares / userData[msg.sender][lpAsset].shares;
        if (assetEquivalent < neibEquivalent){
            return 0;
        }
        return assetEquivalent - neibEquivalent;
    }

    /**
     * Approves tokens for withdraw by the overarching organization
     * NOTE should prob be access controlled, only organization contract
     * @param asset the token contract address for the underlying token
     * @param amount the amount of assets to approve in the asset's native decimal amount
     */
    function approve(address asset, uint amount) public {
        assert(msg.sender == organization);
        IERC20 aTokenContract = IERC20(asset);
        aTokenContract.approve(organization, amount);
    }

    /**
     * Moves tokens to the overaching organization
     * NOTE should prob be access controlled, only organization contract
     * @param asset the token contract address for the underlying token
     * @param amount the amount of assets to transfer to the organization, in the asset's native decimal amount
     */
    function transfer(address asset, uint amount) public {
        assert(msg.sender == organization);
        IERC20 aTokenContract = IERC20(asset);
        aTokenContract.transfer(organization, amount);
    }
     
}