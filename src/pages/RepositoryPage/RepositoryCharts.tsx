import React from "react";
import { RepositoryItemProps } from ".";
import PageCard from "../../shared/PageCard";
import LanguagesChartWrapper from "./ChartWrappers/LanguagesChartWrapper";

export type RepositoryChartWrapperProps = {
  className?: string;
  login: string;
  repositoryName: string;
};

const RepositoryCharts = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const chartProps = {
    className: "charts-section__chart",
    login,
    repositoryName,
  };

  return (
    <PageCard element="section" className={`charts-section ${className ?? ""}`}>
      <PageCard.Header>
        <PageCard.Title>Статистика репозитория</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="charts-section__charts-container">
        <LanguagesChartWrapper {...chartProps} />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryCharts;
