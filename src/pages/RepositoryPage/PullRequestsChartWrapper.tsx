import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import { PullRequestState } from "../../models/PullRequest";
import Repository from "../../models/Repository";
import Alert from "../../shared/Alert";
import PullRequestChart from "../../shared/charts/PullRequestChart";

const getPullRequestsQuery = (name: string, state: PullRequestState) => gql`
  query ${name} ($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      pullRequests(states: ${state}) {
        totalCount
      }
    }
  }
`;

type Props = {
  className: string;
  login: string;
  repositoryName: string;
};

type PullRequestsVars = {
  login: string;
  repositoryName: string;
};

type PullRequestsData = {
  repository: Repository;
};

const PullRequestsChartWrapper = ({
  className,
  login,
  repositoryName,
}: Props) => {
  const queryOptions: QueryHookOptions<PullRequestsData, PullRequestsVars> = {
    variables: {
      login,
      repositoryName,
    },
  };

  const openPullRequests = useQuery<PullRequestsData, PullRequestsVars>(
    getPullRequestsQuery("GetOpenPullRequests", "OPEN"),
    queryOptions
  );
  const closedPullRequests = useQuery<PullRequestsData, PullRequestsVars>(
    getPullRequestsQuery("GetClosedPullRequests", "CLOSED"),
    queryOptions
  );
  const mergedPullRequests = useQuery<PullRequestsData, PullRequestsVars>(
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