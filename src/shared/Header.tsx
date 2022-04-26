import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MarkGithubIcon } from "@primer/octicons-react";
import SearchInput from "./SearchInput";
import { Button } from "@skbkontur/react-ui";

const PATHS_TO_HIDE = ["/", "/compare"];
const USER_PATH = "/user/";
const COMPARE_PATH = "/compare";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const queryLength = Array.from(query).length;

  const onClick = () => {
    if (pathname.startsWith(USER_PATH)) {
      const firstUser = pathname.split("/")[2];
      navigate(`${COMPARE_PATH}?firstUser=${firstUser}`);
    } else if (queryLength === 2) {
      const firstUser = query.get("firstUser") ?? "";
      navigate(`${COMPARE_PATH}?firstUser=${firstUser}`);
    } else {
      navigate(COMPARE_PATH);
    }
  };
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <div className="gitstat-logo">
          <MarkGithubIcon className="gitstat-logo__icon" size={32} />
          <span className="gitstat-logo__name">GitStat</span>
        </div>
      </Link>
      {!PATHS_TO_HIDE.includes(pathname) && (
        <div className="header__search">
          <SearchInput
            onSubmit={(value) => navigate(`../user/${value}`)}
            showValidationErrors={false}
            width={"100%"}
          />
        </div>
      )}
      <div className="header__actions">
        <Button width="100%" onClick={onClick}>
          Сравнить
        </Button>
      </div>
    </header>
  );
}
