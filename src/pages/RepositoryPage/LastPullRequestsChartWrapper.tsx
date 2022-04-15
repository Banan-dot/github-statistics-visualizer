import React from "react";
import { gql, useQuery } from "@apollo/client";
import Repository from "../../models/Repository";
import LastPullRequestsChart from "../../shared/charts/LastPullRequestsChart";
import Alert from "../../shared/Alert";
import { Spinner } from "@skbkontur/react-ui";

const GET_PULL_REQUESTS = gql`
  query GET_PULL_REQUESTS($login: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $login) {
      id
      pullRequests(last: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        nodes {
          id
          title
          createdAt
          closedAt
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
  className: string;
  login: string;
  repositoryName: string;
};

const LastPullRequestsChartWrapper = ({
  className,
  login,
  repositoryName,
}: Props) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_PULL_REQUESTS,
    {
      variables: { login, repositoryName },
    }
  );

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка пулл реквестов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки данных</Alert>}

      {data && !loading && (
        <LastPullRequestsChart data={data.repository.pullRequests.nodes} />
      )}
    </div>
  );
};

export default LastPullRequestsChartWrapper;
