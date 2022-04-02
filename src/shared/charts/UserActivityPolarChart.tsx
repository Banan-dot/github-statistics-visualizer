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
};

const UserActivityPolarChart = ({ usersActivity }: Props) => {
  const data = transformDataToXY(usersActivity);

  return (
    <div style={{ width: 400, height: 400 }}>
      <VictoryChart
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
    </div>
  );
};

export default UserActivityPolarChart;
