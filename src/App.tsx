import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./shared/Layout";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import RepositoryPage from "./pages/RepositoryPage";
import NotFound from "./pages/NotFound";

import "./assets/styles/style.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="user/:login">
          <Route element={<UserPage />} index />
          <Route
            path="repository/:repositoryName"
            element={<RepositoryPage />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
