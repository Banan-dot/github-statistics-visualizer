import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import { PullRequestState } from "../../models/PullRequest";
import Alert from "../../shared/Alert";
import PullRequestChart from "../../shared/charts/PullRequestChart";
import { RepositoryData, RepositoryVars } from "../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "./RepositoryCharts";

const getPullRequestsQuery = (name: string, state: PullRequestState) => gql`
  query ${name} ($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      pullRequests(states: ${state}) {
        totalCount
      }
    }
  }
`;

const PullRequestsChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const queryOptions: QueryHookOptions<RepositoryData, RepositoryVars> = {
    variables: {
      login,
      repositoryName,
    },
  };

  const openPullRequests = useQuery<RepositoryData, RepositoryVars>(
    getPullRequestsQuery("GetOpenPullRequests", "OPEN"),
    queryOptions
  );
  const closedPullRequests = useQuery<RepositoryData, RepositoryVars>(
    getPullRequestsQuery("GetClosedPullRequests", "CLOSED"),
    queryOptions
  );
  const mergedPullRequests = useQuery<RepositoryData, RepositoryVars>(
    getPullRequestsQuery("GetMergedPullRequests", "MERGED"),
    queryOptions
  );

  const loading =
    openPullRequests.loading ||
    closedPullRequests.loading ||
    mergedPullRequests.loading;
  const error =
    openPullRequests.error ||
    closedPullRequests.error ||
    mergedPullRequests.error;

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка пулл реквестов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки пулл реквестов</Alert>}

      {!loading && (
        <PullRequestChart
          pullRequestsInfo={{
            OPEN:
              openPullRequests.data?.repository.pullRequests.totalCount ?? 0,
            CLOSED:
              closedPullRequests.data?.repository.pullRequests.totalCount ?? 0,
            MERGED:
              mergedPullRequests.data?.repository.pullRequests.totalCount ?? 0,
          }}
        />
      )}
    </div>
  );
};

export default PullRequestsChartWrapper;
