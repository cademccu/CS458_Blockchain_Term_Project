import React, { Component } from "react";
import initBlockchain from "./utils/initBlockchain";
import licensInforCard from "./licenseInfoCard";
import { assert } from "chai";
import LicenseInfoCard from "./licenseInfoCard";
import LicenseModal from "./LicenseModal";
// import getZombieCount from "./utils/getZombieCount";

// import { HashRouter, Route } from "react-router-dom";
// import { Container } from "semantic-ui-react";
// import { Provider } from "react-redux";

// import TopBar from "./components/TopBar";

// import Greeting from "./pages/Greeting";
// import MyZombieInventory from "./pages/MyZombieInventory";
// import ZombieInventory from "./pages/ZombieInventory";
// import AttackZombie from "./pages/AttackZombie";
// import FeedOnKitty from "./pages/FeedOnKitty";
// import ChangeName from "./pages/ChangeName";
// import LevelUp from "./pages/LevelUp";
// import TransferZombie from "./pages/TransferZombie";

// import store from "./redux/store";

//
//  This is the main application page; routing is handled to render other pages in the application

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages

  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

    constructor(props){
        super(props);
        this.state={
            idSearch: '',
            hasLicense: false,
            fullInfo: [''],
            basicInfo: ['',''],
            basicInfoOpen: false,
        };
    }
    componentDidMount = async () => {
      try {
          const DMVInfo = await initBlockchain(); // from utils directory;  connect to provider and to metamask or other signer
          let hasLicense = await DMVInfo.LF.ownerHasLicense(DMVInfo.userAddress);
          //console.log("**Setting hasLicense to ", hasLicense);
          this.setState({DMVInfo: DMVInfo, hasLicense: hasLicense});

          if (hasLicense) {
            this.getFullInfo();
          }
          //await getZombieCount(DMVInfo.DMV, DMVInfo.userAddress); // get user count and total count of zombies
      } catch (error) {
          // Catch any errors for any of the above operations.
          alert(`Failed to load provider, signer, or contract. Check console for details.`);
          console.log(error);
      }
    };

    async getFullInfo() {
        try {
            const id = await this.state.DMVInfo.LF.ownerToLicense(this.state.DMVInfo.userAddress);
            let x = await this.state.DMVInfo.LF.getFullInformation(id);
            //console.log("***********", typeof Array.from(x));
            let fullInfo = Array.from(x);
            fullInfo.shift();
            fullInfo.unshift(parseInt(id._hex));
            console.log(fullInfo);
            this.setState({fullInfo: fullInfo});
        } catch (err) {
            console.log("here's the exception: ", err);
        }
    };

    displayCreateLicense = async () => {
        if (this.state.hasLicense){
            console.log("has license and can't create another");
            return;
        }
        try {
            await this.state.DMVInfo.LF.createLicense("test",
                "01/01/01",
                "01/01/31",
                "1234 anywhere st",
                "some city, CO",
                "Attack helicopter");
                this.setState({hasLicense: true});
                this.getFullInfo();
        } catch (err) {
            console.log("heres the exception: ", err);
        }
    }

    displayFullInformation = async () => {
        try {
            const id = await this.state.DMVInfo.LF.ownerToLicense(this.state.DMVInfo.userAddress);
            let x = await this.state.DMVInfo.LF.getFullInformation(id);
            console.log(x);
        } catch (err) {
            console.log("here's the exception: ", err);
        }
    }

    submitFunction = async (event) => {
        event.preventDefault();
        try{
            let basicInfo = await this.state.DMVInfo.LF.getBasicInformation(this.state.idSearch);
        // alert(basicInfo);
            this.setState({basicInfo:basicInfo, basicInfoOpen:true});
        } catch(error) {
            this.setState({basicInfo:['',''], basicInfoOpen: false});
        }

    };

    idLookupChange = (event) => {
        this.setState({idSearch: event.target.value});
        // console.log("***************** idSearch: ", this.state.idSearch);
    };

    closeBasicInfoModal = () =>{
        this.setState({basicInfoOpen: false});
    };

  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
    const createLicenseButton = (
        <div>
            <h1>create</h1>
            <button onClick={this.displayCreateLicense} disabled={this.state.hasLicense}>
                Create License
            </button>
        </div>
    );
    let basicInfoDisplay;
    console.log("****************** Basic info: ", this.state.basicInfoOpen);
    // if(this.state.basicInfoOpen){
    //     basicInfoDisplay = (
    //         <LicenseModal
    //             open={this.state.basicInfoOpen}
    //             license={<LicenseInfoCard
    //                 name={this.state.basicInfo[0]}
    //                 dob={this.state.basicInfo[1]}
    //                 lId={this.state.idSearch} />}
    //         />
            
    //     );
    // }
    // else {
    //     console.log('false');
    //     basicInfoDisplay = ('');
    // }

    return (
        <div>
            {createLicenseButton}
            <LicenseInfoCard 
                lId={this.state.fullInfo[0]}
                name={this.state.fullInfo[1]}
                dob={this.state.fullInfo[2]}
                expDate={this.state.fullInfo[3]}
                street={this.state.fullInfo[4]}
                cityState={this.state.fullInfo[5]}
                gender={this.state.fullInfo[6]}
             />


            <form className="ui form" onSubmit={this.submitFunction}>
                <div className="field">
                    <label>Search basic license info by ID</label>
                    <input type="text" name="first-name" placeholder="ID" value={this.state.idSearch} onChange={this.idLookupChange} />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            
            
            <LicenseModal
                open={this.state.basicInfoOpen}
                close={this.closeBasicInfoModal}
                license={<LicenseInfoCard
                    name={this.state.basicInfo[0]}
                    dob={this.state.basicInfo[1]}
                    lId={this.state.idSearch} />}
            />

             
        </div>
    );
    }

//     <div>
//     <form id="ui form" onSubmit={this.submitFunction}>
//         <label>License lookup
//             <input type="number" value={this.state.idSearch} onChange={this.idLookupChange} />
//         </label>
//         {basicInfoDisplay}
//         <input type="submit" value="Submit" />
//     </form>
// </div>



  //   return (
  //     <Provider store={store}>
  //       <HashRouter>
  //         <Container>
  //           <TopBar state={this.state} />
  //           <div>
  //             <Route exact path="/" component={Greeting} />
  //             <Route
  //               exact
  //               path="/myZombieInventory"
  //               component={MyZombieInventory}
  //             />
  //             <Route
  //               exact
  //               path="/ZombieInventory"
  //               component={ZombieInventory}
  //             />
  //             {/* routes used in zombie action modal */}
  //             <Route exact path="/AttackZombie" component={AttackZombie} />
  //             <Route exact path="/FeedOnKitty" component={FeedOnKitty} />
  //             <Route exact path="/ChangeName" component={ChangeName} />
  //             <Route exact path="/LevelUp" component={LevelUp} />
  //             <Route exact path="/TransferZombie" component={TransferZombie} />
  //           </div>
  //         </Container>
  //       </HashRouter>
  //     </Provider>
  //   );
  // }
}

export default App;
