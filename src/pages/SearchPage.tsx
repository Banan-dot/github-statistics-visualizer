import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";

const SearchPage = () => {
  const navigate = useNavigate();
  const [isIncorrectName, setIsCorrectName] = useState<boolean>(false);
  const onSubmit = (value: string) => {
    if (value === "") {
      setIsCorrectName(true);
      return;
    }
    navigate(`user/${value}`);
  };
  console.log(isIncorrectName);
  return (
    <div>
      <SearchInput onSubmit={onSubmit} />
      {isIncorrectName && (
        <div className="search-page__error">Заполните поле</div>
      )}
    </div>
  );
};

export default SearchPage;
