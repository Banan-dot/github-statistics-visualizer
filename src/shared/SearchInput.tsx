import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input } from "@skbkontur/react-ui";
import { useNavigate } from "react-router-dom";

type SearchInputProps = {
  onSubmit: (value: string) => void;
};

const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isIncorrectName, setIsCorrectName] = useState<boolean>(false);
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue === "") {
      setIsCorrectName(true);
      return;
    }

    onSubmit(searchValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isIncorrectName) setIsCorrectName(false);
    setSearchValue(e.target.value);
  };

  return (
    <div className={"search-page__input"}>
      <form onSubmit={onFormSubmit}>
        <Input
          value={searchValue}
          onChange={onChange}
          placeholder="Введите никнем пользователя..."
          style={{ width: "auto" }}
        />
        <Button use="default" type="submit">
          Найти
        </Button>
      </form>
      {isIncorrectName && (
        <span className="search-page__error">Заполните поле</span>
      )}
    </div>
  );
};

export default SearchInput;
