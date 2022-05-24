import axios from 'axios';

import * as types from './types';

import assets from '../../utils/assets.json';
import { Dispatch } from 'react';
import { calculateInterest, connectWallet } from './helpers';
import erc20Abi from '../../contracts/erc20Abi.json';
import schoolAbi from '../../contracts/School.sol/School.json';
import { AbiItem } from 'web3-utils';
import { getKeys, handleCustomUrl } from '../../utils/common';
import { request, gql } from 'graphql-request';
import { NextRouter } from 'next/router';

export const getUserBalanceInSchool =
	(contractAddress: string) => async (dispatch: Dispatch<any>) => {
		const web3 = await connectWallet();

		let schoolContract = new web3.eth.Contract(schoolAbi.abi as AbiItem[], contractAddress);
		console.log(contractAddress);
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
			console.log(tokenBalances);
			dispatch({ type: types.GET_USER_TOKEN_BALANCE, payload: tokenBalances });

			const tokens = getKeys(tokenBalances);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/token/getTokenPrices?tokens=${tokens}`,
			);
			const tokenPrices = await res.json();

			var finalBalance: number = 0;
			for (const key of tokens) {
				// console.log("START")
				// console.log(tokenBalances)
				// console.log(tokenPrices.data[key]["quote"]["USD"]["price"])
				finalBalance =
					finalBalance + tokenBalances[key] * tokenPrices.data[key]['quote']['USD']['price'];
			}

			console.log(finalBalance);

			dispatch(getInterestRates());

			dispatch({ type: types.GET_USER_TOTAL_BALANCE, payload: finalBalance });

			return finalBalance;
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	};

export const depositSchool =
	(schoolAddress: string, depositAmt: number, asset: any, router: NextRouter) =>
	async (dispatch: Dispatch<any>) => {
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
			let result = await schoolInstance.methods
				.deposit(asset.tokenAddress, asset.aTokenAddress, amount)
				.send({
					from: accounts[0],
					gasLimit: web3.utils.toHex(1000000),
					gasPrice: web3.utils.toHex(20000000000),
				});

			console.log(result);

			dispatch(getUserBalanceInSchool(schoolAddress));
			handleCustomUrl('/confirm/', schoolAddress, router);
		} catch (err) {
			console.log(err.message);
			dispatch({ type: types.DEPOSIT_FAIL, payload: err.message });
		}
	};

export const withdrawSchool =
	(schoolAddress: string, withdrawAmt: number, asset: any, router: NextRouter) =>
	async (dispatch: Dispatch<any>) => {
		const web3 = await connectWallet();

		const amount = web3.utils.toHex(withdrawAmt * Math.pow(10, asset.decimals));
		// dispatch({ type: types.LOAD_SCHOOL_WITHDRAW });
		try {
			const accounts = await web3.eth.getAccounts();
			const schoolInstance = new web3.eth.Contract(schoolAbi.abi as AbiItem[], schoolAddress);

			await schoolInstance.methods.withdraw(asset.tokenAddress, asset.aTokenAddress, amount).send({
				from: accounts[0],
				gasLimit: web3.utils.toHex(1000000),
				gasPrice: web3.utils.toHex(20000000000),
			});

			dispatch(getUserBalanceInSchool(schoolAddress));
		} catch (err) {
			console.log(err.message);
			dispatch({ type: types.DEPOSIT_FAIL, payload: err.message });
		}
	};

export const getInterestRates = () => async (dispatch: Dispatch<any>) => {
	const query = gql`
		{
			reserves(where: { usageAsCollateralEnabled: true }) {
				symbol
				liquidityRate
			}
		}
	`;

	let data = await request('https://api.thegraph.com/subgraphs/name/aave/protocol-v2', query);

	const interestRates = {};

	const assetSymbols = assets.map((asset) => asset.symbol);

	for (let i = 0; i < data.reserves.length; i++) {
		if (assetSymbols.includes(data.reserves[i].symbol)) {
			interestRates[data.reserves[i].symbol] = calculateInterest(data.reserves[i].liquidityRate);
		}
	}

	dispatch({
		type: types.GET_INTEREST_RATES,
		payload: interestRates,
	});
};

export {};
