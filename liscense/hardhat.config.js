/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
module.exports = {
  paths: {
    sources: "./contracts",
    artifacts: "./build",
  },
  solidity: "0.7.3",
};

