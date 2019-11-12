import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";

class InputField2 extends React.Component {
  constructor(props) {
    super(props);
    this.calls = this.props.calls;
    this.units = this.props.units;
    this.units2 = this.props.units2;
  }

  render() {
    const {
      key1,
      key2,
      value1,
      value2,
      onChangeHandler,
      onSubmitHandler
    } = this.props;
    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => {
                onSubmitHandler();
              }}
            >
              {this.calls}
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            placeholder={this.units}
            aria-label={this.units}
            value={value1}
            onChange={e => onChangeHandler(key1, e)}
          />
          <FormControl
            aria-describedby="basic-addon1"
            placeholder={this.units2}
            aria-label={this.units2}
            value={value2}
            onChange={e => onChangeHandler(key2, e)}
          />
        </InputGroup>
      </div>
    );
  }
}

export default InputField2;
