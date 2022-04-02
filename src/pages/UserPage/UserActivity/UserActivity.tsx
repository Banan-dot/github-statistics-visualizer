import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import RepositoryOwner from "../../../models/RepositoryOwner";
import Repositories from "../../../models/Repositories";
import UserActivityPolarChart from "../../../shared/charts/UserActivityPolarChart";
import PageCard from "../../../shared/PageCard";

const GET_USER_ACTIVITY_IN_REPOSITORIES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
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

  const userActivity = {
    Коммиты: commitCount,
    Форки: forkCount,
    Ишью: issueCount,
    "Пул реквесты": pullRequestsCount,
  };

  return (
    <PageCard className="page-card user-page__section">
      <PageCard.Header>
        <PageCard.Title>Активность пользователя</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        <div>Количество пулл реквестов: {pullRequestsCount}</div>
        <div>Количество ишьюс: {issueCount}</div>
        <div>Количество форков: {forkCount}</div>
        <div>Количество коммитов: {commitCount}</div>
      </PageCard.Body>
      <UserActivityPolarChart usersActivity={[userActivity]} />
    </PageCard>
  );
};

export default UserActivity;
