
const { expect } = require('chai');
const { waffle } = require("hardhat");
const { deployContract } = waffle;
const provider = waffle.provider;


// `describe` is a Mocha function that allows you to organize your test. It's
// not actually needed, but having your test organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the test of that section. This callback can't be
// an async function.


describe("DlForDummies", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for test, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.
//4
// the homies
    const userNames = ["Bobby", "Hank"];
    let DL;
    let DLInstance;

    // for testing the dmv contract.
    let DMV;
    let DMVInstance;

    // this took me so long to find smh
    let userLicense_ABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "ID_NUMBER",
            "type": "uint256"
          }
        ],
        "name": "NewLicense",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_ID_NUMBER",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_dob",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_exp_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_address",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city_state",
            "type": "string"
          }
        ],
        "name": "createLicense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getBasicInformation",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getFullInformation",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "get_license",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "ID_NUMBER",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dob",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "exp_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "street_address",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city_state",
            "type": "string"
          },
          {
            "internalType": "enum licenseDetails.Gender",
            "name": "gender",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "licenseToOwner",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "ownerHasLicense",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]





    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        /******************Uncomment line below when running test this wont pass test ran on webstorm but does pass on hard hat*/
        DL = await ethers.getContractFactory("UserLicense");
        DLInstance = await DL.deploy();

        DMV = await ethers.getContractFactory("dmvController");
        DMVInstance = await DMV.deploy();

    });


    // You can nest describe calls to create subsections.
    describe("Deployment and user creation", function () {
        it("Should be able tog create a new User", async () => {
            await expect(DLInstance.createLicense( 1200,userNames[0],"12/01/1946","12/02/2001" ,"1234 Street Dr", "Denver, CO"))
                .to.emit(DLInstance, 'NewLicense')
            const x = await DLInstance.get_license(1200);
            expect(x.name).to.equal(userNames[0]);
            expect(x.dob).to.equal("12/01/1946")
        });

    });


//// PROBLEM SOLVE OR DIE
//// https://docs.ethers.io/v4/api-contract.html
    describe("Deployment of DMV contract and getting a liscense.", function () {
        it("Should be able to create the DMV contract, and in turn get the liscense contract.", async () => {
            // const x = await DLInstance.get_license(1200);
            // expect(x.name).to.equal(userNames[0]);
            // expect(x.dob).to.equal("12/01/1946")
            //let DMV_liscense = await DMVInstance.getUserLicenseContract();
            let DMV_address = await DMVInstance.getUserLicenseAddress();

            let provider = ethers.getDefaultProvider();

            let DMV_liscense_instance = new ethers.Contract(DMV_address, userLicense_ABI, provider);

            await expect(DMV_liscense_instance.createLicense( 6969,userNames[1],"12/01/1969","12/02/2069" ,"1269 Street Dr", "Denver, CO"))
                .to.emit(DMV_liscense_instance, 'NewLicense');
            //
            // const x = await DMV_liscense.get_license(6969);
            // expect(x.name).to.equal(userNames[1]);
            // expect(x.dob).to.equal("12/01/1969")
        });

    });


})
