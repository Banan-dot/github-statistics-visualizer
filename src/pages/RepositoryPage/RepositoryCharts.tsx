import React from "react";
import PageCard from "../../shared/PageCard";
import LastPullRequestsChartWrapper from "./LastPullRequestsChartWrapper";

type Props = {
  login: string;
  repositoryName: string;
};

const RepositoryCharts = ({ login, repositoryName }: Props) => {
  return (
    <PageCard
      element="section"
      className="charts-section repository-page__section"
    >
      <PageCard.Header>
        <PageCard.Title>Статистика репозитория</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="charts-section__charts-container">
        <LastPullRequestsChartWrapper
          className="charts-section__chart"
          login={login}
          repositoryName={repositoryName}
        />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryCharts;
