import React, { Component } from "react";
import { Modal, Button} from 'semantic-ui-react';
import App from "./App";
import initBlockchain from "./utils/initBlockchain";

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
        try {
            const DMVInfo = await initBlockchain();
            await DMVInfo.LF.createLicense(
                this.state.name,
                this.state.dob,
                this.state.expDate,
                this.state.address,
                this.state.cityState,
                this.state.gender);
                this.setState({hasLicense: true});
        } catch (err) {
            console.log("Exception: ", err);
        }
        this.props.close();
    }

    render() {
        return (
            <Modal
                onClose={() => this.props.close()}
                open={this.props.open}
            >
                <Modal.Content
                    style={{
                        backgroundColor: 'cadetblue'
                    }}
                >
                    <form className="ui form" onSubmit={this.submitFunction}>
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.nameChange} />
                        </div>
                        <div className="field">
                            <label>Date Of Birth</label>
                            <input type="text" name="dob" placeholder="Date of birth" value={this.state.dob} onChange={this.dobChange} />
                        </div>
                        <div className="field">
                            <label>Experation Date</label>
                            <input type="text" name="experation date" placeholder="Experation Date" value={this.state.expDate} onChange={this.expDateChange} />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.addressChange} />
                        </div>
                        <div className="field">
                            <label>City and State</label>
                            <input type="text" name="city-state" placeholder="City and State" value={this.state.cityState} onChange={this.cityStateChange} />
                        </div>
                        <div className="field">
                            <label>Gender</label>
                            <input type="text" name="gender" placeholder="Gender" value={this.state.gender} onChange={this.genderChange} />
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </Modal.Content>
                <Modal.Actions
                    style={{
                        backgroundColor: 'cadetblue'
                    }}
                >
                    <Button color='black' onClick={() => this.props.close()}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CreateLicenseModal;