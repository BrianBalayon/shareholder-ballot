import React from "react";
import { ButtonText } from "./constants";
import SubmitButton from "../../utils/input/submit-button";

const GetWinnerButton = ({ onClickGetWinner }) => (
  <SubmitButton
    onClickHandler={onClickGetWinner}
    text={ButtonText.GET_WINNER}
  />
);

export default GetWinnerButton;
