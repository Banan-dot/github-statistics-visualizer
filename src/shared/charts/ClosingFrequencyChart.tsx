import React, { useMemo } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLegendProps,
} from "victory";
import Issue from "../../models/Issue";
import PullRequest from "../../models/PullRequest";
import { getFrequencyData } from "../../utils/charts";
import { PRIMARY, theme } from "../../utils/chartsTheme";
import VictoryEmptyMessage from "./components/VictoryEmptyMessage";

type Props = {
  legendProps: VictoryLegendProps;
  emptyMessage: string;
  data: (Issue | PullRequest)[];
};

const ClosingFrequencyChart = ({ data, emptyMessage, legendProps }: Props) => {
  const frequencyData = useMemo(() => getFrequencyData(data), [data]);
  const hasItems = frequencyData.length > 0;

  return (
    <VictoryChart
      width={500}
      theme={theme}
      domainPadding={30}
      padding={{ top: 25, right: 25, bottom: 25, left: 50 }}
    >
      {!hasItems && <VictoryEmptyMessage x={250} y={150} text={emptyMessage} />}

      {hasItems && (
        <VictoryBar
          data={frequencyData}
          style={{ data: { fill: PRIMARY } }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={0} />}
        />
      )}

      <VictoryAxis
        style={{
          tickLabels: { opacity: hasItems ? 1 : 0 },
        }}
      />
      <VictoryAxis
        style={{
          tickLabels: { opacity: hasItems ? 1 : 0 },
        }}
        dependentAxis
      />

      <VictoryLegend
        orientation="horizontal"
        centerTitle
        data={[]}
        {...legendProps}
      />
    </VictoryChart>
  );
};

export default ClosingFrequencyChart;
