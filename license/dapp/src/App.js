import React, { Component } from "react";
import initBlockchain from "./utils/initBlockchain";
import licensInforCard from "./licenseInfoCard";
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

    state = {
      loading: false,
    };

    componentDidMount = async () => {
      try {
          const DMVInfo = await initBlockchain(); // from utils directory;  connect to provider and to metamask or other signer
          let hasLicence = await DMVInfo.LF.ownerHasLicense(DMVInfo.userAddress);
          this.setState({DMVInfo: DMVInfo, hasLicence: hasLicence});
          //await getZombieCount(DMVInfo.DMV, DMVInfo.userAddress); // get user count and total count of zombies
      } catch (error) {
          // Catch any errors for any of the above operations.
          alert(`Failed to load provider, signer, or contract. Check console for details.`);
          console.log(error);
      }
    };

    displayCreateLicense = async () => {
        try {
            await this.state.DMVInfo.LF.createLicense("test",
                "01/01/01",
                "01/01/31",
                "1234 anywhere st",
                "some city, CO",
                "Attack helicopter");
        } catch (err) {
            console.log("heres the exception: ", err);
        }
    }


  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
    if(this.state.hasLicense) {
        licensInforCard.render();
    }
    else {
        return (
            <div>
                <h1>it worked</h1>
                <button onClick={this.displayCreateLicense}>
                    Create License
                </button>
            </div>
        );
    }

  }
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