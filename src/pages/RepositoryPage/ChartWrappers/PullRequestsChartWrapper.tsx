import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import { PullRequestState } from "../../../models/PullRequest";
import Alert from "../../../shared/Alert";
import PullRequestChart from "../../../shared/charts/PullRequestChart";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../index";
import IconDataLabel from "../../../shared/IconDataLabel";
import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

const getPullRequestsQuery = (name: string, state: PullRequestState) => gql`
  query ${name} ($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
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

  const pullRequestsInfo = {
    OPEN: openPullRequests.data?.repository.pullRequests.totalCount ?? 0,
    CLOSED: closedPullRequests.data?.repository.pullRequests.totalCount ?? 0,
    MERGED: mergedPullRequests.data?.repository.pullRequests.totalCount ?? 0,
  };

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
        <div className="pull-request-chart__wrapper">
          <div className="pull-request-chart__label-list">
            <IconDataLabel
              icon={GitPullRequestIcon}
              value={pullRequestsInfo.OPEN}
              hintText="Открытые пулл ревквесты"
            />
            <IconDataLabel
              icon={GitMergeIcon}
              value={pullRequestsInfo.MERGED}
              hintText="Слитые пулл ревквесты"
            />
            <IconDataLabel
              icon={GitPullRequestClosedIcon}
              value={pullRequestsInfo.CLOSED}
              hintText="Закрытые пулл ревквесты"
            />
          </div>
          <PullRequestChart pullRequestsInfo={pullRequestsInfo} />
        </div>
      )}
    </div>
  );
};

export default PullRequestsChartWrapper;
