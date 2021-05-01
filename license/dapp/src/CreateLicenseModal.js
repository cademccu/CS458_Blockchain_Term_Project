import React, { Component } from "react";
import { Modal, Button } from 'semantic-ui-react';
import App from "./App";

class CreateLicenseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            name: '',
            dob: '',
            expDate: '',
            address: '',
            cityState: '',
            gender: '',
        };
    }

    setOpen(open){
        this.setState({open: open});
    }

    // submitFunction = async (event) => {
    //     event.preventDefault();
    //     try{
    //         let basicInfo = await this.state.DMVInfo.LF.getBasicInformation(this.state.idSearch);
    //         this.setState({basicInfo:basicInfo, basicInfoOpen:true});
    //     } catch(error) {
    //         this.setState({basicInfo:['',''], basicInfoOpen: false});
    //     }
    // };

    nameChange = (event) => {
        this.setState({name: event.target.value});
    };

    dobChange = (event) => {
        this.setState({dob: event.target.value});
    };

    expDateChange = (event) => {
        this.setState({expDate: event.target.value});
    };

    addressChange = (event) => {
        this.setState({address: event.target.value});
    };

    cityStateChange = (event) => {
        this.setState({cityState: event.target.value});
    };

    genderChange = (event) => {
        this.setState({gender: event.target.value});
    };

    submitFunction = async (event) => {
        event.preventDefault();
        let data = [this.state.name, this.state.dob, this.state.expDate,
            this.state.address, this.state.cityState, this.state.gender];
        // this.props.createLicense(data);
        // App.createLicense(data);
        // How do I pass back the data to the createLicense function in App.js?
        this.props.close();
    }

    render() {
        return (
            <Modal
                onClose={() => this.props.close()}
                open={this.props.open}
            >
                <Modal.Content>
                    <form className="create form" onSubmit={this.submitFunction}>
                        <div><label>Name</label></div>
                        <div>
                            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.nameChange} />
                        </div>
                        <div><label>Date Of Birth</label></div>
                        <div>
                            <input type="text" name="dob" placeholder="Date of birth" value={this.state.dob} onChange={this.dobChange} />
                        </div>
                        <div><lable>Experation Date</lable></div>
                        <div>
                            <input type="text" name="experation date" placeholder="Experation Date" value={this.state.expDate} onChange={this.expDateChange} />
                        </div>
                        <div><lable>Address</lable></div>
                        <div>
                            <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.addressChange} />
                        </div>
                        <div><lable>City and State</lable></div>
                        <div>
                            <input type="text" name="city-state" placeholder="City and State" value={this.state.cityState} onChange={this.cityStateChange} />
                        </div>
                        <div><lable>Gender</lable></div>
                        <div>
                            <input type="text" name="gender" placeholder="Gender" value={this.state.gender} onChange={this.genderChange} />
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.props.close()}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CreateLicenseModal;