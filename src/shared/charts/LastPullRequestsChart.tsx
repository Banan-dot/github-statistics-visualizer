import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryGroup,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import PullRequest from "../../models/PullRequest";
import {
  addDays,
  format,
  isBefore,
  max,
  min,
  parseISO,
  startOfDay,
} from "date-fns";
import { PRIMARY, SUCCESS } from "../../utils/chartsTheme";

type Props = {
  data: PullRequest[];
};

const initializeMap = (minDate: Date, maxDate: Date) => {
  const map = new Map<string, number>();
  let current = minDate;
  while (isBefore(current, maxDate)) {
    map.set(format(current, "yyyy-MM-dd"), 0);
    current = addDays(current, 1);
  }
  return map;
};

const getOpenedPullRequestsData = (
  data: PullRequest[],
  minDate: Date,
  maxDate: Date
) => {
  const map = initializeMap(minDate, maxDate);
  data.forEach((pullRequest) => {
    const key = pullRequest.createdAt.split("T")[0];
    const value = map.get(key) ?? 0;
    map.set(key, value + 1);
  });
  return transformMapToXY(map);
};

const getClosedPullRequestsData = (
  data: PullRequest[],
  minDate: Date,
  maxDate: Date
) => {
  const map = initializeMap(minDate, maxDate);
  data.forEach((pullRequest) => {
    if (pullRequest.closedAt) {
      const key = pullRequest.closedAt.split("T")[0];
      const value = map.get(key) ?? 0;
      map.set(key, value + 1);
    }
  });
  return transformMapToXY(map);
};

const transformMapToXY = (map: Map<string, number>) => {
  return Array.from(map, ([key, value]) => ({ x: new Date(key), y: value }));
};

const getMinMaxDates = (data: PullRequest[]): [Date, Date] => {
  let dateSet = new Set<Date>();
  data.forEach((pullRequest) => {
    dateSet.add(getDate(pullRequest.createdAt));
    if (pullRequest.closedAt) {
      dateSet.add(getDate(pullRequest.closedAt));
    }
  });
  const dates = Array.from(dateSet);
  const minDate = min(dates);
  const maxDate = max(dates);
  return [minDate, maxDate];
};

const getDate = (iso: string) => {
  return startOfDay(parseISO(iso));
};

const LastPullRequestsChart = ({ data }: Props) => {
  const [minDate, maxDate] = useMemo(() => getMinMaxDates(data), [data]);

  const createdAtPullRequests = useMemo(
    () => getOpenedPullRequestsData(data, minDate, maxDate),
    [data, minDate, maxDate]
  );

  const closedAtPullRequests = useMemo(
    () => getClosedPullRequestsData(data, minDate, maxDate),
    [data, minDate, maxDate]
  );

  return (
    <VictoryChart
      padding={{ top: 40, right: 30, bottom: 50, left: 50 }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
      }
    >
      <VictoryGroup colorScale={[PRIMARY, SUCCESS]}>
        <VictoryLine data={createdAtPullRequests} />
        <VictoryLine data={closedAtPullRequests} />
      </VictoryGroup>

      <VictoryAxis
        style={{
          grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
        }}
        tickFormat={(tick: Date) => format(tick, "dd.MM")}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
        }}
      />
    </VictoryChart>
  );
};

export default LastPullRequestsChart;
