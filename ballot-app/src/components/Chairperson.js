import InputField from "./InputField";
import InputField2 from "./InputField2";
import Button from 'react-bootstrap/Button'
import React from 'react';

class Chairperson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        }
    }

    render() {
        return(
            <div>
                <InputField2
                    calls="Register Shareholder"
                    units="shareholder: address"
                    units2="shares owned: uint"
                />
                <InputField
                    calls="Set Voting Mode"
                    units="voting mode: uint"
                />
            </div>
        );
    }
}

export default Chairperson;
