import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Group, Input } from "@skbkontur/react-ui";

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
        <Group width={325}>
          <Input
            value={searchValue}
            onChange={onChange}
            error={isIncorrectName}
            placeholder="Введите никнем пользователя..."
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            width="100%"
          />
          <Button type="submit">Найти</Button>
        </Group>
      </form>
      {isIncorrectName && (
        <span className="search-page__error">Заполните поле</span>
      )}
    </div>
  );
};

export default SearchInput;
