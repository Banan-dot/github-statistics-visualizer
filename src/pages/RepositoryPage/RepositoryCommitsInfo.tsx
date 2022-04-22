import React from "react";
import { RepositoryItemProps } from ".";
import PageCard from "../../shared/PageCard";
import CommitsChartWrapper from "./ChartWrappers/CommitsChartWrapper";

const RepositoryCommitsInfo = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  return (
    <PageCard className={className}>
      <PageCard.Header>
        <PageCard.Title>Статистка коммитов в ветке по умолчанию</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        <CommitsChartWrapper login={login} repositoryName={repositoryName} />
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryCommitsInfo;
