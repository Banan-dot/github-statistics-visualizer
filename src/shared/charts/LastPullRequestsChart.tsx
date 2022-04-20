import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryGroup,
  VictoryTooltip,
  VictoryLegend,
  createContainer,
  VictoryVoronoiProps,
  VictoryZoomContainerProps,
  VictoryScatter,
  VictoryLabel,
} from "victory";
import PullRequest from "../../models/PullRequest";
import { format } from "date-fns";
import { PRIMARY, SUCCESS, theme } from "../../utils/chartsTheme";
import { getData } from "../../utils/charts";

type Props = {
  data: PullRequest[];
};

const VictoryZoomVoronoiContainer = createContainer<
  VictoryVoronoiProps,
  VictoryZoomContainerProps
>("zoom", "voronoi");

const LastPullRequestsChart = ({ data }: Props) => {
  const createdAtPullRequests = useMemo(
    () => getData(data, "createdAt"),
    [data]
  );
  const closedAtPullRequests = useMemo(() => getData(data, "closedAt"), [data]);

  const hasItems =
    createdAtPullRequests.length > 0 || closedAtPullRequests.length > 0;

  return (
    <VictoryChart
      padding={{ top: 60, right: 30, bottom: 50, left: 50 }}
      scale={{ y: "linear", x: "time" }}
      minDomain={{ y: 0 }}
      containerComponent={<VictoryZoomVoronoiContainer zoomDimension="x" />}
      theme={theme}
    >
      {!hasItems && (
        <VictoryLabel
          verticalAnchor="middle"
          textAnchor="middle"
          style={{ fontSize: 16, fontWeight: "bold" }}
          x={230}
          y={150}
          text="Список пулл реквестов пустой"
        />
      )}

      {createdAtPullRequests.length > 0 && (
        <VictoryGroup data={createdAtPullRequests} color={PRIMARY}>
          <VictoryLine />
          <VictoryScatter
            size={({ datum }) => (datum.y > 0 ? 3 : 0)}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      )}

      {closedAtPullRequests && (
        <VictoryGroup data={closedAtPullRequests} color={SUCCESS}>
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
        style={{
          tickLabels: { opacity: hasItems ? 1 : 0 },
        }}
        dependentAxis
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
        colorScale={[PRIMARY, SUCCESS]}
      />
    </VictoryChart>
  );
};

export default LastPullRequestsChart;
