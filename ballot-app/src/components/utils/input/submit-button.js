import React from "react";
import Button from "react-bootstrap/Button";

const SubmitButton = ({ onClickHandler, text }) => (
  <Button onClick={onClickHandler}>{text}</Button>
);
SubmitButton.defaultProps = {
  text: "Button"
};
export default SubmitButton;
