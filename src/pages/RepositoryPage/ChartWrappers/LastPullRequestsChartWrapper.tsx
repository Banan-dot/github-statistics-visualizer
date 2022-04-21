import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import LastPullRequestsChart from "../../../shared/charts/LastPullRequestsChart";
import Alert from "../../../shared/Alert";
import { Spinner } from "@skbkontur/react-ui";
import { RepositoryChartWrapperProps } from "../RepositoryCharts";
import { RepositoryData, RepositoryVars } from "../../../types/QueryTypes";

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

const MIN_CHART_WIDTH = 450;

const LastPullRequestsChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_PULL_REQUESTS,
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
          caption="Загрузка пулл реквестов"
        />
      )}

      {error && <Alert type="danger">Ошибка загрузки пулл реквестов</Alert>}

      {data && !loading && (
        <LastPullRequestsChart
          width={chartWidth}
          data={data.repository.pullRequests.nodes}
        />
      )}
    </div>
  );
};

export default LastPullRequestsChartWrapper;
