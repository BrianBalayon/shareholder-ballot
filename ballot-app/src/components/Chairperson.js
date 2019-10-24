import InputField from "./InputField";
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
                <InputField
                    calls="Yo"
                    units="Yo"
                />
            </div>
        );
    }
}

export default Chairperson;
