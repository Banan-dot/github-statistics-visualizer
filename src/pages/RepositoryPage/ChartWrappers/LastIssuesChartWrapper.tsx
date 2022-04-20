import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import LastIssuesChart from "../../../shared/charts/LastIssuesChart";
import { RepositoryChartWrapperProps } from "../RepositoryCharts";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";

const GET_ISSUES = gql`
  query GET_ISSUES($login: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $login) {
      id
      issues(last: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        nodes {
          id
          createdAt
          closedAt
        }
      }
    }
  }
`;

const LastIssuesChartWrapper = ({
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
          caption="Загрузка пулл реквестов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки данных</Alert>}

      {data && !loading && (
        <LastIssuesChart data={data.repository.issues.nodes} />
      )}
    </div>
  );
};

export default LastIssuesChartWrapper;
