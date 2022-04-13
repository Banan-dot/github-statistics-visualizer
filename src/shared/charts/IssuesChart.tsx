import React from "react";
import { VictoryLabel, VictoryPie } from "victory";

type IssuesChartProps = {
  className: string;
  issuesInfo: { OPEN: number; CLOSED: number; totalCount: number };
};

const IssuesChart = ({ className, issuesInfo }: IssuesChartProps) => {
  const pieData = [];
  if (issuesInfo.OPEN !== 0)
    pieData.push({
      x: "OPEN",
      y: issuesInfo.OPEN,
    });
  if (issuesInfo.CLOSED !== 0)
    pieData.push({ x: "CLOSED", y: issuesInfo.CLOSED });

  return (
    <svg viewBox="0 0 300 300" className={className}>
      <VictoryPie
        padding={30}
        colorScale={"warm"}
        data={pieData}
        standalone={false}
        innerRadius={50}
        width={300}
        height={300}
        labelRadius={75}
        style={{ labels: { fontSize: 14, fill: "white" } }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20 }}
        x={150}
        y={150}
        text="Issues"
      />
    </svg>
  );
};

export default IssuesChart;
