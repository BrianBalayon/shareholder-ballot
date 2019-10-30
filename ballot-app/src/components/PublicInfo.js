import Button from 'react-bootstrap/Button'
import React from 'react';

class PublicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        }
    }

    render() {
        return(
            <div>
                <h2> Public Information </h2>
                <div className="btn-toolbar">
                    <div className="btn-group container-fluid">
                        <Button variant="outline-primary">State</Button>
                        <Button variant="outline-primary">Number of Choices</Button>
                        <Button variant="outline-primary">Voting Mode</Button>
                    </div>
                    <div className="btn-group container-fluid">
                        <Button variant="outline-primary">Voting Deadline</Button>
                        <Button variant="outline-primary">Voting Duration</Button>
                        <Button variant="outline-primary">Winner Selected</Button>
                        <Button variant="outline-primary">Winner</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicInfo;
