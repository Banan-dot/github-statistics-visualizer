import React, { useMemo } from "react";
import { VictoryChart, VictoryLine } from "victory";
import Commit from "../../models/Commit";
import { getData } from "../../utils/charts";

type Props = {
  data: Commit[];
};

const CommitsChart = ({ data }: Props) => {
  const pushedDateData = useMemo(() => getData(data, "pushedDate"), [data]);

  return (
    <VictoryChart>
      <VictoryLine data={pushedDateData} />
    </VictoryChart>
  );
};

export default CommitsChart;
