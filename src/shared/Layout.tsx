import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="page-wrapper">
      <Outlet />
    </main>
  );
};

export default Layout;
