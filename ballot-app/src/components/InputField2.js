import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import React from 'react';

class InputField2 extends React.Component {
    constructor(props) {
        super(props);
        this.calls = this.props.calls;
        this.units = this.props.units;
        this.units2 = this.props.units2;
    }

    render() {
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary">{this.calls}</Button>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-describedby="basic-addon1"
                        placeholder={this.units}
                        aria-label={this.units}
                    />
                    <FormControl
                        aria-describedby="basic-addon1"
                        placeholder={this.units2}
                        aria-label={this.units2}
                    />
                </InputGroup>
            </div>
        );
    }
}

export default InputField2;
