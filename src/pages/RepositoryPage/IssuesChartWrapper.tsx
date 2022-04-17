import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import { IssueState } from "../../models/Issue";
import Repository from "../../models/Repository";
import Alert from "../../shared/Alert";
import IssuesChart from "../../shared/charts/IssuesChart";
import { RepositoryChartWrapperProps } from "./RepositoryCharts";

const getIssuesQuery = (name: string, state: IssueState) => gql`
  query ${name} ($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      issues(states: ${state}) {
        totalCount
      }
    }
  }
`;

type IssuesVars = {
  login: string;
  repositoryName: string;
};

type IssuesData = {
  repository: Repository;
};

const IssuesChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const queryOptions: QueryHookOptions<IssuesData, IssuesVars> = {
    variables: {
      login,
      repositoryName,
    },
  };

  const openIssues = useQuery<IssuesData, IssuesVars>(
    getIssuesQuery("GetOpenIssues", "OPEN"),
    queryOptions
  );
  const closedIssues = useQuery<IssuesData, IssuesVars>(
    getIssuesQuery("GetClosedIssues", "CLOSED"),
    queryOptions
  );

  const loading = openIssues.loading || closedIssues.loading;
  const error = openIssues.error || closedIssues.error;

  return (
    <div className={className}>
      {loading && (
        <Spinner className="spinner spinner_centered" caption="Загрузка ишью" />
      )}

      {error && <Alert type="danger">Ошибка загрузки ишью</Alert>}

      {!loading && (
        <IssuesChart
          issuesInfo={{
            OPEN: openIssues.data?.repository.issues.totalCount ?? 0,
            CLOSED: closedIssues.data?.repository.issues.totalCount ?? 0,
          }}
        />
      )}
    </div>
  );
};

export default IssuesChartWrapper;
