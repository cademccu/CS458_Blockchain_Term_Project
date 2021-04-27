
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
4
    const userNames = ["Bobby", "Hank"];
    let DL;
    let DLInstance;





    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        /******************Uncomment line below when running test this wont pass test ran on webstorm but does pass on hard hat*/
        DL = await ethers.getContractFactory("UserLicense");
        DLInstance = await DL.deploy();
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


})
