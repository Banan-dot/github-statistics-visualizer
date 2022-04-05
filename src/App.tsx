import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./shared/Layout";
import UserPage from "./pages/UserPage/UserPage";

import "./assets/styles/style.scss";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="user/:login" element={<UserPage />} />
      </Route>
    </Routes>
  );
};

export default App;
