import { gql, useLazyQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React, { useEffect } from "react";
import Alert from "../../../shared/Alert";
import CommitsChart from "../../../shared/charts/CommitsChart";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../index";

const GET_DEFAULT_BRANCH = gql`
  query GetDefaultBranch($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      defaultBranchRef {
        id
        name
      }
    }
  }
`;

const GET_COMMITS_HISTORY = gql`
  query GetCommitsHistory(
    $login: String!
    $repositoryName: String!
    $branchName: String!
  ) {
    repository(owner: $login, name: $repositoryName) {
      id
      ref(qualifiedName: $branchName) {
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

type CommitsVars = RepositoryVars & {
  branchName: string;
};

const CommitsChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const [getDefaultBranch, defaultBranchQuery] = useLazyQuery<
    RepositoryData,
    RepositoryVars
  >(GET_DEFAULT_BRANCH);

  const [getCommitsHistory, commitsHistoryQuery] = useLazyQuery<
    RepositoryData,
    CommitsVars
  >(GET_COMMITS_HISTORY);

  const loading = defaultBranchQuery.loading || commitsHistoryQuery.loading;
  const error = defaultBranchQuery.error || commitsHistoryQuery.error;
  const commits =
    commitsHistoryQuery.data?.repository.ref?.target.history.nodes;

  useEffect(() => {
    getDefaultBranch({
      variables: {
        login,
        repositoryName,
      },
    }).then((response) => {
      const { data } = response;
      if (data) {
        const branchName = data.repository.defaultBranchRef.name;
        getCommitsHistory({
          variables: {
            login,
            repositoryName,
            branchName,
          },
        });
      }
    });
  }, [getDefaultBranch, getCommitsHistory, login, repositoryName]);

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка коммитов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки коммитов</Alert>}

      {commits && !loading && <CommitsChart data={commits} />}
    </div>
  );
};

export default CommitsChartWrapper;
