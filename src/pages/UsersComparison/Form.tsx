import { Button, Input } from "@skbkontur/react-ui";
import React, { FormEvent, useState } from "react";

const inputOptions = {
  placeholder: "Введите никнейм пользователя...",
  style: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  width: "75%",
  maxLength: 30,
  required: true,
};

type Props = {
  firstUser: string,
  secondUser: string
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    firstUser: string,
    secondUser: string
  ) => void;
};

const Form = ({ firstUser, secondUser, onSubmit }: Props) => {
  const [firstField, setFirstField] = useState<string>(firstUser);
  const [secondField, setSecondField] = useState<string>(secondUser);

  return (
    <form
      onSubmit={(e) => onSubmit(e, firstField, secondField)}
      className="user-comparison__form"
    >
      <Input
        {...inputOptions}
        value={firstField}
        onChange={(e) => setFirstField(e.target.value)}
        className="user-comparison__input"
      />
      <Input
        value={secondField}
        onChange={(e) => setSecondField(e.target.value)}
        {...inputOptions}
        className="user-comparison__input"
      />{" "}
      <Button className="user-comparison__submit-button" type="submit">
        Сравнить пользователей
      </Button>
    </form>
  );
};

export default Form;
