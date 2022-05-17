const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const Web3 = require("web3");
const satchelAbi = require("../artifacts/contracts/Satchel.sol/Satchel.json");
const orgAbi = require("../artifacts/contracts/Organization.sol/Organization.json");

const satchelAddress = "0x5034ab667621c54d832FbD62d226770689BEdcFC";
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
    .createOrg(1, "0x20E43CAdC9961eDfc61170EeeF66d571C5993DFC")
    .send({ from: accounts[0] });

  let orgAddress = await satchelContract.methods.orgs(1).call();
  // let orgAddress = "0xd562BeBcAD4dC498Fc0D2A745CFD3db34a773964";
  // tim org = 0x4069aB4ca5d35A85F938E7D917c74ca4C38B3C46
  console.log(orgAddress);

  const orgContract = new web3.eth.Contract(orgAbi.abi, orgAddress);
  await orgContract.methods
    .createSchool(1, lendingPoolAddress)
    .send({ from: accounts[0] });
  let schoolAddress = await orgContract.methods.schools(1).call();
  // tim school = 0xA05cFa1C33E7561F8d14E04c9c9372721D370c34
  console.log(schoolAddress); // 0x9d4d647f42c4c297734456bD72c4fad540530251
}

deploySchool();
