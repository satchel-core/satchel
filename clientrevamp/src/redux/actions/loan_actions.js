import axios from "axios";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import * as types from "../types";
import contractAbi from "../../contracts/UnicefSatchel.sol/UnicefSatchel.json";
import erc20Abi from "../../contracts/User.sol/Erc20.json";
import userAbi from "../../contracts/User.sol/User.json";
import cTokenAbi from "../../contracts/cTokenAbi.json";
import assets from "../../assets.json";
import { connectWallet } from "../../components/helpers";

export const getBorrowInterestRate = () => async (dispatch) => {
  const { data } = await axios.get(
    "https://api.compound.finance/api/v2/ctoken",
    {
      params: {
        addresses: assets.map((asset) => asset.cTokenAddressMainnet),
      },
    }
  );

  const interestRates = data.cToken.map((cToken) =>
    Number(cToken.supply_rate.value * 100).toFixed(2)
  );
  console.log("Interest rate...");
  console.log(interestRates);

  dispatch({
    type: types.GET_BORROW_INTEREST_RATE,
    payload: interestRates,
  });
};

export const getBorrowBalance = (contractAddress) => async (dispatch) => {
  const web3 = await connectWallet();

  const promises = assets.map(async (asset) => {
    try {
      let cToken = new web3.eth.Contract(cTokenAbi, asset.cTokenAddress);

      return cToken.methods.borrowBalanceCurrent(contractAddress).call();
    } catch (e) {
      console.log(e);
      return 0;
    }
  });

  const results = await Promise.all(promises);

  let payload = {};

  for (let i = 0; i < assets.length; i++) {
    // And do any mantissa processing here...
    payload[assets[i].symbol] = results[i] / 10 ** assets[i].decimals;
  }

  console.log(process.env.REACT_APP_CONTRACT_ADDRESS);
  dispatch({
    type: types.GET_BORROW_BALANCE,
    payload,
  });
};

export const enterMarket =
  (contractAddress, cTokenAddress) => async (dispatch) => {
    const web3 = await connectWallet();
    const accounts = await web3.eth.getAccounts();

    const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
    await userContract.methods
      .enterMarkets(process.env.REACT_APP_COMPTROLLER_ADDRESS, [cTokenAddress])
      .send({ from: accounts[0] });

    dispatch({ type: types.ENTER_MARKET });
  };

export const exitMarket =
  (contractAddress, cTokenAddress) => async (dispatch) => {
    const web3 = await connectWallet();
    const accounts = await web3.eth.getAccounts();

    const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
    await userContract.methods
      .exitMarket(process.env.REACT_APP_COMPTROLLER_ADDRESS, cTokenAddress)
      .send({ from: accounts[0] });

    dispatch({ type: types.EXIT_MARKET });
  };

export const borrow = (contractAddress, asset, amount) => async (dispatch) => {
  const web3 = await connectWallet();
  const accounts = await web3.eth.getAccounts();

  const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
  await userContract.methods
    .borrow(
      asset.tokenAddress,
      asset.cTokenAddress,
      web3.utils.toHex(amount * Math.pow(10, asset.decimals))
    )
    .send({ from: accounts[0] });

  dispatch(getBorrowBalance(contractAddress));
};

export const repay = (contractAddress, asset, amount) => async (dispatch) => {
  const web3 = await connectWallet();
  const accounts = await web3.eth.getAccounts();
  const supply = web3.utils.toHex(amount * Math.pow(10, asset.decimals));
  const underlying = new web3.eth.Contract(erc20Abi.abi, asset.tokenAddress);

  console.log("Approve funds");
  await underlying.methods.approve(contractAddress, supply).send({
    from: accounts[0],
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(20000000000),
  });

  console.log("Withdraw funds");
  const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
  await userContract.methods
    .repayBorrow(asset.tokenAddress, asset.cTokenAddress, supply)
    .send({ from: accounts[0] });

  dispatch(getBorrowBalance(contractAddress));
};