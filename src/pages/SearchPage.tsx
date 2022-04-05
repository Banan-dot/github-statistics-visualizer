import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import "../assets/styles/searchPage.scss";

const SearchPage = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const onSubmit = (value: string) => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
      navigate(`user/${value}`);
    }, 2000);
  };

  return (
    <div className={"search-page__container" + (shake ? ` liftUp` : "")}>
      <SearchInput onSubmit={onSubmit} />
    </div>
  );
};

export default SearchPage;
