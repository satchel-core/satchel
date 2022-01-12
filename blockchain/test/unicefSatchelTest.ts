import hre, { ethers } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { Artifact } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Signers } from "./types";
import { School } from "../contract_types/School";
import { Organization } from "../contract_types/Organization";
import { OrganizationFactory } from "../contract_types/OrganizationFactory";
import { IERC20 } from "../contract_types/IERC20";
import { ILendingPool } from "../contract_types/ILendingPool";
import chai, { assert, expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
chai.use(solidity);
const { deployContract } = hre.waffle;

describe("Organization Functionality", function () {
  let org: Organization;
  let satchel: OrganizationFactory;
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

    const OrganizationFactoryArtifact: Artifact =
      await hre.artifacts.readArtifact("OrganizationFactory");
    satchel = <OrganizationFactory>(
      (<any>(
        await deployContract(
          owner,
          OrganizationFactoryArtifact,
          [owner.address],
          {
            gasPrice: 1_000_000_00,
          }
        )
      ))
    );

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

  describe("Organization Factory", function () {
    it("Organization Factory should create organizations", async () => {
      await satchel.connect(owner).createOrg(1);
      let address = await satchel.orgs(0);
      expect(address).to.be.not.null;
    });

    it("Non authorized users should not create organizations", async () => {
      let fail = true;
      try {
        await satchel.connect(alice).createOrg(1);
        fail = false;
      } catch (e) {
        expect(true).to.be.true;
      }
      expect(fail).to.be.true;
    });

    it("Users should not create duplicate organizations", async () => {
      let fail = true;
      try {
        await satchel.connect(owner).createOrg(1);
        await satchel.connect(owner).createOrg(1);
        fail = false;
      } catch (e) {
        expect(true).to.be.true;
      }
      expect(fail).to.be.true;
    });

    it("Users should not create the zero org", async () => {
      let fail = true;
      try {
        await satchel.connect(owner).createOrg(0);
        fail = false;
      } catch (e) {
        expect(true).to.be.true;
      }
      expect(fail).to.be.true;
    });
  });

  describe("Organizations", function () {
    it("Organizations should create schools", async () => {});

    it("Non authorized users should not create schools", async () => {});

    it("Organizations should be able to withdraw from school", async () => {});

    it("Organizations should not be able to withdraw more than the school has", async () => {});
  });
});

describe("School Specific Functionality", function () {
  let school: School;
  let dai: IERC20;
  let aDai: IERC20;
  let lendingPool: ILendingPool;

  let admin: SignerWithAddress;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
  const daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const aDaiAddress = "0x028171bCA77440897B824Ca71D1c56caC55b68A3";
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const uncertainty = 10 ** 13;
  beforeEach(async function () {
    this.signers = {} as Signers;
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    admin = signers[0];
    owner = signers[1];
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

    const IERC20Artifact: Artifact = await hre.artifacts.readArtifact("IERC20");

    dai = <IERC20>await ethers.getContractAt(IERC20Artifact.abi, daiAddress);
    aDai = <IERC20>await ethers.getContractAt(IERC20Artifact.abi, aDaiAddress);

    const LendingPoolArtifact: Artifact = await hre.artifacts.readArtifact(
      "ILendingPool"
    );

    lendingPool = <ILendingPool>(
      await ethers.getContractAt(LendingPoolArtifact.abi, lendingPoolAddress)
    );
  });

  describe("Single User Deposit and Withdraw", () => {
    it("User should be able to deposit once and the school should get aDai", async () => {
      // Let's Transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6",
        alice,
        dai,
        daiAmtForAlice
      );
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
      expect(
        schoolContractADaiBalance.sub(daiAmtForAlice).abs().lte(uncertainty)
      ).to.be.true;

      // Check that the school issued the correct amount of shares
      let shares = await school.totalShares(aDai.address);
      expect(shares.sub(daiAmtForAlice).abs().lte(uncertainty)).to.be.true;
    });

    it("User should be able to deposit multiple times and the school should get aDai", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6",
        alice,
        dai,
        daiAmtForAlice
      );

      const deposit1 = BigInt(200 * 10 ** 18);
      const deposit2 = BigInt(300 * 10 ** 18);

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
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6",
        alice,
        dai,
        daiAmtForAlice
      );

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
      expect(userDepositedAssets.gte(daiAmtForAlice));

      // Withdraw Alice's dai
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, userDepositedAssets);

      // Check that Alice has her dai back
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDepositedAssets.sub(userDaiBalance).abs().lte(uncertainty)).to
        .be.true;
    });

    it("User should be able to withdraw their entire deposit later", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

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
      expect(userDepositedAssets.gte(daiAmtForAlice));

      // Artificially increase the school's ADAI balance
      const interest = BigInt(500 * 10 ** 18);
      const schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest
      );

      // Withdraw Alice's dai
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, schoolADai);

      // Check that the user received their principle + 25% of the interest
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance.sub(BigInt(500 * 1.25 * 10 ** 18)).lt(uncertainty))
        .to.be.true;

      // Check that the school received 25% of their interest
      let schoolDaiBalance = await dai.balanceOf(school.address);
      expect(
        schoolDaiBalance.sub(BigInt(500 * 0.75 * 10 ** 18)).lt(uncertainty)
      ).to.be.true;
    });

    it("User should not be able to withdraw more than their principle", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

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
      expect(userDepositedAssets.gte(daiAmtForAlice));

      // Artificially increase the school's ADAI balance
      const interest = BigInt(500 * 10 ** 18);
      const schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest
      );

      // Withdraw Alice's dai
      try {
        await school
          .connect(alice)
          .withdraw(dai.address, aDai.address, schoolADai.mul(1.001));
        expect(true).to.be.false;
      } catch (e) {}
    });

    it("User should be able to withdraw part of their deposit", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

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
      expect(userDepositedAssets.gte(daiAmtForAlice));

      // Artificially increase the school's ADAI balance
      let interest = BigInt(500 * 10 ** 18);
      let schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest
      );

      // Withdraw 250 of Alice's dai
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, daiAmtForAlice / BigInt(2));

      // Check that the user received their principle + 25% of the interest
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance.sub(BigInt(125 * 1.25 * 10 ** 18)).lt(uncertainty))
        .to.be.true;

      // Check that the school received 25% of their interest
      let schoolDaiBalance = await dai.balanceOf(school.address);
      expect(
        schoolDaiBalance.sub(BigInt(125 * 0.75 * 10 ** 18)).lt(uncertainty)
      ).to.be.true;

      // Artificially increase the school's ADAI balance for a 400% return on investment
      interest = BigInt(750 * 10 ** 18);
      schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest
      );

      // Burn Alice's DAI
      await dai.connect(alice).transfer(zeroAddress, userDaiBalance);
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Burn the school's DAI
      await school.connect(owner).transfer(dai.address, schoolDaiBalance);
      schoolDaiBalance = await dai.balanceOf(school.address);
      expect(schoolDaiBalance).to.be.eq(0);

      // Withdraw 500 of Alice's dai (1/3 of remaining)
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, daiAmtForAlice);

      userDaiBalance = await dai.balanceOf(alice.address);
      schoolDaiBalance = await dai.balanceOf(school.address);

      // Check that the interest was split correctly
      expect(
        userDaiBalance
          .sub(BigInt(125 * 10 ** 18))
          .mul(3)
          .sub(schoolDaiBalance)
          .abs()
          .lt(uncertainty)
      ).to.be.true;

      // Check that the two balances sum to the withdraw amount
      expect(
        userDaiBalance
          .add(schoolDaiBalance)
          .sub(daiAmtForAlice)
          .abs()
          .lt(uncertainty)
      ).to.be.true;
    });

    it("User should be able to deposit later and withdraw immediately with the correct interest split", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(750 * 10 ** 18);
      const deposit1 = BigInt(500 * 10 ** 18);
      const deposit2 = daiAmtForAlice - deposit1;
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit1);

      // Check that the money was deposited
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(deposit2);

      // Check that the school thinks Alice has dai deposited
      let userDepositedAssets = await school.getBalance(
        aDai.address,
        alice.address
      );
      expect(userDepositedAssets.gte(deposit1));

      // Artificially increase the school's ADAI balance
      let interest = BigInt(250 * 10 ** 18);
      let schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest
      );

      // Deposit more funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit2);

      // Check that the money was deposited
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      //Withdraw all of the money
      schoolADai = await aDai.balanceOf(school.address);
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, schoolADai);

      userDaiBalance = await dai.balanceOf(alice.address);
      let schoolDaiBalance = await dai.balanceOf(school.address);

      // Check that the second deposit generated no interest
      expect(
        userDaiBalance
          .sub(daiAmtForAlice)
          .mul(3)
          .sub(schoolDaiBalance)
          .abs()
          .lt(uncertainty)
      ).to.be.true;

      // Check that the two balances sum to the withdraw amount
      expect(
        userDaiBalance
          .add(schoolDaiBalance)
          .sub(schoolADai)
          .abs()
          .lt(uncertainty)
      ).to.be.true;
    });

    it("User should be able to deposit later and withdraw later with the correct interest split", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(750 * 10 ** 18);
      const deposit1 = BigInt(500 * 10 ** 18);
      const deposit2 = daiAmtForAlice - deposit1;
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit1);

      // Check that the money was deposited
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(deposit2);

      // Check that the school thinks Alice has dai deposited
      let userDepositedAssets = await school.getBalance(
        aDai.address,
        alice.address
      );
      expect(userDepositedAssets.gte(deposit1));

      // Artificially increase the school's ADAI balance
      let interest1 = BigInt(500 * 10 ** 18);
      await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest1
      );

      // Deposit more funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit2);

      // Check that the money was deposited
      userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Artificially increase the school's ADAI balance
      let interest2 = BigInt(500 * 10 ** 18);
      let schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest2
      );

      // Withdraw all of the money
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, schoolADai);

      userDaiBalance = await dai.balanceOf(alice.address);
      let schoolDaiBalance = await dai.balanceOf(school.address);

      // Check that the second deposit the appropriate amount of interest
      expect(
        userDaiBalance
          .sub(daiAmtForAlice)
          .mul(3)
          .sub(schoolDaiBalance)
          .abs()
          .lt(uncertainty)
      ).to.be.true;

      // Check that the two balances sum to the withdraw amount
      expect(
        userDaiBalance
          .add(schoolDaiBalance)
          .sub(schoolADai)
          .abs()
          .lt(uncertainty)
      ).to.be.true;
    });
  });

  describe("Multiple User Tests", () => {
    it("Multiple users should be able to deposit and get allocated the correct fraction of the pool", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(600 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school
        .connect(alice)
        .deposit(dai.address, aDai.address, daiAmtForAlice);

      // Check that the school has aDai
      let schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(
        schoolContractADaiBalance.sub(daiAmtForAlice).abs().lte(uncertainty)
      ).to.be.eq(true);

      // Check that the school issued the correct amount of shares
      let shares = await school.totalShares(aDai.address);
      expect(shares.lte(daiAmtForAlice)).to.be.eq(true);

      // Transfer dai to Bob
      const daiAmtForBob = BigInt(400 * 10 ** 18);
      await seedAccount(
        "0x64f65e10f1c3cd7e920a6b34b83daf2f100f15e6",
        bob,
        dai,
        daiAmtForBob
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(bob).approve(school.address, daiAmtForBob);

      // Deposit funds into school
      await school
        .connect(bob)
        .deposit(dai.address, aDai.address, daiAmtForBob);

      // Check that the school has aDai
      schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(
        schoolContractADaiBalance
          .sub(daiAmtForAlice + daiAmtForBob)
          .abs()
          .lte(uncertainty)
      ).to.be.eq(true);

      // Check that the school issued the correct amount of shares
      shares = await school.totalShares(aDai.address);
      expect(
        shares
          .sub(daiAmtForAlice + daiAmtForBob)
          .abs()
          .lte(uncertainty)
      ).to.be.eq(true);

      // Transfer dai to admin
      const daiAmtForAdmin = BigInt(300 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        admin,
        dai,
        daiAmtForAdmin
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(admin).approve(school.address, daiAmtForBob);

      // Deposit funds into school
      await school
        .connect(admin)
        .deposit(dai.address, aDai.address, daiAmtForAdmin);

      // Check that the school has aDai
      schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(
        schoolContractADaiBalance
          .sub(daiAmtForAlice + daiAmtForBob + daiAmtForAdmin)
          .abs()
          .lte(uncertainty)
      ).to.be.eq(true);

      // Check that the school issued the correct amount of shares
      shares = await school.totalShares(aDai.address);
      expect(
        shares
          .sub(daiAmtForAlice + daiAmtForBob + daiAmtForAdmin)
          .abs()
          .lte(uncertainty)
      ).to.be.eq(true);
    });

    it("Deposits and Withdraws should not be affected by other users", async () => {
      // Let's transfer Dai from a whale to Alice
      const daiAmtForAlice = BigInt(750 * 10 ** 18);
      const deposit1 = BigInt(500 * 10 ** 18);
      const deposit2 = daiAmtForAlice - deposit1;
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        alice,
        dai,
        daiAmtForAlice
      );

      // Approve the school contract to use Alice's balance
      await dai.connect(alice).approve(school.address, daiAmtForAlice);

      // Deposit funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit1);

      // Check that the school has aDai
      let schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(schoolContractADaiBalance.gte(deposit1)).to.be.eq(true);

      // Transfer Dai from a whale to Bob
      const daiAmtForBob = BigInt(500 * 10 ** 18);
      await seedAccount(
        "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D",
        bob,
        dai,
        daiAmtForBob
      );

      // Approve the school contract to use Bob's balance
      await dai.connect(bob).approve(school.address, daiAmtForBob);

      // Deposit funds into school
      await school
        .connect(bob)
        .deposit(dai.address, aDai.address, daiAmtForBob);

      // Check that the school has aDai
      schoolContractADaiBalance = await aDai.balanceOf(school.address);
      expect(schoolContractADaiBalance.gte(deposit1 + daiAmtForBob)).to.be.eq(
        true
      );

      // Artificially increase the school's ADAI balance
      let interest1 = BigInt(500 * 10 ** 18);
      await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest1
      );

      // Deposit more funds into school
      await school.connect(alice).deposit(dai.address, aDai.address, deposit2);

      // Check that the money was deposited
      let userDaiBalance = await dai.balanceOf(alice.address);
      expect(userDaiBalance).to.be.eq(0);

      // Artificially increase the school's ADAI balance
      let interest2 = BigInt(500 * 10 ** 18);
      let schoolADai = await seedAccountNoChecks(
        "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
        school,
        aDai,
        interest2
      );

      // Find Alice's total balance
      let aliceBalance = await school.getBalance(aDai.address, alice.address);
      expect(
        aliceBalance
          .sub(daiAmtForAlice)
          .sub(interest1 / BigInt(2))
          .sub((interest2 * BigInt(1000)) / BigInt(1750))
          .abs()
          .lte(uncertainty)
      ).to.be.true;

      // Withdraw all of the money
      await school
        .connect(alice)
        .withdraw(dai.address, aDai.address, aliceBalance);

      userDaiBalance = await dai.balanceOf(alice.address);
      let schoolDaiBalance = await dai.balanceOf(school.address);

      // Check that the second deposit the appropriate amount of interest
      expect(
        userDaiBalance
          .sub(daiAmtForAlice)
          .mul(3)
          .sub(schoolDaiBalance)
          .abs()
          .lt(uncertainty)
      ).to.be.true;

      // Check that the two balances sum to the withdraw amount
      expect(
        userDaiBalance
          .add(schoolDaiBalance)
          .sub(aliceBalance)
          .abs()
          .lt(uncertainty)
      ).to.be.true;
    });
  });
});

const seedAccount = async (
  whaleAddress: string,
  user: SignerWithAddress,
  assetContract: IERC20,
  amount: bigint
) => {
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const whaleUser = await ethers.getSigner(whaleAddress);

  let userBalance = await assetContract.balanceOf(user.address);
  await assetContract.connect(user).transfer(zeroAddress, userBalance);
  userBalance = await assetContract.balanceOf(user.address);
  expect(userBalance).to.be.eq(0);

  // Impersonate the account
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress],
  });

  await assetContract.connect(whaleUser).transfer(user.address, amount);

  userBalance = await assetContract.balanceOf(user.address);
  expect(userBalance).to.be.eq(amount);
};

const seedAccountNoChecks = async (
  whaleAddress: string,
  user: School,
  assetContract: IERC20,
  amount: bigint
) => {
  const whaleUser = await ethers.getSigner(whaleAddress);

  // Impersonate the account
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress],
  });

  await assetContract.connect(whaleUser).transfer(user.address, amount);

  let userBalance = await assetContract.balanceOf(user.address);
  return userBalance;
};
