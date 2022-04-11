const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const Web3 = require("web3");
const satchelAbi = require("../artifacts/contracts/Satchel.sol/Satchel.json");
const orgAbi = require("../artifacts/contracts/Organization.sol/Organization.json");

const satchelAddress = "0xa9cEb17Ad79fE9DBf28071712881D5eA980BE571";
const lendingPoolAddress = "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe";

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.MNEMONIC,
  },
  providerOrUrl: process.env.INFURA,
});

const web3 = new Web3(provider);

async function deploySchool() {
  const satchelContract = new web3.eth.Contract(satchelAbi.abi, satchelAddress);

  const accounts = await web3.eth.getAccounts();
  await satchelContract.methods
    .createOrg(4, "0x6bf76B2668fF5446fbaDCb94231E2A44ba077bd6")
    .send({ from: accounts[0] });

  let orgAddress = await satchelContract.methods.orgs(4).call();
  // let orgAddress = "0xd562BeBcAD4dC498Fc0D2A745CFD3db34a773964";
  console.log(orgAddress);

  // const orgContract = new web3.eth.Contract(orgAbi.abi, orgAddress);
  // await orgContract.methods
  //   .createSchool(4, lendingPoolAddress)
  //   .send({ from: accounts[0] });
  // let schoolAddress = await orgContract.methods.schools(2).call();

  // console.log(schoolAddress); // 0x9d4d647f42c4c297734456bD72c4fad540530251
}

deploySchool();
