import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryVoronoiContainer,
} from "victory";
import UserActivity from "../../models/UserActivity";

const transformDataToXY = (usersActivity: UserActivity[]) => {
  const makeXYArray = (userActivity: UserActivity) => {
    return Object.keys(userActivity).map((key) => ({
      x: key,
      y: userActivity[key],
    }));
  };

  return usersActivity.map((userActivity) => makeXYArray(userActivity));
};

type Props = {
  usersActivity: UserActivity[];
  className: string;
};

const UserActivityPolarChart = ({ usersActivity, className }: Props) => {
  const data = transformDataToXY(usersActivity);

  return (
    <svg viewBox="0 0 325 325" width="325" className={className}>
      <VictoryChart
        width={300}
        height={300}
        standalone={false}
        polar
        containerComponent={
          <VictoryVoronoiContainer labels={({ datum }) => datum.y} />
        }
      >
        <VictoryGroup
          style={{ data: { fillOpacity: 0.2, strokeWidth: 1 } }}
          colorScale={["blue", "red", "green"]}
        >
          {data.map((dataItem, index) => (
            <VictoryArea key={index} data={dataItem} />
          ))}
        </VictoryGroup>

        {data[0].map((dataItem, index) => (
          <VictoryPolarAxis
            dependentAxis
            style={{
              axisLabel: { padding: 10 },
              axis: { stroke: "none" },
              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
            }}
            axisValue={index + 1}
            tickFormat={() => ""}
            key={index}
          />
        ))}

        <VictoryPolarAxis
          labelPlacement="vertical"
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "grey", opacity: 0.5 },
          }}
        />
      </VictoryChart>
    </svg>
  );
};

export default UserActivityPolarChart;
