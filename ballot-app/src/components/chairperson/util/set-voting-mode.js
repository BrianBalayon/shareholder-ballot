import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ButtonText, DropdownItemInfo, Key } from "./constants";
import DropdownMenu from "../../utils/input/dropdown-menu";
import SubmitButton from "../../utils/input/submit-button";
import InputGroup from "react-bootstrap/InputGroup";

const SetVotingMode = ({ onClickDropdownItem, onSetVotingModeButtonClick }) => {
  return (
    <Container className="mb-3">
      <Row>
        <Col></Col>
        <Col xs={12}>
          <InputGroup>
            <ButtonToolbar>
              <SubmitButton
                onClickHandler={onSetVotingModeButtonClick}
                text={ButtonText.SET_VOTING_MODE}
              />
              <DropdownMenu
                dropdownItemInfo={DropdownItemInfo.VOTING_MODE}
                keyName={Key.VOTING_MODE}
                onClickDropdownItem={onClickDropdownItem}
                title={ButtonText.VOTING_MODE}
              />
            </ButtonToolbar>
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SetVotingMode;
