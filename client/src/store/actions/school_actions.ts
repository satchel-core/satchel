import Web3 from "web3";
import axios from "axios";

import * as types from "./types";
import contractAbi from "../../contracts/UnicefSatchel.sol/UnicefSatchel.json";
import assets from "../../utils/assets.json";
import userAbi from "../../contracts/User.sol/User.json";
import schoolAbi from "../../contracts/School.sol/School.json";
import { connectWallet } from "./helpers";
import { AbiItem } from 'web3-utils';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from "next/router";
import { getKeys, handleCustomUrl } from "../../utils/common";
import { Dispatch } from "react";

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

export const deploySchool = (schoolName: string, router: NextRouter, dispatch: Dispatch<any>, app_server: string, contract_address: string) => async () => {
    const web3 = await connectWallet();

    let contractInstance = new web3.eth.Contract(
        contractAbi.abi as AbiItem[],
        contract_address
    );
    dispatch({ type: types.LOAD_CREATE_SCHOOL });

    try {
        const accounts = await web3.eth.getAccounts();
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await contractInstance.methods
            .newSchool(schoolName)
            .estimateGas({ from: accounts[0] }); // TODO: How do we react if the transaction is rejected?

        const { events } = await contractInstance.methods
            .newSchool(schoolName)
            .send({ from: accounts[0], gasPrice: gasPrice, gas: gasEstimate });
        const id = events.newSchoolEvent.returnValues.schoolId;

        console.log(schoolName + " created");
        console.log(id);
        const schoolAddress = await contractInstance.methods.schoolArray(id).call();
        console.log(schoolAddress); // Gives address of school contract

        const body = {
            name: schoolName,
            address: schoolAddress,
            orgAddress: "0x6bf76B2668fF5446fbaDCb94231E2A44ba077bd6",
            city: "Nice",
            country: "France"
        }

        await axios.post(
            `${app_server}/api/school/createSchool`, body
        );

        dispatch({
            type: types.GET_SCHOOL_INFO,
            payload: body,
        });

        handleCustomUrl("school/", schoolAddress, router)

    } catch (err) {
        console.log(err);
        return dispatch({
            type: types.SCHOOL_LOGIN_ERROR,
            payload: err.message,
        });
    }
};

// export const handleSchoolLogout = (history) => {
//     history.push({ pathname: "/Login" });
//     return {
//         type: types.LOGOUT_USER,
//         payload: {},
//     };
// };

export const getSchoolBalance = (contractAddress: string, dispatch: Dispatch<any>) => async () => {
    console.log("TEST")
    const web3 = await connectWallet();

    let schoolContract = new web3.eth.Contract(schoolAbi.abi as AbiItem[], contractAddress);
    try {
        const promises = assets.map(async (asset) => {
            console.log(asset);
            return schoolContract.methods.getBalance(asset.tokenAddress).call();
        });
        console.log(promises);

        let data = await Promise.all(promises);
        console.log(data);
        const tokenBalances = {};

        for (let i = 0; i < assets.length; i++) {
            tokenBalances[assets[i].symbol] = Number(
                (data[i] / (10 ** assets[i].decimals)).toFixed(assets[i].decimals)
            );
        }
        console.log(tokenBalances);
        dispatch({ type: types.SET_TOKEN_BALANCES, payload: tokenBalances });

        const tokens = getKeys(tokenBalances)
        const tokenPrices = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/token/getTokenPrices?tokens=${tokens}`)

        var finalBalance: number = 0;
        for (const key of tokens) {
            finalBalance = finalBalance + (tokenBalances[key] / tokenPrices[key]["USD"]["price"])
        }

        console.log(finalBalance)

        dispatch({ type: types.SET_SCHOOL_BALANCE, payload: finalBalance })

        return finalBalance;

    } catch (e) {
        console.log(e);
        console.log(e.message);
    }
};

// This is probably broken...
// const underlyingDecimals = 18;
// export const withdrawSchool =
//     (schoolAddress, withdraw, asset) => async (dispatch) => {
//         const web3 = await connectWallet();

//         const amount = web3.utils.toHex(
//             withdraw * Math.pow(10, underlyingDecimals)
//         );
//         dispatch({ type: types.LOAD_SCHOOL_WITHDRAW });
//         try {
//             const accounts = await web3.eth.getAccounts();
//             const schoolInstance = new web3.eth.Contract(
//                 schoolAbi.abi,
//                 schoolAddress
//             );

//             await schoolInstance.methods
//                 .withdrawBalance(amount, asset.tokenAddress)
//                 .send({
//                     from: accounts[0],
//                     gasLimit: web3.utils.toHex(1000000),
//                     gasPrice: web3.utils.toHex(20000000000),
//                 });

//             dispatch(getSchoolBalance(schoolAddress));
//         } catch (err) {
//             console.log(err.message);
//         }
//     };