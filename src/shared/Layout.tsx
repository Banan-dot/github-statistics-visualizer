import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="content-wrapper">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
