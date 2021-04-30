import React, { Component } from "react";

class LicenseInfoCard extends Component {


    displayFullInformation = async () => {
        try {
            let x = await this.state.DMVInfo.LF.getFullInformation(0);
            console.log(x);
        } catch (err) {
            console.log("here's the exception: ", err);
        }
    }

    render() {
        return (
            <div>
                <h1>it worked</h1>
                <button onClick={this.displayFullInformation}>
                    Display Full Information
                </button>
            </div>
        );
    }
}

export default LicenseInfoCard;
