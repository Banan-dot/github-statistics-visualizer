import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import "../assets/styles/searchPage.scss";

const SearchPage = () => {
  const navigate = useNavigate();

  const onSubmit = (value: string) => {
    navigate(`user/${value}`);
  };

  return (
    <div className={"search-page__container"}>
      <SearchInput onSubmit={onSubmit} />
    </div>
  );
};

export default SearchPage;
