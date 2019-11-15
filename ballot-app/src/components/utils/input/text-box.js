import React from "react";
import FormControl from "react-bootstrap/FormControl";

const TextBox = ({ keyName, onChangeHandler, placeholder, textValue }) => (
  <FormControl
    onChange={e => onChangeHandler(keyName, e)}
    placeholder={placeholder}
    value={textValue}
  />
);

export default TextBox;
