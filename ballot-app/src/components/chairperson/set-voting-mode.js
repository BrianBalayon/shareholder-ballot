import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  TIME_UNIT_DROPDOWN_MENU_ITEMS,
  TIME_UNIT_KEY
} from "./chairperson-constants";
import DropdownMenu from "../utils/input/dropdown-menu";
import SubmitButton from "../utils/input/submit-button";

const SetVotingMode = ({ onDropdownItemClick, onSetVotingModeButtonClick }) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <ButtonToolbar>
            <SubmitButton
              onClickHandler={onSetVotingModeButtonClick}
              text={"Set Voting Mode"}
            />
            <DropdownMenu
              dropdownItemInfo={TIME_UNIT_DROPDOWN_MENU_ITEMS}
              keyName={TIME_UNIT_KEY}
              onDropdownItemClick={onDropdownItemClick}
              title={"Voting Mode"}
            />
          </ButtonToolbar>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SetVotingMode;
