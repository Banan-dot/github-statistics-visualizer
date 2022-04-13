import React from "react";
import { VictoryLabel, VictoryLegend, VictoryPie } from "victory";

interface States {
  [name: string]: number;
}

type PullRequestChartProps = {
  className: string;
  pullRequestsInfo: States & {
    totalCount: number;
  };
};

const states = ["OPEN", "CLOSED", "MERGED"];

const PullRequestChart = ({
  className,
  pullRequestsInfo,
}: PullRequestChartProps) => {
  const pieData: { x: string; y: number }[] = [];
  states.forEach((state) => {
    if (pullRequestsInfo[state] !== 0)
      pieData.push({
        x: state,
        y: pullRequestsInfo[state],
      });
  });

  return (
    <svg viewBox="0 0 300 300" className={className}>
      <VictoryPie
        padding={30}
        colorScale={"cool"}
        data={pieData}
        standalone={false}
        width={300}
        height={300}
        innerRadius={50}
        labelRadius={75}
        style={{ labels: { fontSize: 14, fill: "white" } }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 14 }}
        x={150}
        y={150}
        text="Pull Requests"
      />
    </svg>
  );
};

export default PullRequestChart;