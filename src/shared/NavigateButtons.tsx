import React from "react";
import { Center, Gapped, Button } from "@skbkontur/react-ui";
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
    <Center>
      <Gapped gap={8}>
        <Button onClick={onPrevButtonClick} disabled={disabledPrevButton}>
          <Gapped gap={8}>
            <ArrowLeftIcon />
            <span>Назад</span>
          </Gapped>
        </Button>
        <Button onClick={onNextButtonClick} disabled={disabledNextButton}>
          <Gapped gap={8}>
            <span>Далее</span>
            <ArrowRightIcon />
          </Gapped>
        </Button>
      </Gapped>
    </Center>
  );
};

export default NavigateButtons;
