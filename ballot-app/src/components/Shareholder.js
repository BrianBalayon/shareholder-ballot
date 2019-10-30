import InputField from "./InputField";
import InputField2 from "./InputField2";
import Button from 'react-bootstrap/Button'
import React from 'react';

class Shareholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        }
    }

    render() {
        return(
            <div>
                <h2> Shareholder </h2>
                <InputField2
                    calls="Allocate Votes by Count"
                    units="proposal: uint"
                    units2="count: uint"
                    />
                <InputField2
                    calls="Allocate Votes by Percentage"
                    units="proposal: uint"
                    units2="percentage: uint"
                />
                <InputField
                    calls="Single Vote"
                    units="proposal: uint"
                    />
                <div className="btn-group container-fluid">
                    <Button variant="outline-primary">Get Remaining Votes</Button>
                </div>
            </div>
        );
    }
}

export default Shareholder;
