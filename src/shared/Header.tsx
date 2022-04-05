import React from "react";
import "../assets/styles/header.scss";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const LOGO_WIDTH: number = window.screen.width / 32;

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="link-block-logo">
        <div className="logo-with-name">
          <Logo className="logo" width={LOGO_WIDTH} height={LOGO_WIDTH} />
          <span className="logo-name">GitStat</span>
        </div>
      </Link>
      <div className="comparison-info">В сравнении 2</div>
    </header>
  );
}
