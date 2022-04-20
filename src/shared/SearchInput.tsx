import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Group, Input } from "@skbkontur/react-ui";

type SearchInputProps = {
  onSubmit: (value: string) => void;
  showValidationErrors?: boolean;
  width: string | number;
  className?: string;
};

const SearchInput = ({
  onSubmit,
  showValidationErrors = true,
  className,
  width,
}: SearchInputProps) => {
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
    <div className={`search-input ${className || ""}`}>
      <form onSubmit={onFormSubmit} className="search-input__form">
        <Group width={width}>
          <Input
            required={true}
            value={searchValue}
            onChange={onChange}
            error={isIncorrectName}
            placeholder="Введите никнейм пользователя..."
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            width={"100%"}
          />
          <Button type="submit">Найти</Button>
        </Group>
      </form>
    </div>
  );
};

export default SearchInput;
