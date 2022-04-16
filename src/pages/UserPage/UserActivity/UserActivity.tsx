import React from "react";
import { useQuery, gql } from "@apollo/client";
import RepositoryOwner from "../../../models/RepositoryOwner";
import Repositories from "../../../models/Repositories";
import UserActivityPolarChart from "../../../shared/charts/UserActivityPolarChart";
import PageCard from "../../../shared/PageCard";
import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  IssueClosedIcon,
} from "@primer/octicons-react";
import PullRequestChart from "../../../shared/charts/PullRequestChart";
import IssuesChart from "../../../shared/charts/IssuesChart";
const GET_USER_ACTIVITY_IN_REPOSITORIES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          forks {
            totalCount
          }
          issues(first: 100) {
            totalCount
            edges {
              node {
                state
              }
            }
          }
          pullRequests(first: 100) {
            totalCount
            edges {
              node {
                state
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {
  login: string;
};

type RepositoriesData = {
  repositoryOwner: RepositoryOwner;
};

type RepositoriesVars = {
  login: string;
};

function getActivityInfo(repositories: Repositories) {
  const result = {
    commitCount: 0,
    forkCount: 0,
    issueCount: 0,
    pullRequestsCount: 0,
  };

  repositories.nodes.forEach((repos) => {
    result.commitCount += repos.defaultBranchRef.target.history.totalCount;
    result.forkCount += repos.forks.totalCount;
    result.issueCount += repos.issues.totalCount;
    result.pullRequestsCount += repos.pullRequests.totalCount;
  });

  return result;
}

function getPullRequestsInfo(repositories: Repositories) {
  const result = {
    OPEN: 0,
    MERGED: 0,
    CLOSED: 0,
    totalCount: 0,
  };
  repositories.nodes.forEach((repos) => {
    const pullRequests = repos.pullRequests;
    pullRequests.edges.forEach((edge) => result[edge.node.state]++);
    result.totalCount += pullRequests.totalCount;
  });

  return result;
}

function getIssuesInfo(repositories: Repositories) {
  const result = {
    OPEN: 0,
    CLOSED: 0,
    totalCount: 0,
  };
  repositories.nodes.forEach((repos) => {
    const issues = repos.issues;
    issues.edges.forEach((edge) => result[edge.node.state]++);
    result.totalCount += issues.totalCount;
  });

  return result;
}

const UserActivity = ({ login }: Props) => {
  const { data, error, loading } = useQuery<RepositoriesData, RepositoriesVars>(
    GET_USER_ACTIVITY_IN_REPOSITORIES,
    {
      variables: {
        login: login,
      },
    }
  );

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки репозиториев</div>;
  if (!data) return <div>Нет данных</div>;

  const repositories = data.repositoryOwner.repositories;
  const { commitCount, forkCount, issueCount, pullRequestsCount } =
    getActivityInfo(repositories);

  const pullRequestsInfo = getPullRequestsInfo(repositories);
  const issuesInfo = getIssuesInfo(repositories);

  const userActivity = {
    Коммиты: commitCount,
    Форки: forkCount,
    Ишью: issueCount,
    "Пул реквесты": pullRequestsCount,
  };

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Активность пользователя</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-activity">
        <div className="user-activity__item user-activity__pull-requests-info">
          <div>
            <p className="user-activity__pull-requests-count">
              Пулл реквесты: {pullRequestsCount}
            </p>
            <span>
              <GitPullRequestIcon /> {pullRequestsInfo.OPEN}
            </span>
            <span>
              <GitPullRequestClosedIcon /> {pullRequestsInfo.CLOSED}
            </span>
            <span>
              <GitMergeIcon /> {pullRequestsInfo.MERGED}
            </span>
          </div>
          <div>
            {pullRequestsInfo.totalCount !== 0 && (
              <PullRequestChart
                pullRequestsInfo={pullRequestsInfo}
                className="user-activity__pull-request-chart"
              />
            )}
          </div>
        </div>

        <div className="user-activity__item user-activity__issues-info">
          <div>
            <p>Ишьюс: {issuesInfo.totalCount}</p>
            <span>
              <IssueOpenedIcon /> {issuesInfo.OPEN}
            </span>
            <span>
              <IssueClosedIcon /> {issuesInfo.CLOSED}
            </span>
          </div>
          <div>
            {issuesInfo.totalCount !== 0 && (
              <IssuesChart
                issuesInfo={issuesInfo}
                className="user-activity__issues-chart"
              />
            )}
          </div>
        </div>

        <div className="user-activity__item">
          <div>
            <div>Форки: {forkCount}</div>
            <div>Коммиты: {commitCount}</div>
          </div>
          <div>
            <UserActivityPolarChart
              usersActivity={[userActivity]}
              className="user-activity__user-activity-chart"
            />
          </div>
        </div>
      </PageCard.Body>
    </PageCard>
  );
};

export default UserActivity;
