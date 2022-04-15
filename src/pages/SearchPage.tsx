import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";

const SearchPage = () => {
  const navigate = useNavigate();

  const onSubmit = (value: string) => {
    navigate(`user/${value}`);
  };

  return (
    <div className="search-page">
      <SearchInput onSubmit={onSubmit} />
    </div>
  );
};

export default SearchPage;
