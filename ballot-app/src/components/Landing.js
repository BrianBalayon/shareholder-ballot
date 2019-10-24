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
            <div>
                <Chairperson />
                <Shareholder />
                <PublicInfo />
            </div>
        );
    }
}

export default LandingPage;
