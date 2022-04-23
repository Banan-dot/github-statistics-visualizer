import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import LastIssuesChart from "../../../shared/charts/LastIssuesChart";
import { RepositoryChartWrapperProps } from "../index";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";

const GET_LAST_ISSUES = gql`
  query GetLastIssues($login: String!, $repositoryName: String!) {
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

const MIN_CHART_WIDTH = 450;

const LastIssuesChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_LAST_ISSUES,
    {
      variables: { login, repositoryName },
    }
  );
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(MIN_CHART_WIDTH);

  const onChartContainerResize = (
    resizeObserverEntry: ResizeObserverEntry[]
  ) => {
    const chartContainer = resizeObserverEntry[0];
    setChartWidth(Math.max(chartContainer.contentRect.width, MIN_CHART_WIDTH));
  };

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      const containerWidth = chartContainer.getBoundingClientRect().width;
      setChartWidth(Math.max(containerWidth, MIN_CHART_WIDTH));

      const resizeObserver = new ResizeObserver(onChartContainerResize);
      resizeObserver.observe(chartContainer);

      return () => {
        resizeObserver.unobserve(chartContainer);
      };
    }
  }, []);

  return (
    <div ref={chartContainerRef} className={className}>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка ишьюс"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки ишьюс</Alert>}

      {data && !loading && (
        <LastIssuesChart width={chartWidth} data={data.repository.issues.nodes} />
      )}
    </div>
  );
};

export default LastIssuesChartWrapper;
