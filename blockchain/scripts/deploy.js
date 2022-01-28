async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Satchel = await ethers.getContractFactory("Satchel");
  const satchel = await Satchel.deploy(deployer.address);

  console.log("Satchel address:", satchel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
