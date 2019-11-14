import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ButtonText, DropdownItemInfo, Key } from "./constants";
import DropdownMenu from "../../utils/input/dropdown-menu";
import SubmitButton from "../../utils/input/submit-button";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const SetVotingMode = ({ onClickDropdownItem, onSetVotingModeButtonClick }) => {
  return (
    <Container>
          <InputGroup>
            <ButtonGroup>
              <SubmitButton
                onClickHandler={onSetVotingModeButtonClick}
                text={ButtonText.SET_VOTING_MODE}
              />
              <DropdownMenu
                className="btn-group"
                dropdownItemInfo={DropdownItemInfo.VOTING_MODE}
                keyName={Key.VOTING_MODE}
                onClickDropdownItem={onClickDropdownItem}
                title={ButtonText.VOTING_MODE}
              />
            </ButtonGroup>
          </InputGroup>
    </Container>
  );
};

export default SetVotingMode;
