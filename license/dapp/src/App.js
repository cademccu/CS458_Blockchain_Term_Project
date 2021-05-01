import React, { Component } from "react";
import initBlockchain from "./utils/initBlockchain";
import { assert } from "chai";
import LicenseInfoCard from "./licenseInfoCard";
import LicenseModal from "./LicenseModal";
import CreateLicenseModal from "./CreateLicenseModal";
import BasicInfoCard from "./basicInfoCard";

//  Main application page

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            idSearch: '',
            hasLicense: false,
            fullInfo: [''],
            basicInfo: ['',''],
            basicInfoOpen: false,
            createLicenseOpen: false,
        };
    }
    componentDidMount = async () => {
      try {
          const DMVInfo = await initBlockchain();
          let hasLicense = await DMVInfo.LF.ownerHasLicense(DMVInfo.userAddress);
          this.setState({DMVInfo: DMVInfo, hasLicense: hasLicense});

          if (hasLicense) {
            this.getFullInfo();
          }
      } catch (error) {
          alert(`Failed to load provider, signer, or contract.`);
          console.log(error);
      }
    };

    async getFullInfo() {
        try {
            const id = await this.state.DMVInfo.LF.ownerToLicense(this.state.DMVInfo.userAddress);
            let x = await this.state.DMVInfo.LF.getFullInformation(id);
            let fullInfo = Array.from(x);
            fullInfo.shift();
            fullInfo.unshift(parseInt(id._hex));
            this.setState({fullInfo: fullInfo});
        } catch (err) {
            console.log("Exception: ", err);
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

    displayCreateLicenseModal = () => {
        this.setState({createLicenseOpen: true});
    }

    submitFunction = async (event) => {
        event.preventDefault();
        try{
            let basicInfo = await this.state.DMVInfo.LF.getBasicInformation(this.state.idSearch);
            this.setState({basicInfo:basicInfo, basicInfoOpen:true});
        } catch(error) {
            this.setState({basicInfo:['',''], basicInfoOpen: false});
        }

    };

    idLookupChange = (event) => {
        this.setState({idSearch: event.target.value});
    };

    closeBasicInfoModal = () =>{
        this.setState({basicInfoOpen: false});
    };

    closeCreateLicenseModal = () => {
        this.setState({createLicenseOpen: false});
    };


  render() {

    const createLicenseButton = (
        <div>
            <h4>Click bellow to start a new license.</h4>
            <button onClick={this.displayCreateLicenseModal} disabled={this.state.hasLicense}>
                Create License
            </button>
        </div>
    );

    const welcomeHeader = (
        <div>
            <h1>Welcome to the DMV</h1>
        </div>
    );

    return (
        <div
            style={{
                backgroundColor: 'cadetblue',
            }}
        >
            {welcomeHeader}
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
                    <input  type="text" 
                            name="first-name" 
                            placeholder="ID" 
                            value={this.state.idSearch} 
                            onChange={this.idLookupChange}
                            type="number" />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            
            
            <LicenseModal
                open={this.state.basicInfoOpen}
                close={this.closeBasicInfoModal}
                license={<BasicInfoCard
                    name={this.state.basicInfo[0]}
                    dob={this.state.basicInfo[1]}
                    lId={this.state.idSearch} />}
            />

            <CreateLicenseModal
                open={this.state.createLicenseOpen}
                close={this.closeCreateLicenseModal}
            />

             
        </div>
    );
    }
}

export default App;
