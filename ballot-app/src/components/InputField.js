import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.calls = this.props.calls;
    this.units = this.props.units;
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-secondary">{this.calls}</Button>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            placeholder={this.units}
            aria-label={this.units}
            onChange={() => console.log("test")}
          />
        </InputGroup>
      </div>
    );
  }
}

export default InputField;
