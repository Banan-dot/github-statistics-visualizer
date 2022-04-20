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
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    firstUser: string,
    secondUser: string
  ) => void;
};

const Form = ({ onSubmit }: Props) => {
  const [firstUser, setFirstUser] = useState<string>("");
  const [secondUser, setSecondUser] = useState<string>("");

  return (
    <form
      onSubmit={(e) => onSubmit(e, firstUser, secondUser)}
      className="user-comparison__form"
    >
      <Input
        {...inputOptions}
        value={firstUser}
        onChange={(e) => setFirstUser(e.target.value)}
        className="user-comparison__input"
      />
      <Input
        value={secondUser}
        onChange={(e) => setSecondUser(e.target.value)}
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
