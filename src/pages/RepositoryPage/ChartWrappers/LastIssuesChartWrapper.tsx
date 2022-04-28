import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import LastIssuesChart from "../../../shared/charts/LastIssuesChart";
import { RepositoryChartWrapperProps } from "../index";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { useChartResize } from "../../../shared/useChartResize";

const GET_LAST_ISSUES = gql`
  query GetLastIssues($login: String!, $repositoryName: String!) {
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
    GET_LAST_ISSUES,
    {
      variables: { login, repositoryName },
    }
  );
  const [containerRef, width] = useChartResize(450);

  return (
    <div ref={containerRef} className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка ишьюс"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки ишьюс</Alert>}

      {data && !loading && (
        <LastIssuesChart width={width} data={data.repository.issues.nodes} />
      )}
    </div>
  );
};

export default LastIssuesChartWrapper;
