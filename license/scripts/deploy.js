/* 
 * The fact that you can script in javascript
 * actually makes me need therapy.
 *
 * shamelessly stolen from another project.
 */

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const AppContractFactory = await ethers.getContractFactory("dmvController");
    const AppInstance = await AppContractFactory.deploy();
    console.log("Application contract address:", AppInstance.address);

//    const OracleContractFactory = await ethers.getContractFactory("Oracle");
//    const OracleInstance = await OracleContractFactory.deploy();
//    console.log("Oracle contract address:", OracleInstance.address);

    // set the oracle contract address inside the caller contract
  //  await AppInstance.setOracleInstanceAddress(OracleInstance.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
