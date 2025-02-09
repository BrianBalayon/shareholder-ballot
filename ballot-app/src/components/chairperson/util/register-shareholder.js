import React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonText, Key} from "./constants";
import SubmitButton from "../../utils/input/submit-button";
import TextBox from "../../utils/input/text-box";
import {Placeholder} from "./constants";

const RegisterShareholderInput = ({
                                      address,
                                      onChangeHandler,
                                      onClickHandler,
                                      sharesOwned
                                  }) => {
    return (
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <SubmitButton
                        onClickHandler={onClickHandler}
                        text={ButtonText.REGISTER_SHAREHOLDER}
                    />
                </InputGroup.Prepend>
                <TextBox
                    keyName={Key.ADDRESS}
                    onChangeHandler={onChangeHandler}
                    placeholder={Key.ADDRESS}
                    textValue={address}
                />
                <TextBox
                    keyName={Key.SHARES_OWNED}
                    onChangeHandler={onChangeHandler}
                    placeholder={Placeholder.SHARES_OWNED}
                    textValue={sharesOwned}
                />
            </InputGroup>
        </Container>
    );
};

export default RegisterShareholderInput;
