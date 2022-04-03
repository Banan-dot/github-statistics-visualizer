import React, { FormEvent, useState } from "react";
import { Button, Input } from "@skbkontur/react-ui";

type SearchInputProps = {
  onSubmit: (value: string) => void;
};

const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchValue);
  };
  return (
    <div className="search-page__input">
      <form onSubmit={onFormSubmit}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Введите никнем пользователя..."
        />
        <Button use="default" type="submit">
          Найти
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;
