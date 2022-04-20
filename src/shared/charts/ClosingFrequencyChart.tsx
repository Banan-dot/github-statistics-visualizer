import React, { useMemo } from "react";
import { VictoryBar, VictoryChart, VictoryLabel } from "victory";
import Issue from "../../models/Issue";
import PullRequest from "../../models/PullRequest";
import { getFrequencyData } from "../../utils/charts";
import { PRIMARY, theme } from "../../utils/chartsTheme";

type Props = {
  legendTitle?: string;
  emptyMessage?: string;
  data: (Issue | PullRequest)[];
};

const ClosingFrequencyChart = ({ data }: Props) => {
  const frequencyData = useMemo(() => getFrequencyData(data), [data]);

  return (
    <VictoryChart
      width={500}
      theme={theme}
      domainPadding={30}
      padding={{ top: 20, right: 20, bottom: 20, left: 50 }}
    >
      <VictoryBar
        data={frequencyData}
        style={{ data: { fill: PRIMARY }, labels: { fill: "#fff" } }}
        labels={({ datum }) => datum.y}
        labelComponent={<VictoryLabel dy={30} />}
      />
    </VictoryChart>
  );
};

export default ClosingFrequencyChart;
