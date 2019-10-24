import React from 'react';
import Chairperson from "./Chairperson";

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
            </div>
        );
    }
}

export default LandingPage;
