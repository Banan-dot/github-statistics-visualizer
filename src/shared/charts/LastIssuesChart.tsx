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
import Issue from "../../models/Issue";
import { format } from "date-fns";
import { PRIMARY, SUCCESS } from "../../utils/chartsTheme";
import { getClosedAtData, getCreatedAtData } from "../../utils/charts";

type Props = {
  data: Issue[];
};

const COLOR_SCALE = [PRIMARY, SUCCESS];

const LastIssuesChart = ({ data }: Props) => {
  const createdAtPullRequests = useMemo(() => getCreatedAtData(data), [data]);
  const closedAtPullRequests = useMemo(() => getClosedAtData(data), [data]);

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
        x={80}
        title="Последние ишью"
        orientation="horizontal"
        centerTitle
        gutter={40}
        data={[{ name: "Открытые ишью" }, { name: "Закрытые ишью" }]}
        colorScale={COLOR_SCALE}
      />
    </VictoryChart>
  );
};

export default LastIssuesChart;
