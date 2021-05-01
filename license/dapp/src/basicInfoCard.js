import React, { Component } from "react";
import { Card } from 'semantic-ui-react'

class BasicInfoCard extends Component {
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
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

}

export default BasicInfoCard;