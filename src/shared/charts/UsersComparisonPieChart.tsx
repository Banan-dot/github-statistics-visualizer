import React from "react";
import {
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
} from "victory";
import { DANGER, PRIMARY } from "../../utils/chartsTheme";

type ChartData = {
  x: string;
  y: number;
};

type Props = {
  data: ChartData[];
  title: string;
  legendX?: number;
};

const COLOR_SCALE = [PRIMARY, DANGER];
const WIDTH = 300;
const HEIGHT = 325;

const UsersComparisonPieChart = ({ data, title, legendX = 0 }: Props) => {
  const isAnyData = data.some((dataItem) => dataItem.y > 0);

  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <VictoryLegend
        standalone={false}
        x={legendX}
        gutter={20}
        orientation="horizontal"
        title={title}
        centerTitle
        colorScale={COLOR_SCALE}
        data={data.map((dataItem) => ({ name: dataItem.x }))}
        style={{ title: { fontSize: 16 }, data: { margin: "0 auto" } }}
        containerComponent={<VictoryContainer width={WIDTH} />}
      />

      {isAnyData ? (
        <VictoryPie
          standalone={false}
          padding={{ top: 80, right: 50, bottom: 30, left: 50 }}
          width={WIDTH}
          height={HEIGHT}
          padAngle={2}
          innerRadius={75}
          radius={100}
          data={data}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel />}
          colorScale={COLOR_SCALE}
        />
      ) : (
        <VictoryLabel
          x={150}
          y={HEIGHT / 2}
          textAnchor="middle"
          text="Нет данных"
        />
      )}
    </svg>
  );
};

export default UsersComparisonPieChart;
