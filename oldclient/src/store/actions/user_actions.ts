// import axios from "axios";
// import Web3 from "web3";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// import * as types from "../types";
// import contractAbi from "../../contracts/UnicefSatchel.sol/UnicefSatchel.json";
// import erc20Abi from "../../contracts/User.sol/Erc20.json";
// import cTokenAbi from "../../contracts/User.sol/CErc20.json";
// import userAbi from "../../contracts/User.sol/User.json";
// import schoolAbi from "../../contracts/School.sol/School.json";
// import assets from "../../assets.json";
// import { connectWallet } from "../../components/helpers";

// export const handleUserLogin = (history) => async (dispatch) => {
//   const web3 = await connectWallet();

//   let contractInstance = new web3.eth.Contract(
//     contractAbi.abi,
//     process.env.REACT_APP_CONTRACT_ADDRESS
//   );

//   console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

//   try {
//     const accounts = await web3.eth.getAccounts();
//     let userContractAddress = await contractInstance.methods
//       .getUserContract()
//       .call({ from: accounts[0] });
//     console.log("user addresss: " + userContractAddress);
//     console.log("account[0]" + accounts[0]);

//     dispatch({
//       type: types.LOGIN_USER_SUCCESS,
//       payload: {
//         contractAddress: userContractAddress,
//         address: accounts[0],
//         name: "",
//       },
//     });

//     if (userContractAddress == "0x0000000000000000000000000000000000000000") {
//       console.log("New user detected");
//       history.push({ pathname: "/SelectSchool" });
//     } else {
//       history.push({ pathname: "/Account" });
//     }
//   } catch (err) {
//     console.log(err);
//     console.log(err.message);
//     dispatch({ type: types.LOGIN_USER_FAILURE, payload: err.message });
//   }
// };

// export const handleUserSignup = (school, name, history) => async (dispatch) => {
//   const web3 = await connectWallet();

//   let contractInstance = new web3.eth.Contract(
//     contractAbi.abi,
//     process.env.REACT_APP_CONTRACT_ADDRESS
//   );

//   console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

//   try {
//     const accounts = await web3.eth.getAccounts();

//     let userContractAddress = await contractInstance.methods
//       .getUserContract()
//       .call({ from: accounts[0] });
//     console.log("user addresss: " + userContractAddress);
//     console.log("account[0]" + accounts[0]);

//     if (userContractAddress == "0x0000000000000000000000000000000000000000") {
//       await contractInstance.methods
//         .createUserContract(name, school.address, true)
//         .send({ from: accounts[0] });

//       userContractAddress = await contractInstance.methods
//         .getUserContract()
//         .call({ from: accounts[0] });

//       dispatch({
//         type: types.LOGIN_USER_SUCCESS,
//         payload: {
//           contractAddress: userContractAddress,
//           address: accounts[0],
//           name,
//         },
//       });
//       history.push({ pathname: "/Account" });
//     } else {
//       console.log("Not a new user!");
//       history.push({ pathname: "/Login" });
//     }
//   } catch (err) {
//     console.log(err);
//     console.log(err.message);
//     dispatch({ type: types.LOGIN_USER_FAILURE, payload: err.message });
//   }
// };

// export const getName = (contractAddress) => async (dispatch) => {
//   const web3 = await connectWallet();

//   let userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
//   let name = await userContract.methods.name().call();
//   console.log("Name is ", name);
//   dispatch({ type: types.GET_NAME, payload: name });
// };

// export const getBalance = (contractAddress) => async (dispatch) => {
//   const web3 = await connectWallet();

//   let userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
//   try {
//     const promises = assets.map(async (asset) => {
//       console.log(asset);
//       return userContract.methods
//         .underlyingAmountDeposited(asset.tokenAddress)
//         .call();
//     });
//     console.log(promises);

//     let data = await Promise.all(promises);
//     console.log(data);
//     const balance = {};

//     for (let i = 0; i < assets.length; i++) {
//       balance[assets[i].symbol] = Number(
//         (data[i] / 10 ** assets[i].decimals).toFixed(2)
//       );
//     }

//     dispatch({ type: types.GET_BALANCE, payload: balance });

//     // Get prices
//     const prices = await axios.get(
//       `${process.env.REACT_APP_SERVER_URL}/api/user/getTokenPrices`,
//       { params: { tokens: assets.map((asset) => asset.symbol).join() } }
//     );

//     // Convert price to USD and sum
//     let tb = 0;
//     const balance_usd = {};
//     assets.forEach((asset) => {
//       let { symbol } = asset;
//       balance_usd[symbol] =
//         prices.data.data[symbol].quote.USD.price * balance[symbol];
//       tb += balance_usd[symbol];
//     });

//     dispatch({ type: types.GET_TOTAL_BALANCE, payload: Number(tb.toFixed(2)) });

//     // Get ctoken interest rates
//     const cTokenInterest = await axios.get(
//       "https://api.compound.finance/api/v2/ctoken",
//       {
//         params: {
//           addresses: assets.map((asset) => asset.cTokenAddressMainnet),
//         },
//       }
//     );

//     console.log(cTokenInterest.data);

//     // Get avg interest
//     let interest = 0;
//     for (let i = 0; i < assets.length; i++) {
//       interest +=
//         (balance[assets[i].symbol] *
//           cTokenInterest.data.cToken[i].supply_rate.value *
//           50) /
//         tb;
//     }

//     dispatch({
//       type: types.GET_INTEREST_RATE,
//       payload: Number(interest.toFixed(2)),
//     });
//   } catch (e) {
//     console.log(e);
//     console.log(e.message);
//   }
// };

// export const getAssetPrices = () => async (dispatch) => {
//   const priceData = await axios.get(
//     `${process.env.REACT_APP_SERVER_URL}/api/user/getTokenPrices`,
//     { params: { tokens: assets.map((asset) => asset.symbol).join() } }
//   );

//   const prices = {};
//   assets.forEach((asset) => {
//     prices[asset.symbol] = priceData.data.data[asset.symbol].quote.USD.price;
//   });
//   dispatch({ type: types.GET_ASSET_PRICES, payload: prices });
// };

// // This is a little bit broken....
// export const getContribution = (contractAddress) => async (dispatch) => {
//   const web3 = await connectWallet();

//   const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);
//   let x = (await userContract.methods.getContribution().call()) / 1e18;
//   dispatch({ type: types.GET_CONTRIBUTION, payload: x });
// };

// export const getInterestRate = (contractAddress) => async (dispatch) => {
//   const { data } = await axios.get(
//     "https://api.compound.finance/api/v2/ctoken",
//     {
//       params: {
//         addresses: assets.map((asset) => asset.cTokenAddressMainnet),
//       },
//     }
//   );

//   const interestRates = data.cToken.map(
//     (cToken) => cToken.supply_rate.value * 50
//   );
//   console.log("Interest rate...");
//   console.log(interestRates);

//   dispatch({
//     type: types.GET_INTEREST_RATE,
//     payload: Number(((data.cToken[0].supply_rate.value / 2) * 100).toFixed(2)),
//   });
// };

// export const donate =
//   (contractAddress, schoolAddress, amount, asset) => async (dispatch) => {
//     const web3 = await connectWallet();
//     const accounts = await web3.eth.getAccounts();

//     const underlying = new web3.eth.Contract(erc20Abi.abi, asset.tokenAddress);

//     let supply = web3.utils.toHex(amount * Math.pow(10, asset.decimals));
//     await underlying.methods.transfer(schoolAddress, supply).send({
//       from: accounts[0],
//       gasLimit: web3.utils.toHex(1000000),
//       gasPrice: web3.utils.toHex(20000000000),
//     });

//     dispatch(getBalance(contractAddress));
//   };

// export const deposit = (contractAddress, amount, asset) => async (dispatch) => {
//   const web3 = await connectWallet();

//   console.log("handleGet\n\n\n");
//   dispatch({ type: types.LOAD_DEPOSIT });

//   console.log(asset);
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);

//     const underlying = new web3.eth.Contract(erc20Abi.abi, asset.tokenAddress);

//     console.log("Approve funds");
//     let supply = web3.utils.toHex(amount * Math.pow(10, asset.decimals));
//     await underlying.methods.approve(contractAddress, supply).send({
//       from: accounts[0],
//       gasLimit: web3.utils.toHex(1000000),
//       gasPrice: web3.utils.toHex(20000000000),
//     });

//     await userContract.methods
//       .deposit(asset.tokenAddress, asset.cTokenAddress, supply)
//       .send({
//         from: accounts[0],
//         gasLimit: web3.utils.toHex(1000000),
//         gasPrice: web3.utils.toHex(20000000000),
//       });
//     console.log("supply result");

//     dispatch(getBalance(contractAddress));
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const withdraw =
//   (contractAddress, withdrawAmount, asset) => async (dispatch) => {
//     try {
//       const web3 = await connectWallet();

//       dispatch({ type: types.LOAD_WITHDRAW });
//       const amount = web3.utils.toHex(
//         withdrawAmount * Math.pow(10, asset.decimals)
//       );

//       const accounts = await web3.eth.getAccounts();
//       const userContract = new web3.eth.Contract(userAbi.abi, contractAddress);

//       console.log(`Redeeming ...`);
//       console.log(asset.tokenAddress);
//       console.log(asset.cTokenAddress);

//       let redeemResult = await userContract.methods
//         .withdraw(amount, asset.tokenAddress, asset.cTokenAddress)
//         .send({
//           from: accounts[0],
//           gasLimit: web3.utils.toHex(1000000),
//           gasPrice: web3.utils.toHex(20000000000),
//         });

//       console.log(redeemResult.events.MyLog);
//       dispatch(getBalance(contractAddress));
//     } catch (e) {
//       console.log(e);
//     }
//   };

// export const handleUserLogout = (history) => async (dispatch) => {
//   try {
//     const provider = new WalletConnectProvider({
//       infuraId: process.env.REACT_APP_INFURA,
//     });
//     await provider.disconnect();
//     history.push({ pathname: "/Login" });
//     dispatch({
//       type: types.LOGOUT_USER,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

export {}