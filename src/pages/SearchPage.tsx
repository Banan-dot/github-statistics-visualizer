import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";

const SearchPage = () => {
  const navigate = useNavigate();

  const onSubmit = (value: string) => {
    navigate(`user/${value}`);
  };

  useEffect(() => {
    document.title = "Главная страница"
  }, [])

  return (
    <div className="search-page">
      <SearchInput width={"100%"} onSubmit={onSubmit} />
    </div>
  );
};

export default SearchPage;
