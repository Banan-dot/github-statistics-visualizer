import { gql, useQuery } from "@apollo/client";
import React from "react";
import CommitsChart from "../../../shared/charts/CommitsChart";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../RepositoryCharts";

const GET_COMMITS_HISTORY = gql`
  query GetCommitsHistory($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      ref(qualifiedName: "master") {
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
  const { data } = useQuery<RepositoryData, RepositoryVars>(
    GET_COMMITS_HISTORY,
    {
      variables: {
        login,
        repositoryName,
      },
    }
  );

  return (
    <div className={className}>
      {data?.repository.ref && (
        <CommitsChart data={data.repository.ref.target.history.nodes} />
      )}
    </div>
  );
};

export default CommitsChartWrapper;
