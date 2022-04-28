import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { IssueClosedIcon, IssueOpenedIcon } from "@primer/octicons-react";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import { IssueState } from "../../../models/Issue";
import Alert from "../../../shared/Alert";
import IssuesChart from "../../../shared/charts/IssuesChart";
import IconDataLabel from "../../../shared/IconDataLabel";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "../index";

const getIssuesQuery = (name: string, state: IssueState) => gql`
  query ${name} ($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      issues(states: ${state}) {
        totalCount
      }
    }
  }
`;

const IssuesChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const queryOptions: QueryHookOptions<RepositoryData, RepositoryVars> = {
    variables: {
      login,
      repositoryName,
    },
  };

  const openIssues = useQuery<RepositoryData, RepositoryVars>(
    getIssuesQuery("GetOpenIssues", "OPEN"),
    queryOptions
  );
  const closedIssues = useQuery<RepositoryData, RepositoryVars>(
    getIssuesQuery("GetClosedIssues", "CLOSED"),
    queryOptions
  );

  const loading = openIssues.loading || closedIssues.loading;
  const error = openIssues.error || closedIssues.error;

  const issuesInfo = {
    OPEN: openIssues.data?.repository.issues.totalCount ?? 0,
    CLOSED: closedIssues.data?.repository.issues.totalCount ?? 0,
  };

  return (
    <div className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка ишьюс"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки ишьюс</Alert>}

      {!loading && (
        <div className="issues-chart__wrapper">
          <div className="issues-chart__label-list">
            <IconDataLabel
              icon={IssueOpenedIcon}
              value={issuesInfo.OPEN}
              hintText="Открытые ишьюс"
            />
            <IconDataLabel
              icon={IssueClosedIcon}
              value={issuesInfo.CLOSED}
              hintText="Закрытые ишьюс"
            />
          </div>
          <IssuesChart issuesInfo={issuesInfo} />
        </div>
      )}
    </div>
  );
};

export default IssuesChartWrapper;
