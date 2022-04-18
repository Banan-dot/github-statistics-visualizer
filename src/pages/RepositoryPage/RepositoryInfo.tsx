import React from "react";
import { gql, useQuery } from "@apollo/client";
import Repository from "../../models/Repository";

import PageCard from "../../shared/PageCard";
import { Button, Link, Spinner, Textarea } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";
import DataLabel from "../../shared/DataLabel";
import UserAvatar from "../../shared/UserAvatar";
import CloneRepositoryButton from "../../shared/CloneRepositoryButton";

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
      url
      sshUrl
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
        <PageCard.Header className="repository-common-info__header">
          <div className="repository-common-info__header-info">
            <PageCard.Title>{data.repository.name}</PageCard.Title>
            <Link
              className="repository-common-info__user-link"
              href={`/user/${data.repository.owner.login}`}
            >
              <UserAvatar
                className="repository-common-info__user-link-avatar"
                src={data.repository.owner.avatarUrl}
                size={24}
              />
              <span className="repository-common-info__user-link-login">
                {data.repository.owner.login}
              </span>
            </Link>
          </div>
          <div className="repository-common-info__header-action-buttons">
            <Link
              className="repository-common-info__header-action-button"
              href={data.repository.url}
              target="_blank"
            >
              <Button width="100%">Открыть на Github</Button>
            </Link>
            <CloneRepositoryButton
              className="repository-common-info__header-action-button"
              url={data.repository.url}
              sshUrl={data.repository.sshUrl}
            />
          </div>
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
            {data.repository.description && (
              <div className="repository-common-info__description">
                <div>Описание</div>
                <Textarea
                  defaultValue={data.repository.description}
                  width="100%"
                  resize="none"
                  style={{ minWidth: "none" }}
                  readOnly
                />
              </div>
            )}

            <div className="repository-common-info__data-label-list">
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
