import React from "react";
import PageCard from "../../shared/PageCard";
import IssuesChartWrapper from "./IssuesChartWrapper";
import LastIssuesChartWrapper from "./LastIssuesChartWrapper";
import LastPullRequestsChartWrapper from "./LastPullRequestsChartWrapper";
import PullRequestsChartWrapper from "./PullRequestsChartWrapper";

type Props = {
  login: string;
  repositoryName: string;
};

export type RepositoryChartWrapperProps = {
  className: string;
  login: string;
  repositoryName: string;
};

const RepositoryCharts = ({ login, repositoryName }: Props) => {
  const chartProps = {
    className: "charts-section__chart",
    login,
    repositoryName,
  };

  return (
    <PageCard
      element="section"
      className="charts-section repository-page__section"
    >
      <PageCard.Header>
        <PageCard.Title>Статистика репозитория</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="charts-section__charts-container">
        <LastPullRequestsChartWrapper {...chartProps} />
        <LastIssuesChartWrapper {...chartProps} />
        <PullRequestsChartWrapper {...chartProps} />
        <IssuesChartWrapper {...chartProps} />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryCharts;
