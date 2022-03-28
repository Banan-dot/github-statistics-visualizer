import React, { useState } from "react";

type SearchInputProps = {
  onSubmit: (value: string) => void;
};

const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <form onSubmit={() => onSubmit(searchValue)}>
        <label>
          Username:
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SearchInput;
