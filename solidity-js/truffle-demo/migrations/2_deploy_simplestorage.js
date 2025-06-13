const SimpleStorage = artifacts.requires("SimpleStorage");

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
};