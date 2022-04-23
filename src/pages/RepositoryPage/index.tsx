import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../shared/Alert";
import RepositoryLanguageStats from "./RepositoryLanguageStats";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryLineCountInfo from "./LinesCount/RepositoryLineCountInfo";
import RepositoryCommitsInfo from "./RepositoryCommitsInfo";
import RepositoryPullRequestsCharts from "./RepositoryPullRequestsCharts";
import RepositoryIssuesCharts from "./RepositoryIssuesCharts";

export type RepositoryItemProps = {
  className?: string;
  login: string;
  repositoryName: string;
};

export type RepositoryChartWrapperProps = {
  className?: string;
  login: string;
  repositoryName: string;
};

const RepositoryPage = () => {
  const { login, repositoryName } = useParams();

  useEffect(() => {
    document.title = `Страница репозитория - ${repositoryName}`;
  }, [repositoryName]);

  if (!login || !repositoryName) {
    return <Alert type="danger">Репозиторй не найден</Alert>;
  }

  const repositoryItemProps = {
    className: "repository-page__section",
    login,
    repositoryName,
  };

  return (
    <div className="repository-page">
      <RepositoryInfo {...repositoryItemProps} />
      <RepositoryCommitsInfo {...repositoryItemProps} />
      <RepositoryLineCountInfo {...repositoryItemProps} />
      <RepositoryPullRequestsCharts {...repositoryItemProps} />
      <RepositoryIssuesCharts {...repositoryItemProps} />
      <RepositoryLanguageStats {...repositoryItemProps} />
    </div>
  );
};

export default RepositoryPage;
