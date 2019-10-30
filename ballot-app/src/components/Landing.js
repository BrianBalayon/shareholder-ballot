import React from 'react';
import Chairperson from "./Chairperson";
import Shareholder from "./Shareholder";
import PublicInfo from "./PublicInfo";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <h1> SH-BALLOT </h1>
                <div className="row">
                    <div className="col">
                        <Chairperson />
                    </div>
                    <div className="col">
                        <Shareholder />
                    </div>
                    <div className="col">
                        <PublicInfo />
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
