import Web3 from 'web3';
import axios from 'axios';

import * as types from './types';
import satchelAbi from '../../contracts/Satchel.sol/Satchel.json';
import assets from '../../utils/assets.json';
import erc20Abi from '../../contracts/erc20Abi.json';
import schoolAbi from '../../contracts/School.sol/School.json';
import orgAbi from "../../contracts/Organization.sol/Organization.json";
import { connectWallet } from './helpers';
import { AbiItem } from 'web3-utils';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { getKeys, handleCustomUrl } from '../../utils/common';
import { Dispatch } from 'react';

export const deployOrg =
	(
		orgName: string,
		orgId: number,
		orgOwner: string,
		dispatch: Dispatch<any>,
	) =>
	async () => {
		const web3 = await connectWallet();

		const satchelContract = new web3.eth.Contract(satchelAbi.abi, process.env.REACT_APP_CONTRACT_ADDRESS);
		try {
			const accounts = await web3.eth.getAccounts();
			const gasPrice = await web3.eth.getGasPrice();
			const gasEstimate = await satchelContract.methods
				.createOrg(orgId, orgOwner)
				.estimateGas({ from: accounts[0] }); // TODO: How do we react if the transaction is rejected?

			const { events } = await satchelContract.methods
				.createOrg(orgId, orgOwner)
				.send({ from: accounts[0], gasPrice: gasPrice, gas: gasEstimate });
			const id = events.newSchoolEvent.returnValues.schoolId;

			console.log(id);
			const orgAddress: string = await satchelContract.methods.orgs(id).call();
			console.log(orgAddress); // Gives address of school contract
			// const body = {
			// 	name: schoolName,
			// 	address: address,
			// 	orgAddress: '0x6bf76b2668ff5446fbadcb94231e2a44ba077bd6',
			// 	city: 'Nice',
			// 	country: 'France',
			// };

			// await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/school/createSchool`, body);
			
			// TODO: Handle whatever comes back 

			// handleCustomUrl('school/', address, router);
		} catch (err) {
			console.log(err);
			return dispatch({
				type: types.SCHOOL_LOGIN_ERROR,
				payload: err.message,
			});
		}
	};

export const deploySchool =
	(
		schoolName: string,
		schoolId: string,
		router: NextRouter,
		dispatch: Dispatch<any>,
		org_address: string,
		lending_pool_address: string,
	) =>
	async () => {
		const web3 = await connectWallet();

		let orgContract = new web3.eth.Contract(
			orgAbi.abi as AbiItem[],
			org_address,
		);
		dispatch({ type: types.LOAD_CREATE_SCHOOL });

		try {
			const accounts = await web3.eth.getAccounts();
			const gasPrice = await web3.eth.getGasPrice();
			const gasEstimate = await orgContract.methods
				.newSchool(schoolId, lending_pool_address)
				.estimateGas({ from: accounts[0] }); // TODO: How do we react if the transaction is rejected?

			const { events } = await orgContract.methods
				.newSchool(schoolId, lending_pool_address)
				.send({ from: accounts[0], gasPrice: gasPrice, gas: gasEstimate });
			const id = events.newSchoolEvent.returnValues.schoolId;

			console.log(schoolName + ' created');
			console.log(id);
			const schoolAddress: string = await orgContract.methods.schools(id).call();
			console.log(schoolAddress); // Gives address of school contract
			const address = schoolAddress.toLowerCase();

			const body = {
				name: schoolName,
				address: address,
				orgAddress: org_address, // '0x6bf76b2668ff5446fbadcb94231e2a44ba077bd6',
				city: 'Nice',
				country: 'France',
			};

			await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/school/createSchool`, body);

			dispatch({
				type: types.GET_SCHOOL_INFO,
				payload: body,
			});

			handleCustomUrl('school/', address, router);
		} catch (err) {
			console.log(err);
			return dispatch({
				type: types.SCHOOL_LOGIN_ERROR,
				payload: err.message,
			});
		}
	};

