import React from "react";
import "../assets/styles/header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MarkGithubIcon } from "@primer/octicons-react";
import SearchInput from "./SearchInput";

const LOGO_WIDTH: number = window.screen.width / 32;

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="header">
      <Link to="/" className="link-block-logo">
        <div className="logo-with-name">
          <MarkGithubIcon className="logo" size={LOGO_WIDTH} />
          <span className="logo-name">GitStat</span>
        </div>
      </Link>
      {pathname !== "/" && (
        <SearchInput onSubmit={(value) => navigate(`../user/${value}`)} />
      )}
      <div className="comparison-info">В сравнении 2</div>
    </header>
  );
}
