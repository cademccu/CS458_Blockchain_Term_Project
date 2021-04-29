require("@nomiclabs/hardhat-waffle");

const RINKEBY_PRIVATE_KEY = "<<<<< YOUR PRIVATE KEY HERE >>>>>"

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.6.4",
    networks: {
        rinkeby: {
            url: "<<<<< INFURA ENDPOINT HERE >>>>>",
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
        }
    }
};
