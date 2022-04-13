import React, { useMemo, useState } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
} from "victory";
import { DomainTuple } from "victory-core";
import PullRequest from "../../models/PullRequest";
import { subMonths } from "date-fns";

type Props = {
  data: PullRequest[];
};

type ZoomDomain = {
  x: DomainTuple;
};

const getMapFromData = (data: PullRequest[]) => {
  const map = new Map<string, number>();
  data.forEach((pullRequest) => {
    const key = pullRequest.createdAt.split("T")[0];
    const value = map.get(key) ?? 0;
    map.set(key, value + 1);
  });
  return map;
};

const transformMapToArray = (map: Map<string, number>) => {
  return Array.from(map, ([key, value]) => ({ key: new Date(key), value }));
};

const CreatedPullRequestChart = ({ data }: Props) => {
  const [zoomDomain, setZoomDomain] = useState<ZoomDomain>({
    x: [subMonths(new Date(), 1), new Date()],
  });

  const chartData = useMemo(() => {
    const map = getMapFromData(data);
    return transformMapToArray(map);
  }, [data]);

  return (
    <VictoryChart
      padding={30}
      scale={{ x: "time" }}
      containerComponent={
        <VictoryZoomContainer
          zoomDimension="x"
          zoomDomain={zoomDomain}
          onZoomDomainChange={setZoomDomain}
        />
      }
    >
      <VictoryLine
        data={chartData}
        x="key"
        y="value"
        style={{
          data: { strokeWidth: 1 },
        }}
      />
      <VictoryAxis
        style={{
          grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
        }}
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

export default CreatedPullRequestChart;
