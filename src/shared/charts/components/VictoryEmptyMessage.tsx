import React from "react";
import { VictoryLabel } from "victory";

type Props = {
  x: number;
  y: number;
  text: string;
};

const VictoryEmptyMessage = ({ x, y, text }: Props) => {
  return (
    <VictoryLabel
      verticalAnchor="middle"
      textAnchor="middle"
      style={{ fontSize: 16, fontWeight: "bold" }}
      x={x}
      y={y}
      text={text}
    />
  );
};

export default VictoryEmptyMessage;
