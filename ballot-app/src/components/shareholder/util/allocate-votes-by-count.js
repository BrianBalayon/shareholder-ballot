import React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonText, Key, Placeholder} from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";

const AllocateVotesByNumber = ({
                                   count,
                                   onChangeHandler,
                                   onClickAllocateVotesByNumber,
                                   proposal
                               }) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onClickAllocateVotesByNumber}
                        text={ButtonText.ALLOCATE_VOTES_BY_COUNT}
                    />
                </InputGroup.Prepend>
                <TextBox
                    keyName={Key.PROPOSAL_BY_COUNT}
                    onChangeHandler={onChangeHandler}
                    placeholder={Placeholder.PROPOSAL}
                    textValue={proposal}
                />
                <TextBox
                    keyName={Key.COUNT}
                    onChangeHandler={onChangeHandler}
                    placeholder={Placeholder.COUNT}
                    textValue={count}
                />
            </InputGroup>
        </Container>
    );
};

export default AllocateVotesByNumber;
