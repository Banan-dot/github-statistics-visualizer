import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";

const SearchPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <SearchInput onSubmit={(value) => navigate(`user/${value}`)} />
    </div>
  );
};

export default SearchPage;
