import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RepositoryChartWrapperProps } from "../index";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import ClosingFrequencyChart from "../../../shared/charts/ClosingFrequencyChart";

const GET_ISSUES = gql`
  query GetIssues($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      issues(first: 100, states: CLOSED) {
        nodes {
          id
          createdAt
          closedAt
        }
      }
    }
  }
`;

const IssuesClosingFrequencyChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_ISSUES,
    {
      variables: { login, repositoryName },
    }
  );

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка закрытых ишьюc"
        />
      )}

      {error && <Alert type="danger">Ошибка закрузки закрытых ишью</Alert>}

      {data && !loading && (
        <ClosingFrequencyChart
          data={data.repository.issues.nodes}
          emptyMessage="Пустой список ишьюс"
          legendProps={{
            title: "Частота зыкрытия ишьюс",
            x: 180,
          }}
        />
      )}
    </div>
  );
};

export default IssuesClosingFrequencyChartWrapper;
