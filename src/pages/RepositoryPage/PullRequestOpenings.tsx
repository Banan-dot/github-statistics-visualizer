import React from "react";
import { gql, useQuery } from "@apollo/client";
import Repository from "../../models/Repository";
import PageCard from "../../shared/PageCard";
import CreatedPullRequestChart from "../../shared/charts/CreatedPullRequestChart";
import Alert from "../../shared/Alert";
import { Spinner } from "@skbkontur/react-ui";

const GET_PULL_REQUESTS = gql`
  query GET_PULL_REQUESTS($login: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $login) {
      id
      pullRequests(last: 100, orderBy: { field: CREATED_AT, direction: ASC }) {
        nodes {
          id
          title
          createdAt
        }
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

const PullRequestOpenings = ({ login, repositoryName }: Props) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_PULL_REQUESTS,
    {
      variables: { login, repositoryName },
    }
  );

  return (
    <PageCard>
      <PageCard.Header>
        <PageCard.Title>Статистика открытия пулл реквестов</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрузка пулл реквестов"
          />
        )}

        {error && <Alert type="danger">Ошибка загрузки данных</Alert>}

        {data && (
          <CreatedPullRequestChart data={data.repository.pullRequests.nodes} />
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default PullRequestOpenings;
