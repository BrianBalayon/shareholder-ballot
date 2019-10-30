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
                <h2> Chairperson </h2>
                <InputField2
                    calls="Register Shareholder"
                    units="shareholder: address"
                    units2="shares owned: uint"
                    />
                <InputField
                    calls="Set Voting Mode"
                    units="voting mode: uint"
                 />
                <InputField2
                    calls="Set Voting Timeline"
                    units="time unit: uint"
                    units2="duration: uint"
                    />
                <div className="btn-group container-fluid">
                    <Button variant="outline-primary">Begin Voting</Button>
                    <Button variant="outline-primary">End Voting</Button>
                    <Button variant="outline-primary">Count Votes</Button>
                    <Button variant="outline-primary">Release Winner</Button>
                </div>
            </div>
        );
    }
}

export default Chairperson;
