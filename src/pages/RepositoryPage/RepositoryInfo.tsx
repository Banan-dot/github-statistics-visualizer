import React from "react";
import { gql, useQuery } from "@apollo/client";
import Repository from "../../models/Repository";

import PageCard from "../../shared/PageCard";
import { Link, Spinner, Textarea } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";
import DataLabel from "../../shared/DataLabel";
import UserAvatar from "../../shared/UserAvatar";

const GET_REPOSITORY = gql`
  query GetRepository($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      name
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 0) {
              totalCount
            }
          }
        }
      }
      issues {
        totalCount
      }
      createdAt
      updatedAt
      description
      forkCount
      stargazerCount
      pullRequests {
        totalCount
      }
      languages {
        totalCount
      }
      owner {
        login
        avatarUrl
      }
    }
  }
`;

type RepositoryVars = {
  login: string;
  repositoryName: string;
};

type RepositoryData = {
  repository: Repository;
};

type Props = {
  login: string;
  repositoryName: string;
};

const RepositoryInfo = ({ login, repositoryName }: Props) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_REPOSITORY,
    {
      variables: {
        login,
        repositoryName,
      },
    }
  );

  return (
    <PageCard
      element="section"
      className="repository-page__common-info repository-page__section"
    >
      {data?.repository && (
        <PageCard.Header>
          <PageCard.Title className="common-info__title">
            {data.repository.name}
          </PageCard.Title>
          <Link
            className="user-link"
            href={`/user/${data.repository.owner.login}`}
          >
            <UserAvatar
              className="user-link__avatar"
              src={data.repository.owner.avatarUrl}
              size={24}
            />
            <span className="user-link__login">
              {data.repository.owner.login}
            </span>
          </Link>
        </PageCard.Header>
      )}

      <PageCard.Body>
        {loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрузка информации о репозитории"
          />
        )}

        {error && (
          <Alert type="danger">Ошибка загрузки информации о репозитории</Alert>
        )}

        {data?.repository && (
          <div>
            <div className="description">
              <div>Описание</div>
              <Textarea
                defaultValue={data.repository.description}
                width="100%"
                resize="none"
                readOnly
              />
            </div>
            <div className="data-label-list">
              <DataLabel
                value={
                  data.repository.defaultBranchRef.target.history.totalCount
                }
                caption="Коммиты"
              />
              <DataLabel
                value={data.repository.pullRequests.totalCount}
                caption="Пулл реквесты"
              />
              <DataLabel
                value={data.repository.issues.totalCount}
                caption="Ишью"
              />
              <DataLabel
                value={data.repository.languages.totalCount}
                caption="Использовано языков"
              />
            </div>
          </div>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryInfo;
