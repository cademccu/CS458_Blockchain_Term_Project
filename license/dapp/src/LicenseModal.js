import React, { Component } from "react";
import { Modal, Button } from 'semantic-ui-react'

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
                onClose={() => this.props.close()}
                open={this.props.open}
            >
                <Modal.Content>
                    {this.props.license}
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

export default LicenseModal;
