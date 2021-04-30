import React, { Component } from "react";
import { Card } from 'semantic-ui-react'
class LicenseInfoCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>License ID: {this.props.lId}</span>
                    </Card.Meta>
                    <Card.Description>
                        dob: {this.props.dob}<br/>
                        Street: {this.props.street}<br/>
                        City, State: {this.props.cityState}<br/>
                        Gender: {this.props.gender}<br/>
                        Expires: {this.props.expDate}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

}

export default LicenseInfoCard;
