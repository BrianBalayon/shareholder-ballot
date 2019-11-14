import React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonText, DropdownItemInfo, Key} from "./constants";
import DropdownMenu from "../../utils/input/dropdown-menu";
import TextBox from "../../utils/input/text-box";
import SubmitButton from "../../utils/input/submit-button";

const getButtonText = idx => {
    return ButtonText.SET_VOTING_TIMELINE_DROPDOWN[Number(idx)];
};

const SetVotingTimeline = ({
                               duration,
                               onChangeHandler,
                               onClickDropdownItem,
                               onSetVotingTimelineButtonClick,
                               timeUnit
                           }) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onSetVotingTimelineButtonClick}
                        text={ButtonText.SET_VOTING_TIMELINE}
                    />
                </InputGroup.Prepend>
                <TextBox
                    keyName={Key.DURATION}
                    onChangeHandler={onChangeHandler}
                    placeholder={Key.DURATION}
                    textValue={duration}
                />
                <DropdownMenu
                    dropdownItemInfo={DropdownItemInfo.VOTING_TIMELINE}
                    keyName={Key.TIME_UNIT}
                    onClickDropdownItem={onClickDropdownItem}
                    title={getButtonText(timeUnit)}
                />
            </InputGroup>
        </Container>
    );
};

export default SetVotingTimeline;
