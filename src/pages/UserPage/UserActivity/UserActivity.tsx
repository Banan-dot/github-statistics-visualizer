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
import IconDataLabel from "../../../shared/IconDataLabel";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import User from "../../../models/User";
import Issue from "../../../models/Issue";

const GET_USER_ACTIVITY_IN_REPOSITORIES = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      contributionsCollection {
        totalCommitContributions
      }
      issues(first: 100) {
        totalCount
        nodes {
          state
        }
      }
      pullRequests(first: 100) {
        totalCount
        nodes {
          state
        }
      }
    }
    repositoryOwner(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          forks {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  nodes {
                    author {
                      user {
                        login
                      }
                    }
                  }
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
  user: User;
  repositoryOwner: RepositoryOwner;
};

type RepositoriesVars = {
  login: string;
};

function getForkAndCommitCount(repositories: Repositories, login: string) {
  const result = {
    commitCount: 0,
    forkCount: 0,
  };

  repositories.nodes.forEach((repos) => {
    if (repos.defaultBranchRef !== null) {
      repos.defaultBranchRef.target.history.nodes.forEach((commit) => {
        const user = commit.author.user;
        if (user && user.login.toLowerCase() === login.toLowerCase())
          result.commitCount++;
      });
    }
    result.forkCount += repos.forks.totalCount;
  });

  return result;
}

function getPullRequestsInfo(user: User) {
  const result = {
    pullRequestsInfo: {
      OPEN: 0,
      CLOSED: 0,
      MERGED: 0,
    },
    pullRequestsCount: user.pullRequests.totalCount,
  };
  user.pullRequests.nodes.forEach((pr) => result.pullRequestsInfo[pr.state]++);

  return result;
}

function getIssuesInfo(user: User) {
  const result = {
    issuesInfo: {
      OPEN: 0,
      CLOSED: 0,
    },
    issuesCount: user.issues.totalCount,
  };
  user.issues.nodes.forEach((issue: Issue) => result.issuesInfo[issue.state]++);

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
    return <Alert type="danger">Ошибка загрузки активности пользователя</Alert>;
  }

  if (!data || data.repositoryOwner === null) {
    return <Alert type="danger">Нет данных</Alert>;
  }
  const repositories = data.repositoryOwner.repositories;
  const { commitCount, forkCount } = getForkAndCommitCount(repositories, login);
  const { issuesCount, issuesInfo } = getIssuesInfo(data.user);
  const { pullRequestsCount, pullRequestsInfo } = getPullRequestsInfo(
    data.user
  );

  const userActivity = {
    Коммиты: commitCount,
    Форки: forkCount,
    Ишью: issuesCount,
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
            {pullRequestsCount !== 0 && (
              <PullRequestChart
                pullRequestsInfo={pullRequestsInfo}
                className="user-activity__pull-request-chart"
              />
            )}
          </div>
        </div>

        <div className="user-activity__item">
          <div className="user-activity__issues-info">
            <p className="user-activity__issues-count">Ишьюс: {issuesCount}</p>
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
            {issuesCount !== 0 && (
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
