import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryGroup,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLegend,
} from "victory";
import PullRequest from "../../models/PullRequest";
import { format } from "date-fns";
import { PRIMARY, SUCCESS } from "../../utils/chartsTheme";
import { getData } from "../../utils/charts";

type Props = {
  data: PullRequest[];
};

const COLOR_SCALE = [PRIMARY, SUCCESS];

const LastPullRequestsChart = ({ data }: Props) => {
  const createdAtPullRequests = useMemo(
    () => getData(data, "createdAt"),
    [data]
  );
  const closedAtPullRequests = useMemo(() => getData(data, "closedAt"), [data]);

  return (
    <VictoryChart
      padding={{ top: 60, right: 30, bottom: 50, left: 50 }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
      }
    >
      <VictoryGroup colorScale={COLOR_SCALE}>
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
      <VictoryLegend
        x={30}
        title="Последние пулл реквесты"
        orientation="horizontal"
        centerTitle
        gutter={40}
        data={[
          { name: "Открытые пулл реквесты" },
          { name: "Закрытые пулл реквесты" },
        ]}
        colorScale={COLOR_SCALE}
      />
    </VictoryChart>
  );
};

export default LastPullRequestsChart;
