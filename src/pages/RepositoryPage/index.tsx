import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../shared/Alert";
import RepositoryCharts from "./RepositoryCharts";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryLineCountInfo from "./LinesCount/RepositoryLineCountInfo";

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
      <RepositoryLineCountInfo login={login} repositoryName={repositoryName} />
      <RepositoryCharts login={login} repositoryName={repositoryName} />
    </div>
  );
};

export default RepositoryPage;
