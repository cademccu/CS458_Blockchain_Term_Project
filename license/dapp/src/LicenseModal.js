import React, { Component } from "react";
import { Modal } from 'semantic-ui-react'
import LicenseInfoCard from './licenseInfoCard';

class LicenseModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: props.open
        };
    }

    setOpen(open){
        this.setState({open: open});
    }

    render() {
        return(
            <Modal
                onClose={() => this.setOpen(false)}
                open={this.state.open}
                trigger={<Button>Show Modal</Button>}
            >
                <Modal.Content>
                    {this.props.license}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setOpen(false)}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

}

export default LicenseModal;
