import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
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
                <div className="btn-group justify-content-between">
                    <Button variant="outline-secondary">State</Button>
                    <Button variant="outline-secondary">Number of Choices</Button>
                    <Button variant="outline-secondary">Voting Mode</Button>
                    <Button variant="outline-secondary">Voting Deadline</Button>
                    <Button variant="outline-secondary">Voting Duration</Button>
                    <Button variant="outline-secondary">Winner Selected</Button>
                    <Button variant="outline-secondary">Winner</Button>
                </div>
            </div>
        );
    }
}

export default PublicInfo;
