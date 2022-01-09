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
  const orgAddress = "0x0000000000000000000000000000000000000000";

  const userName = "User Name";
  const daiDecimals = 18;
  const usdcDecimals = 6;
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

  describe("Basic Tests", () => {
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
  });
});
