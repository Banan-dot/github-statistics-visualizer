import React from "react";
import { gql, useQuery } from "@apollo/client";
import LastPullRequestsChart from "../../../shared/charts/LastPullRequestsChart";
import Alert from "../../../shared/Alert";
import { Spinner } from "@skbkontur/react-ui";
import { RepositoryChartWrapperProps } from "../index";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { useChartResize } from "../../../shared/useChartResize";

const GET_LAST_PULL_REQUESTS = gql`
  query GetLAstPullRequests($login: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $login) {
      id
      pullRequests(last: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        nodes {
          id
          title
          createdAt
          closedAt
        }
      }
    }
  }
`;

const LastPullRequestsChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_LAST_PULL_REQUESTS,
    {
      variables: { login, repositoryName },
    }
  );
  const [containerRef, width] = useChartResize(450)

  return (
    <div ref={containerRef} className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка пулл реквестов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки пулл реквестов</Alert>}

      {data && !loading && (
        <LastPullRequestsChart
          width={width}
          data={data.repository.pullRequests.nodes}
        />
      )}
    </div>
  );
};

export default LastPullRequestsChartWrapper;
