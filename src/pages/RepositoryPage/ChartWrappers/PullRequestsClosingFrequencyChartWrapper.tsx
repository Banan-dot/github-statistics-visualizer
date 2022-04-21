import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import Alert from "../../../shared/Alert";
import ClosingFrequencyChart from "../../../shared/charts/ClosingFrequencyChart";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../RepositoryCharts";

const GET_PULL_REQUESTS = gql`
  query GetPullRequests($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      pullRequests(first: 100, states: [CLOSED, MERGED]) {
        nodes {
          id
          createdAt
          closedAt
        }
      }
    }
  }
`;

const PullRequestsClosingFrequencyChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_PULL_REQUESTS,
    {
      variables: { login, repositoryName },
    }
  );

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка закрытых пулл реквестов"
        />
      )}

      {error && (
        <Alert type="danger">Ошибка закрузки закрытых пулл реквестов</Alert>
      )}

      {data && !loading && (
        <ClosingFrequencyChart
          data={data.repository.pullRequests.nodes}
          legendTitle="Частота зыкрытия пулл реквестов"
          emptyMessage="Пустой список пулл реквестов"
        />
      )}
    </div>
  );
};

export default PullRequestsClosingFrequencyChartWrapper;
