var DappToken = artifacts.require("./dappToken.sol");

module.exports = function (deployer) {
    deployer.deploy(DappToken, 1000000);
};