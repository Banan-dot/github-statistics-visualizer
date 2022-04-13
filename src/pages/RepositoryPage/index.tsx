import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../shared/Alert";
import PullRequestOpenings from "./PullRequestOpenings";
import RepositoryInfo from "./RepositoryInfo";

const RepositoryPage = () => {
  const { login, repositoryName } = useParams();

  useEffect(() => {
    document.title = `Страница репозитория - ${repositoryName}`;
  }, [repositoryName]);

  if (!login || !repositoryName) {
    return <Alert type="danger">Репозиторй не найден</Alert>;
  }

  return (
    <div className="repository-page">
      <RepositoryInfo login={login} repositoryName={repositoryName} />
      <PullRequestOpenings login={login} repositoryName={repositoryName} />
    </div>
  );
};

export default RepositoryPage;
