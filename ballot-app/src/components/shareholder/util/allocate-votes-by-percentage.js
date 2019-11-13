import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ButtonText, Key, Placeholder } from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";

const AllocateVotesByPercentage = ({
  onChangeHandler,
  onClickAllocateVotesByPercentage
}) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <SubmitButton
                onClickHandler={onClickAllocateVotesByPercentage}
                text={ButtonText.ALLOCATE_VOTES_BY_PERCENTAGE}
              ></SubmitButton>
            </InputGroup.Prepend>
            <TextBox
              keyName={Key.PROPOSAL_BY_PERCENTAGE}
              onChangeHandler={onChangeHandler}
              placeholder={Placeholder.PROPOSAL}
            />
            <TextBox
              keyName={Key.PERCENTAGE}
              onChangeHandler={onChangeHandler}
              placeholder={Placeholder.PERCENTAGE}
            />
            <InputGroup.Append>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default AllocateVotesByPercentage;
