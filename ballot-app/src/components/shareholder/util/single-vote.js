import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ButtonText, Key, Placeholder } from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";

const SingleVote = ({ onChangeHandler, onClickSingleVote, proposal }) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <SubmitButton
                onClickHandler={onClickSingleVote}
                text={ButtonText.SINGLE_VOTE}
              ></SubmitButton>
            </InputGroup.Prepend>
            <TextBox
              keyName={Key.PROPOSAL_BY_SINGLE_VOTE}
              onChangeHandler={onChangeHandler}
              placeholder={Placeholder.PROPOSAL}
              textValue={proposal}
            />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SingleVote;
