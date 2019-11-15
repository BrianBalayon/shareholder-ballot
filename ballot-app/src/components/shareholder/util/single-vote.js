import React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonText, Key, Placeholder} from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";

const SingleVote = ({onChangeHandler, onClickSingleVote, proposal}) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onClickSingleVote}
                        text={ButtonText.SINGLE_VOTE}
                    />
                </InputGroup.Prepend>
                <TextBox
                    keyName={Key.PROPOSAL_BY_SINGLE_VOTE}
                    onChangeHandler={onChangeHandler}
                    placeholder={Placeholder.PROPOSAL}
                    textValue={proposal}
                />
            </InputGroup>
        </Container>
    );
};

export default SingleVote;
