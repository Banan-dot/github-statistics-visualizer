import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Repository from "../../models/Repository";

import PageCard from "../../shared/PageCard";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";
import DataLabel from "../../shared/DataLabel";

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
      collaborators {
        totalCount
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
  login: string | undefined;
  repositoryName: string | undefined;
};

const RepositoryInfo = ({ login, repositoryName }: Props) => {
  const [getRepository, { loading, data, error }] = useLazyQuery<
    RepositoryData,
    RepositoryVars
  >(GET_REPOSITORY);

  useEffect(() => {
    if (login && repositoryName) {
      getRepository({
        variables: {
          login,
          repositoryName,
        },
      });
    }
  }, [getRepository, login, repositoryName]);

  return (
    <PageCard
      element="section"
      className="repository-page__common-info repository-page__section"
    >
      <PageCard.Header>
        <PageCard.Title>Основная информация</PageCard.Title>
      </PageCard.Header>
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
          <div className="data-label-list">
            <DataLabel
              value={data.repository.defaultBranchRef.target.history.totalCount}
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
              value={data.repository.collaborators.totalCount}
              caption="Коллабораторы"
            />
          </div>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryInfo;
