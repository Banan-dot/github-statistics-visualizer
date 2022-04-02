import React, {FormEvent, useState} from "react";

type SearchInputProps = {
  onSubmit: (value: string) => void;
};

const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchValue)
  }
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          Введите имя пользователя:
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Найти" />
      </form>
    </div>
  );
};

export default SearchInput;
