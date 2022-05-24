import Web3 from 'web3';
import axios from 'axios';

import * as types from './types';
import satchelAbi from '../../contracts/Satchel.sol/Satchel.json';
import assets from '../../utils/assets.json';
import erc20Abi from '../../contracts/erc20Abi.json';
import schoolAbi from '../../contracts/School.sol/School.json';
import orgAbi from '../../contracts/Organization.sol/Organization.json';
import { connectWallet } from './helpers';
import { AbiItem } from 'web3-utils';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { getKeys, handleCustomUrl } from '../../utils/common';
import { Dispatch } from 'react';

export const deployOrg =
	(name: string, ownerAddress: string, dispatch: Dispatch<any>) => async () => {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/school/createSchool`, {
				name,
				ownerAddress,
			});
		} catch (err) {
			console.log(err);
			return dispatch({
				type: types.SCHOOL_LOGIN_ERROR,
				payload: err.message,
			});
		}
	};

export const deploySchool =
	(schoolName: string, router: NextRouter, org_address: string, lending_pool_address: string) =>
	async (dispatch: Dispatch<any>) => {
		console.log('trying to deploy school');
		const web3 = await connectWallet();

		let orgContract = new web3.eth.Contract(orgAbi.abi as AbiItem[], org_address);
		dispatch({ type: types.LOAD_CREATE_SCHOOL });

		try {
			const body = {
				name: schoolName,
				address: org_address,
				orgAddress: org_address,
				city: 'Nice',
				country: 'France',
			};
			console.log(body);
			await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/school/createSchool`, body);
			let { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/school/?address=${org_address}`,
			);
			console.log(data);
			let id = '0x' + data.school._id.valueOf();
			const accounts = await web3.eth.getAccounts();
			const gasPrice = await web3.eth.getGasPrice();
			const gasEstimate = await orgContract.methods
				.createSchool(id, lending_pool_address)
				.estimateGas({ from: accounts[0] }); // TODO: How do we react if the transaction is rejected?

			console.log(gasEstimate);
			let events = await orgContract.methods
				.createSchool(id, lending_pool_address)
				.send({ from: accounts[0], gasPrice: gasPrice, gas: gasEstimate });

			console.log(events);
			const schoolAddress: string = await orgContract.methods.schools(id).call();

			await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/school/deploySchool`, {
				_id: data.school._id.valueOf(),
				address: schoolAddress,
			});

			dispatch(getSchoolByOrg(org_address));

			// handleCustomUrl('school/', schoolAddress, router);
		} catch (err) {
			console.log(err);
			return dispatch({
				type: types.SCHOOL_LOGIN_ERROR,
				payload: err.message,
			});
		}
	};

export const getSchoolByOrg = (orgAddress: string) => async (dispatch: Dispatch<any>) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/org/getSchools?orgAddress=${orgAddress}`,
		);
		// console.log(data);
		return dispatch({
			type: types.GET_SCHOOL_BY_ORG,
			payload: data.schools,
		});
	} catch (err) {
		console.log(err);
		// return dispatch({
		// 	type: types.SCHOOL_LOGIN_ERROR,
		// 	payload: err.message,
		// });
	}
};

export const getOrgInfo = (orgAddress: string) => async (dispatch: Dispatch<any>) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/org/?address=${orgAddress}`,
		);
		// console.log(data);
		return dispatch({
			type: types.GET_ORG_INFO,
			payload: data.org,
		});
	} catch (err) {
		console.log(err);
		// return dispatch({
		// 	type: types.SCHOOL_LOGIN_ERROR,
		// 	payload: err.message,
		// });
	}
};
