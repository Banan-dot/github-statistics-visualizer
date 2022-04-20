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
  LawIcon,
} from "@primer/octicons-react";
import PullRequestChart from "../../../shared/charts/PullRequestChart";
import IssuesChart from "../../../shared/charts/IssuesChart";
import IconDataLabel from "../../../shared/IconDataLabel";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import PullRequestEdge from "../../../models/PullRequestEdge";
import IssueEdge from "../../../models/IssueEdge";

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
    if (repos.defaultBranchRef !== null)
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
    pullRequests.edges.forEach(
      (edge: PullRequestEdge) => result[edge.node.state]++
    );
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
    issues.edges.forEach((edge: IssueEdge) => result[edge.node.state]++);
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

  if (loading) {
    return (
      <Spinner
        className="spinner spinner_centered"
        caption="Загрузка информации об активности пользователя"
      />
    );
  }

  if (error) {
    return <Alert type="danger">Ошибка загрузки репозиториев</Alert>;
  }

  if (!data || data.repositoryOwner === null) {
    return <Alert type="danger">Нет данных</Alert>;
  }
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
        <div className="user-activity__item">
          <div className="user-activity__pull-requests-info">
            <p className="user-activity__pull-requests-count">
              Пулл реквесты: {pullRequestsCount}
            </p>
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
          <div>
            {pullRequestsInfo.totalCount !== 0 && (
              <PullRequestChart
                pullRequestsInfo={pullRequestsInfo}
                className="user-activity__pull-request-chart"
              />
            )}
          </div>
        </div>

        <div className="user-activity__item">
          <div className="user-activity__issues-info">
            <p className="user-activity__issues-count">
              Ишьюс: {issuesInfo.totalCount}
            </p>
            <IconDataLabel
              icon={IssueOpenedIcon}
              value={issuesInfo.OPEN}
              hintText="Открытые ишьюс"
            />
            <IconDataLabel
              icon={IssueClosedIcon}
              value={issuesInfo.CLOSED}
              hintText="Закрытые ишьюс"
            />
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
