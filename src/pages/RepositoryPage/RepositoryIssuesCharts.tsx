import React from "react";
import { RepositoryItemProps } from ".";
import PageCard from "../../shared/PageCard";
import IssuesChartWrapper from "./ChartWrappers/IssuesChartWrapper";
import IssuesClosingFrequencyChartWrapper from "./ChartWrappers/IssuesClosingFrequencyChartWrapper";
import LastIssuesChartWrapper from "./ChartWrappers/LastIssuesChartWrapper";

const RepositoryIssuesCharts = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const chartWrapperProps = {
    className: "repository-issues-charts__item",
    login,
    repositoryName,
  };

  return (
    <PageCard element="section" className={className}>
      <PageCard.Header>
        <PageCard.Title>Статистика по ишьюс</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="repository-issues-charts">
        <LastIssuesChartWrapper {...chartWrapperProps} />
        <IssuesClosingFrequencyChartWrapper {...chartWrapperProps} />
        <IssuesChartWrapper {...chartWrapperProps} />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryIssuesCharts;
