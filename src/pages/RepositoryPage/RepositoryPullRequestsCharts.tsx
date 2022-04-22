import React from "react";
import { RepositoryItemProps } from ".";
import PageCard from "../../shared/PageCard";
import LastPullRequestsChartWrapper from "./ChartWrappers/LastPullRequestsChartWrapper";
import PullRequestsChartWrapper from "./ChartWrappers/PullRequestsChartWrapper";
import PullRequestsClosingFrequencyChartWrapper from "./ChartWrappers/PullRequestsClosingFrequencyChartWrapper";

const RepositoryPullRequestsCharts = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const chartWrapperProps = {
    className: "repository-pull-request-charts__item",
    login,
    repositoryName,
  };

  return (
    <PageCard element="section" className={className}>
      <PageCard.Header>
        <PageCard.Title>Статистика по пулл реквестам</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="repository-pull-request-charts">
        <LastPullRequestsChartWrapper {...chartWrapperProps} />
        <PullRequestsClosingFrequencyChartWrapper {...chartWrapperProps} />
        <PullRequestsChartWrapper {...chartWrapperProps} />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryPullRequestsCharts;
