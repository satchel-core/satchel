import Web3 from "web3";
import axios from "axios";

import * as types from "../types";
import contractAbi from "../../contracts/UnicefSatchel.sol/UnicefSatchel.json";
import assets from "../../assets.json";
import userAbi from "../../contracts/User.sol/User.json";
import schoolAbi from "../../contracts/School.sol/School.json";
import { connectWallet } from "../../components/helpers";

export const getSchoolByUser = (userAddress) => async (dispatch) => {
  const web3 = await connectWallet();
  const userContract = new web3.eth.Contract(userAbi.abi, userAddress);

  try {
    console.log("Setting School");
    let schoolAddress = await userContract.methods.schoolContract().call();
    console.log("School address is ", schoolAddress);
    console.log(schoolAddress);
    const schoolContract = new web3.eth.Contract(schoolAbi.abi, schoolAddress);
    const name = await schoolContract.methods.getName().call();
    console.log("School name is ", name);

    dispatch({
      type: types.GET_SCHOOL_INFO,
      payload: {
        name,
        address: schoolAddress,
      },
    });

    dispatch(getSchoolProjects(schoolAddress));
  } catch (e) {
    console.log(e);
  }
};

export const getSchoolProjects = (schoolAddress) => async (dispatch) => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/project?schoolAddress=${schoolAddress}`
  );
  dispatch({
    type: types.GET_SCHOOL_PROJECTS,
    payload: data.projects,
  });
};

export const loginSchool = (schoolName, history) => async (dispatch) => {
  dispatch({ type: types.LOAD_LOGIN_SCHOOL });
  const web3 = await connectWallet();

  let contractInstance = new web3.eth.Contract(
    contractAbi.abi,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  try {
    if (!window.ethereum) {
      console.log("Metamask not installed");
      return dispatch({
        type: types.SCHOOL_LOGIN_ERROR,
        payload: "Metamask not installed",
      });
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(accounts);
    let ownedSchoolIds = await contractInstance.methods
      .getSchoolByOwner(account)
      .call();
    console.log(ownedSchoolIds);
    let ownedSchoolNames = await Promise.all(
      ownedSchoolIds.map(
        async (id) => await contractInstance.methods.getSchoolName(id).call()
      )
    );
    console.log(ownedSchoolNames);
    if (!ownedSchoolNames.includes(schoolName)) {
      console.log("No school found");
      return dispatch({
        type: types.SCHOOL_LOGIN_ERROR,
        payload: "No School Found",
      });
    }

    let id = ownedSchoolNames.indexOf(schoolName);
    let schoolAddress = await contractInstance.methods.schoolArray(id).call();
    console.log(schoolName);
    console.log(schoolAddress);
    dispatch({
      type: types.GET_SCHOOL_INFO,
      payload: {
        name: schoolName,
        address: schoolAddress,
      },
    });

    history.push({
      pathname: "/SchoolDashboard",
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: types.SCHOOL_LOGIN_ERROR,
      payload: e.message,
    });
  }
};

export const deploySchool = (schoolName, history) => async (dispatch) => {
  const web3 = await connectWallet();

  let contractInstance = new web3.eth.Contract(
    contractAbi.abi,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  dispatch({ type: types.LOAD_CREATE_SCHOOL });

  try {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await contractInstance.methods
      .newSchool(schoolName)
      .estimateGas({ from: accounts[0] });

    const { events } = await contractInstance.methods
      .newSchool(schoolName)
      .send({ from: accounts[0], gasPrice: gasPrice, gas: gasEstimate });
    console.log(events);
    const id = events.newSchoolEvent.returnValues.schoolId;

    console.log(schoolName + " created");
    console.log(id);
    const schoolAddress = await contractInstance.methods.schoolArray(id).call();
    console.log(schoolAddress); // Gives address of school contract

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/school/createSchool`,
      {
        name: schoolName,
        address: schoolAddress,
      }
    );

    dispatch({
      type: types.GET_SCHOOL_INFO,
      payload: {
        name: schoolName,
        address: schoolAddress,
      },
    });

    history.push({
      pathname: "/SchoolDashboard",
    });
  } catch (err) {
    console.log(err);
    return dispatch({
      type: types.SCHOOL_LOGIN_ERROR,
      payload: err.message,
    });
  }
};

export const handleSchoolLogout = (history) => {
  history.push({ pathname: "/Login" });
  return {
    type: types.LOGOUT_USER,
    payload: {},
  };
};

export const getSchoolBalance = (contractAddress) => async (dispatch) => {
  const web3 = await connectWallet();

  let schoolContract = new web3.eth.Contract(schoolAbi.abi, contractAddress);
  try {
    const promises = assets.map(async (asset) => {
      console.log(asset);
      return schoolContract.methods.getBalance(asset.tokenAddress).call();
    });
    console.log(promises);

    let data = await Promise.all(promises);
    console.log(data);
    const balance = {};

    for (let i = 0; i < assets.length; i++) {
      balance[assets[i].symbol] = Number(
        (data[i] / 10 ** assets[i].decimals).toFixed(2)
      );
    }
    console.log(balance);
    dispatch({ type: types.SET_SCHOOL_BALANCE, payload: balance });
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
};

// This is probably broken...
const underlyingDecimals = 18;
export const withdrawSchool =
  (schoolAddress, withdraw, asset) => async (dispatch) => {
    const web3 = await connectWallet();

    const amount = web3.utils.toHex(
      withdraw * Math.pow(10, underlyingDecimals)
    );
    dispatch({ type: types.LOAD_SCHOOL_WITHDRAW });
    try {
      const accounts = await web3.eth.getAccounts();
      const schoolInstance = new web3.eth.Contract(
        schoolAbi.abi,
        schoolAddress
      );

      await schoolInstance.methods
        .withdrawBalance(amount, asset.tokenAddress)
        .send({
          from: accounts[0],
          gasLimit: web3.utils.toHex(1000000),
          gasPrice: web3.utils.toHex(20000000000),
        });

      dispatch(getSchoolBalance(schoolAddress));
    } catch (err) {
      console.log(err.message);
    }
  };
