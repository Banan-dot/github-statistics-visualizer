import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryGroup,
  VictoryTooltip,
  VictoryLegend,
  VictoryScatter,
  VictoryClipContainer,
  VictoryZoomContainer,
} from "victory";
import Issue from "../../models/Issue";
import { format } from "date-fns";
import { PRIMARY, SUCCESS, theme } from "../../utils/chartsTheme";
import { getData } from "../../utils/charts";
import VictoryEmptyMessage from "./components/VictoryEmptyMessage";

type Props = {
  data: Issue[];
};

const LastIssuesChart = ({ data }: Props) => {
  const createdAtIssues = useMemo(() => getData(data, "createdAt"), [data]);
  const closedAtIssues = useMemo(() => getData(data, "closedAt"), [data]);

  const hasItems = createdAtIssues.length > 0 || closedAtIssues.length > 0;

  return (
    <VictoryChart
      padding={{ top: 60, right: 30, bottom: 50, left: 50 }}
      scale={{ y: "linear", x: "time" }}
      minDomain={{ y: 0 }}
      containerComponent={
        <VictoryZoomContainer
          zoomDimension="x"
          clipContainerComponent={
            <VictoryClipContainer
              clipPadding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            />
          }
        />
      }
      theme={theme}
    >
      {!hasItems && (
        <VictoryEmptyMessage x={230} y={150} text="Список ишью пустой" />
      )}

      {createdAtIssues.length > 0 && (
        <VictoryGroup data={createdAtIssues} color={PRIMARY}>
          <VictoryLine />
          <VictoryScatter
            size={({ datum }) => (datum.y > 0 ? 3 : 0)}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      )}

      {closedAtIssues.length > 0 && (
        <VictoryGroup data={closedAtIssues} color={SUCCESS}>
          <VictoryLine />
          <VictoryScatter
            size={({ datum }) => (datum.y > 0 ? 3 : 0)}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      )}

      <VictoryAxis
        style={{
          tickLabels: { opacity: hasItems ? 1 : 0 },
        }}
        tickFormat={(tick: Date) => format(tick, "dd.MM")}
      />
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: { opacity: hasItems ? 1 : 0 },
        }}
      />

      <VictoryLegend
        x={80}
        title="Последние ишью"
        orientation="horizontal"
        centerTitle
        gutter={40}
        data={[{ name: "Открытые ишью" }, { name: "Закрытые ишью" }]}
        colorScale={[PRIMARY, SUCCESS]}
      />
    </VictoryChart>
  );
};

export default LastIssuesChart;
