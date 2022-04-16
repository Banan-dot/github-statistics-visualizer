import React from "react";
import { gql, useQuery } from "@apollo/client";
import Repository from "../../models/Repository";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";
import LastIssuesChart from "../../shared/charts/LastIssuesChart";

const GET_ISSUES = gql`
  query GET_ISSUES($login: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $login) {
      id
      issues(last: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        nodes {
          id
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

const LastIssuesChartWrapper = ({
  className,
  login,
  repositoryName,
}: Props) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_ISSUES,
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
        <LastIssuesChart data={data.repository.issues.nodes} />
      )}
    </div>
  );
};

export default LastIssuesChartWrapper;
