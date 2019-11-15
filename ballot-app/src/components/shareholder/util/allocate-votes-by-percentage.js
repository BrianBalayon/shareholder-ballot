import React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonText, Key, Placeholder} from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";

const AllocateVotesByPercentage = ({
                                       onChangeHandler,
                                       onClickAllocateVotesByPercentage
                                   }) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onClickAllocateVotesByPercentage}
                        text={ButtonText.ALLOCATE_VOTES_BY_PERCENTAGE}
                    />
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
        </Container>
    );
};

export default AllocateVotesByPercentage;
