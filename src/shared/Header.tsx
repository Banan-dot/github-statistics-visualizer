import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MarkGithubIcon } from "@primer/octicons-react";
import SearchInput from "./SearchInput";
import { Button } from "@skbkontur/react-ui";

const PATHS_TO_HIDE = ["/", "/compare"];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <div className="gitstat-logo">
          <MarkGithubIcon className="gitstat-logo__icon" size={32} />
          <span className="gitstat-logo__name">GitStat</span>
        </div>
      </Link>
      { !PATHS_TO_HIDE.includes(pathname) && (
        <div className="header__search">
          <SearchInput
            onSubmit={(value) => navigate(`../user/${value}`)}
            showValidationErrors={false}
            width={"100%"}
          />
        </div>
      )}
      <div className="header__actions">
        <Button width="100%" onClick={() => navigate("./compare")}>Сравнить</Button>
      </div>
    </header>
  );
}
