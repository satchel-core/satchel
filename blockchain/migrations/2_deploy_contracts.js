const Satchel = artifacts.require("./Satchel.sol");

// let schoolContract = "0xEC2DD0d0b15D494a58653427246DC076281C377a";

module.exports = function (deployer) {
  deployer.deploy(Satchel, "Satchel");
};
