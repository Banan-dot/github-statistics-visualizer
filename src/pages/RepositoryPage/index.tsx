import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import RepositoryInfo from "./RepositoryInfo";

const RepositoryPage = () => {
  const { login, repositoryName } = useParams();

  useEffect(() => {
    document.title = `Страница репозитория - ${repositoryName}`;
  }, [repositoryName]);

  return (
    <div className="repository-page">
      <RepositoryInfo login={login} repositoryName={repositoryName} />
    </div>
  );
};

export default RepositoryPage;
