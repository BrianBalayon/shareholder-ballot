import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DropdownMenu from "../utils/input/dropdown-menu";
import TextBox from "../utils/input/text-box";
import SubmitButton from "../utils/input/submit-button";

const SetVotingTimeline = ({
  duration,
  onChangeHandler,
  onDropdownItemClick,
  onSetVotingTimelineButtonClick,
  timeUnit
}) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <SubmitButton
                onClickHandler={onSetVotingTimelineButtonClick}
                text={"Set Voting Timeline"}
              />
            </InputGroup.Prepend>
            <TextBox
              keyName={"duration"}
              onChangeHandler={onChangeHandler}
              placeholder={"duration"}
              textValue={duration}
            />
            <DropdownMenu
              dropdownItemInfo={[
                {
                  eventKey: 1,
                  itemText: "Weeks"
                },
                {
                  eventKey: 2,
                  itemText: "Days"
                },
                {
                  eventKey: 3,
                  itemText: "Hours"
                },
                {
                  eventKey: 4,
                  itemText: "Minutes"
                },
                {
                  eventKey: 5,
                  itemText: "Seconds"
                }
              ]}
              keyName={"timeUnit"}
              onDropdownItemClick={onDropdownItemClick}
              title={SET_VOTING_TIMELINE_TITLE_TEXT[Number(timeUnit)]}
            />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

const SET_VOTING_TIMELINE_TITLE_TEXT = [
  "Time Unit",
  "Weeks",
  "Days",
  "Hours",
  "Minutes",
  "Seconds"
];

export default SetVotingTimeline;
