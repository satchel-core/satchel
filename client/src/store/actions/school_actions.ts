import Web3 from 'web3';
import axios from 'axios';

import * as types from './types';
import contractAbi from '../../contracts/Satchel.sol/Satchel.json';
import assets from '../../utils/assets.json';
import erc20Abi from '../../contracts/erc20Abi.json';
import schoolAbi from '../../contracts/School.sol/School.json';
import { connectWallet } from './helpers';
import { AbiItem } from 'web3-utils';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { getKeys, handleCustomUrl } from '../../utils/common';
import { Dispatch } from 'react';

// const dispatch = useDispatch();
// declare const window: any;

// export const getSchoolByUser = (userAddress: string) => async () => {
//     const web3 = await connectWallet();
//     const userContract = new web3.eth.Contract(userAbi.abi as AbiItem[], userAddress);

//     try {
//         console.log("Setting School");
//         let schoolAddress = await userContract.methods.schoolContract().call();
//         console.log("School address is ", schoolAddress);
//         console.log(schoolAddress);
//         const schoolContract = new web3.eth.Contract(schoolAbi.abi as AbiItem[], schoolAddress);
//         const name = await schoolContract.methods.getName().call();
//         console.log("School name is ", name);

//         dispatch({
//             type: types.GET_SCHOOL_INFO,
//             payload: {
//                 name,
//                 address: schoolAddress,
//             },
//         });

//         dispatch(getSchoolProjects(schoolAddress));
//     } catch (e) {
//         console.log(e);
//     }
// };

// export const getSchoolProjects = (schoolAddress: string) => async () => {
//     let { data } = await axios.get(
//         `${process.env.REACT_APP_SERVER_URL}/api/project?schoolAddress=${schoolAddress}`
//     );
//     dispatch({
//         type: types.GET_SCHOOL_PROJECTS,
//         payload: data.projects,
//     });
// };

// export const loginSchool = (schoolName: string, history) => async () => {
//     dispatch({ type: types.LOAD_LOGIN_SCHOOL });
//     const web3 = await connectWallet();

//     let contractInstance = new web3.eth.Contract(
//         contractAbi.abi as AbiItem[],
//         process.env.REACT_APP_CONTRACT_ADDRESS
//     );

//     try {
//         if (!window.ethereum) {
//             console.log("Metamask not installed");
//             return dispatch({
//                 type: types.SCHOOL_LOGIN_ERROR,
//                 payload: "Metamask not installed",
//             });
//         }
//         const accounts = await window.ethereum.request({
//             method: "eth_requestAccounts",
//         });
//         const account = accounts[0];
//         console.log(accounts);
//         let ownedSchoolIds = await contractInstance.methods
//             .getSchoolByOwner(account)
//             .call();
//         console.log(ownedSchoolIds);
//         let ownedSchoolNames = await Promise.all(
//             ownedSchoolIds.map(
//                 async (id: any) => await contractInstance.methods.getSchoolName(id).call()
//             )
//         );
//         console.log(ownedSchoolNames);
//         if (!ownedSchoolNames.includes(schoolName)) {
//             console.log("No school found");
//             return dispatch({
//                 type: types.SCHOOL_LOGIN_ERROR,
//                 payload: "No School Found",
//             });
//         }

//         let id = ownedSchoolNames.indexOf(schoolName);
//         let schoolAddress = await contractInstance.methods.schoolArray(id).call();
//         console.log(schoolName);
//         console.log(schoolAddress);
//         dispatch({
//             type: types.GET_SCHOOL_INFO,
//             payload: {
//                 name: schoolName,
//                 address: schoolAddress,
//             },
//         });

//         history.push({
//             pathname: "/SchoolDashboard",
//         });
//     } catch (e) {
//         console.log(e);
//         return dispatch({
//             type: types.SCHOOL_LOGIN_ERROR,
//             payload: e.message,
//         });
//     }
// };
// export const handleSchoolLogout = (history) => {
//     history.push({ pathname: "/Login" });
//     return {
//         type: types.LOGOUT_USER,
//         payload: {},
//     };
// };

export const getUserBalanceInSchool = async (contractAddress: string, dispatch: Dispatch<any>) => {
	const web3 = await connectWallet();

	let schoolContract = new web3.eth.Contract(schoolAbi.abi as AbiItem[], contractAddress);
	console.log(contractAddress)
	try {
		const accounts = await web3.eth.getAccounts();

		const promises = assets.map(async (asset) => {
			console.log(asset.aTokenAddress);
			return schoolContract.methods.getBalance(asset.aTokenAddress, accounts[0]).call();
		});

		let data = await Promise.all(promises);
		const tokenBalances = {};

		for (let i = 0; i < assets.length; i++) {
			tokenBalances[assets[i].symbol] = Number(
				(data[i] / 10 ** assets[i].decimals).toFixed(assets[i].decimals),
			);
		}
		console.log(tokenBalances)
		dispatch({ type: types.SET_TOKEN_BALANCES, payload: tokenBalances });

		// const tokens = getKeys(tokenBalances);
		// const res = await fetch(
		// 	`${process.env.NEXT_PUBLIC_SERVER_URL}/api/token/getTokenPrices?tokens=${tokens}`,
		// );
		// const tokenPrices = await res.json();

		// var finalBalance: number = 0;
		// for (const key of tokens) {
		// 	// console.log("START")
		// 	// console.log(tokenBalances)
		// 	// console.log(tokenPrices.data[key]["quote"]["USD"]["price"])
		// 	finalBalance =
		// 		finalBalance + tokenBalances[key] * tokenPrices.data[key]['quote']['USD']['price'];
		// }

		// console.log(finalBalance)

		// dispatch({ type: types.SET_SCHOOL_BALANCE, payload: finalBalance });

		// return finalBalance;
	} catch (e) {
		console.log(e);
		console.log(e.message);
	}
};

export const depositSchool = async (
	schoolAddress: string,
	depositAmt: number,
	asset: any,
	dispatch: Dispatch<any>,
) => {
	const web3 = await connectWallet();

	const amount = web3.utils.toHex(depositAmt * 10 ** asset.decimals);
	// dispatch({ type: types.LOAD_SCHOOL_WITHDRAW });
	try {
		const accounts = await web3.eth.getAccounts();

		// console.log(depositAmt);
		// console.log(amount);

		let erc20Instance = new web3.eth.Contract(erc20Abi as AbiItem[], asset.tokenAddress);
		await erc20Instance.methods.approve(schoolAddress, amount).send({
			from: accounts[0],
			gasLimit: web3.utils.toHex(1000000),
			gasPrice: web3.utils.toHex(20000000000),
		});

		let schoolInstance = new web3.eth.Contract(schoolAbi.abi as AbiItem[], schoolAddress);

		console.log(schoolInstance.methods);
		console.log('Approved');
		await schoolInstance.methods.deposit(asset.tokenAddress, asset.aTokenAddress, amount).send({
			from: accounts[0],
			gasLimit: web3.utils.toHex(1000000),
			gasPrice: web3.utils.toHex(20000000000),
		});

		console.log('Balance sent');
		dispatch(getUserBalanceInSchool(schoolAddress, dispatch));
	} catch (err) {
		console.log(err.message);
		dispatch({ type: types.DEPOSIT_FAIL, payload: err.message });
	}
};

export const withdrawSchool = async (
	schoolAddress: string,
	withdrawAmt: number,
	asset: any,
	dispatch: Dispatch<any>,
) => {
	const web3 = await connectWallet();

	const amount = web3.utils.toHex(withdrawAmt * Math.pow(10, asset.decimals));
	// dispatch({ type: types.LOAD_SCHOOL_WITHDRAW });
	try {
		const accounts = await web3.eth.getAccounts();
		const schoolInstance = new web3.eth.Contract(schoolAbi.abi as AbiItem[], schoolAddress);

		await schoolInstance.methods
			.withdraw(asset.tokenAddress, asset.aTokenAddress, amount)
			.send({
				from: accounts[0],
				gasLimit: web3.utils.toHex(1000000),
				gasPrice: web3.utils.toHex(20000000000),
			});

		dispatch(getUserBalanceInSchool(schoolAddress, dispatch));
	} catch (err) {
		console.log(err.message);
		dispatch({ type: types.DEPOSIT_FAIL, payload: err.message });
	}
};
