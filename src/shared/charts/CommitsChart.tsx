import React, { useMemo } from "react";
import { format } from "date-fns";
import {
  VictoryAxis,
  VictoryChart,
  VictoryClipContainer,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";
import Commit from "../../models/Commit";
import { getData } from "../../utils/charts";
import { PRIMARY, theme } from "../../utils/chartsTheme";
import VictoryEmptyMessage from "./components/VictoryEmptyMessage";

type Props = {
  data: Commit[];
  width: number;
};

const CommitsChart = ({ data, width }: Props) => {
  const pushedDateData = useMemo(() => getData(data, "pushedDate"), [data]);
  const hasItems = pushedDateData.length > 0;

  return (
    <VictoryChart
      padding={{ top: 25, right: 30, bottom: 25, left: 50 }}
      height={200}
      width={width}
      scale={{ y: "linear", x: "time" }}
      theme={theme}
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
    >
      {!hasItems && (
        <VictoryEmptyMessage x={width / 2 + 20} y={100} text="Список коммитов пустой" />
      )}

      {hasItems && (
        <VictoryGroup data={pushedDateData} color={PRIMARY}>
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
        x={Math.max(width / 2 - 60, 0)}
        title="Последние коммиты"
        orientation="horizontal"
        centerTitle
        data={[]}
      />
    </VictoryChart>
  );
};

export default CommitsChart;
