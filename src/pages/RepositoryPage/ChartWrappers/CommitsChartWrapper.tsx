import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import Alert from "../../../shared/Alert";
import CommitsChart from "../../../shared/charts/CommitsChart";
import { useChartResize } from "../../../shared/useChartResize";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../index";

const GET_COMMITS_HISTORY = gql`
  query GetCommitsHistory($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      defaultBranchRef {
        id
        target {
          ... on Commit {
            id
            history(first: 100) {
              nodes {
                id
                pushedDate
              }
            }
          }
        }
      }
    }
  }
`;

const CommitsChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_COMMITS_HISTORY,
    {
      variables: {
        login,
        repositoryName,
      },
    }
  );
  const [containerRef, width] = useChartResize(450);
  const commits = data?.repository.defaultBranchRef.target.history.nodes;

  return (
    <div ref={containerRef} className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка коммитов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки коммитов</Alert>}

      {commits && !loading && <CommitsChart data={commits} width={width} />}
    </div>
  );
};

export default CommitsChartWrapper;
