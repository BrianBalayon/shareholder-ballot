import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import {
  ADDRESS,
  NUMBER_OF_SHARES_PLACEHOLDER,
  REGISTER_SHAREHOLDER_BUTTON_TEXT,
  SHARED_OWNED
} from "./chairperson-constants";
import SubmitButton from "../utils/input/submit-button";
import TextBox from "../utils/input/text-box";

const RegisterShareholderInput = ({
  address,
  onChangeHandler,
  onClickHandler,
  sharesOwned
}) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <SubmitButton
                onClickHandler={onClickHandler}
                text={REGISTER_SHAREHOLDER_BUTTON_TEXT}
              />
            </InputGroup.Prepend>
            <TextBox
              keyName={ADDRESS}
              onChangeHandler={onChangeHandler}
              placeholder={ADDRESS}
              textValue={address}
            />
            <TextBox
              keyName={SHARED_OWNED}
              onChangeHandler={onChangeHandler}
              placeholder={NUMBER_OF_SHARES_PLACEHOLDER}
              textValue={sharesOwned}
            />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default RegisterShareholderInput;
