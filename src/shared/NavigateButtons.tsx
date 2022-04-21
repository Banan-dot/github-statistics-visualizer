import React from "react";
import { Button, Gapped } from "@skbkontur/react-ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";

type Props = {
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
  disabledNextButton?: boolean;
  disabledPrevButton?: boolean;
};

const NavigateButtons = ({
  onNextButtonClick,
  onPrevButtonClick,
  disabledNextButton,
  disabledPrevButton,
}: Props) => {
  return (
    <div className="navigate-buttons">
      <Button
        className="navigate-buttons__item"
        onClick={onPrevButtonClick}
        disabled={disabledPrevButton}
      >
        <Gapped gap={8}>
          <ArrowLeftIcon />
          <span>Назад</span>
        </Gapped>
      </Button>
      <Button
        className="navigate-buttons__item"
        onClick={onNextButtonClick}
        disabled={disabledNextButton}
      >
        <Gapped gap={8}>
          <span>Далее</span>
          <ArrowRightIcon />
        </Gapped>
      </Button>
    </div>
  );
};

export default NavigateButtons;
