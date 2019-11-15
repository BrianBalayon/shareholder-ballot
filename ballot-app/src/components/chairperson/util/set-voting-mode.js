import React from "react";
import Container from "react-bootstrap/Container";
import {ButtonText, DropdownItemInfo, Key} from "./constants";
import DropdownMenu from "../../utils/input/dropdown-menu";
import SubmitButton from "../../utils/input/submit-button";
import InputGroup from "react-bootstrap/InputGroup";

const SetVotingMode = ({onClickDropdownItem, onSetVotingModeButtonClick}) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onSetVotingModeButtonClick}
                        text={ButtonText.SET_VOTING_MODE}
                    />
                </InputGroup.Prepend>
                <DropdownMenu
                    dropdownItemInfo={DropdownItemInfo.VOTING_MODE}
                    keyName={Key.VOTING_MODE}
                    onClickDropdownItem={onClickDropdownItem}
                    title={ButtonText.VOTING_MODE}
                />
            </InputGroup>
        </Container>
    );
};

export default SetVotingMode;
