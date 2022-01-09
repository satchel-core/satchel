import hre, { ethers } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { Artifact } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Signers } from "./types";
import { School } from "../contract_types/School";
import { TestDai } from "../contract_types/TestDai";
import { IERC20 } from "../contract_types/IERC20";
import { ILendingPool } from "../contract_types/ILendingPool";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
chai.use(solidity);
const { deployContract } = hre.waffle;

describe("School Specific Functionality", function () {
  let school: School;
  let testDai: TestDai;
  let dai: IERC20;
  let aDai: IERC20;
  let lendingPool: ILendingPool;

  let admin: SignerWithAddress;
  let owner: SignerWithAddress;
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let multiplier: number;
  let exchangeRate: number;
  const schoolName = "School Name";

  const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
  const daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const aDaiAddress = "0x028171bCA77440897B824Ca71D1c56caC55b68A3";
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const userName = "User Name";
  const daiDecimals = 18;
  const usdcDecimals = 6;
  const uncertainty = 10 ** 13;
  beforeEach(async function () {
    this.signers = {} as Signers;
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    admin = signers[0];
    owner = signers[1];
    deployer = signers[2];
    alice = signers[3];
    bob = signers[4];

    // deploy School Contract
    const schoolArtifact: Artifact = await hre.artifacts.readArtifact("School");
    school = <School>(
      (<any>(
        await deployContract(
          owner,
          schoolArtifact,
          [owner.address, lendingPoolAddress],
          {
            gasPrice: 1_000_000_00,
          }
        )
      ))
    );

    // deploy testDai contract
    const TestDaiArtifact: Artifact = await hre.artifacts.readArtifact(
      "testDai"
    );
    testDai = <TestDai>(<any>await deployContract(owner, TestDaiArtifact, [], {
      gasPrice: 1_000_000_00,
    }));

    const IERC20Artifact: Artifact = await hre.artifacts.readArtifact("IERC20");

    dai = <IERC20>await ethers.getContractAt(IERC20Artifact.abi, daiAddress);
    aDai = <IERC20>await ethers.getContractAt(IERC20Artifact.abi, aDaiAddress);

    const LendingPoolArtifact: Artifact = await hre.artifacts.readArtifact(
      "ILendingPool"
    );

    lendingPool = <ILendingPool>(
      await ethers.getContractAt(LendingPoolArtifact.abi, lendingPoolAddress)
    );

    multiplier = 10 ** 18;
  });

  describe("Single User Tests", () => {
    it("User should be able to deposit once and the school should get aDai", async () => {
      //Transfer Dai from a whale to Alice
      const addrOfDaiWhale = "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6";
      const daiWhaleUser = await ethers.getSigner(addrOfDaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfDaiWhale],
      });

      const daiAmtForAlice = BigInt(500 * 10 ** 18);

      await dai.connect(daiWhaleUser).transfer(alice.address, daiAmtForAlice);

      let aliceDaiBalance = await dai
        .connect(daiWhaleUser)
        .balanceOf(alice.address);
      expect(aliceDaiBalance).to.be.eq(daiAmtForAlice);

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      let response = await school
        .connect(alice)
        .deposit(dai.address, aDai.address, daiAmtForAlice);

      // Check that Alice doesn't have money anymore
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Check that the school has aDai
      let schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(schoolContractADaiBalance).to.be.eq(daiAmtForAlice);

      // Check that the school issued the correct amount of shares
      let shares = await school.totalShares(aDai.address);
      expect(shares).to.be.eq(daiAmtForAlice);
    });

    it("User should be able to deposit multiple times and the school should get aDai", async () => {
      //1. Let's transfer Dai from a whale to Alice
      const addrOfDaiWhale = "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6";
      const daiWhaleUser = await ethers.getSigner(addrOfDaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfDaiWhale],
      });

      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      const deposit1 = BigInt(200 * 10 ** 18);
      const deposit2 = BigInt(300 * 10 ** 18);

      await dai.connect(daiWhaleUser).transfer(alice.address, daiAmtForAlice);

      let aliceDaiBalance = await dai
        .connect(daiWhaleUser)
        .balanceOf(alice.address);
      expect(aliceDaiBalance).to.be.eq(daiAmtForAlice);

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit1);
      await school.connect(alice).deposit(dai.address, aDai.address, deposit2);

      // Check that Alice doesn't have money anymore
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Check that the school has aDai
      let schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(schoolContractADaiBalance.gte(daiAmtForAlice)).to.be.eq(true);

      // Check that the school issued the correct amount of shares
      let shares = await school.totalShares(aDai.address);
      expect(shares.lte(daiAmtForAlice)).to.be.eq(true);
    });

    it("User should be able to withdraw their entire deposit immediately", async () => {
      //1. Let's transfer Dai from a whale to Alice
      const addrOfDaiWhale = "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6";
      const daiWhaleUser = await ethers.getSigner(addrOfDaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfDaiWhale],
      });

      const daiAmtForAlice = BigInt(500 * 10 ** 18);

      await dai.connect(daiWhaleUser).transfer(alice.address, daiAmtForAlice);

      let aliceDaiBalance = await dai
        .connect(daiWhaleUser)
        .balanceOf(alice.address);
      expect(aliceDaiBalance).to.be.eq(daiAmtForAlice);

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school
        .connect(alice)
        .deposit(dai.address, aDai.address, daiAmtForAlice);

      // Check that Alice doesn't have money anymore
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Check that the school thinks Alice has dai deposited
      let userDepositedAssets = await school.getBalance(
        aDai.address,
        alice.address
      );
      expect(userDepositedAssets.gte(aliceDaiBalance));

      // Withdraw Alice's dai
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, userDepositedAssets);

      // Check that Alice has her dai back
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(userDepositedAssets);

      // Burn Alice's DAI to set up for the next
      await dai.connect(alice).transfer(zeroAddress, userDaiBalance);
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);
    });

    it("User should be able to withdraw their entire deposit later", async () => {
      //1. Let's transfer Dai from a whale to Alice
      const addrOfDaiWhale = "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D";
      const daiWhaleUser = await ethers.getSigner(addrOfDaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfDaiWhale],
      });

      const daiAmtForAlice = BigInt(500 * 10 ** 18);

      await dai.connect(daiWhaleUser).transfer(alice.address, daiAmtForAlice);

      let aliceDaiBalance = await dai
        .connect(daiWhaleUser)
        .balanceOf(alice.address);
      expect(aliceDaiBalance).to.be.eq(daiAmtForAlice);

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school
        .connect(alice)
        .deposit(dai.address, aDai.address, daiAmtForAlice);

      // Check that Alice doesn't have money anymore
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Check that the school thinks Alice has dai deposited
      let userDepositedAssets = await school.getBalance(
        aDai.address,
        alice.address
      );
      expect(userDepositedAssets.gte(aliceDaiBalance));

      // Artificially increase the school's ADAI balance
      const addrOfADaiWhale = "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4";
      const aDaiWhaleUser = await ethers.getSigner(addrOfADaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfADaiWhale],
      });

      const interest = BigInt(500 * 10 ** 18);

      await aDai.connect(aDaiWhaleUser).transfer(school.address, interest);

      let schoolADai = await aDai.balanceOf(school.address);

      // Withdraw Alice's dai
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, schoolADai);

      // Check that the user received their principle + 25% of the interest
      userDaiBalance = await dai.balanceOf(alice.address);
      console.log(userDaiBalance.toString());
      expect(userDaiBalance.sub(BigInt(500 * 1.25 * 10 ** 18)).lt(uncertainty))
        .to.be.true;

      // Check that the school received 25% of their interest
      let schoolDaiBalance = await dai.balanceOf(school.address);
      expect(
        schoolDaiBalance.sub(BigInt(500 * 0.75 * 10 ** 18)).lt(uncertainty)
      ).to.be.true;
    });
  });

  describe("Multiple User Tests", () => {
    xit("Two users should be able to deposit and get allocated the correct fraction of the pool", async () => {
      //1. Let's transfer Dai from a whale to Alice
      const addrOfDaiWhale = "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6";
      const daiWhaleUser = await ethers.getSigner(addrOfDaiWhale);

      // Impersonate the account
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addrOfDaiWhale],
      });

      const daiAmtForAlice = BigInt(500 * 10 ** 18);

      await dai.connect(daiWhaleUser).transfer(alice.address, daiAmtForAlice);

      let aliceDaiBalance = await dai
        .connect(daiWhaleUser)
        .balanceOf(alice.address);
      expect(aliceDaiBalance).to.be.eq(daiAmtForAlice);

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school
        .connect(alice)
        .deposit(dai.address, aDai.address, daiAmtForAlice);

      // Check that Alice doesn't have money anymore
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Check that the school has aDai
      let schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(schoolContractADaiBalance.gte(daiAmtForAlice)).to.be.eq(true);

      // Check that the school issued the correct amount of shares
      let shares = await school.totalShares(aDai.address);
      expect(shares.lte(daiAmtForAlice)).to.be.eq(true);
    });
  });
});
