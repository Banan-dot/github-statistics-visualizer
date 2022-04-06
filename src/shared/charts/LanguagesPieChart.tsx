import React from "react";
import { VictoryPie } from "victory";
import LanguageEdge from "../../models/LanguageEdge";

type LanguagesPieChartProps = {
  languageEdges: LanguageEdge[];
  className: string;
};

const LanguagesPieChart = ({ languageEdges, className }: LanguagesPieChartProps) => {
  const colorScale = languageEdges.map(
    (languageEdge) => languageEdge.node.color
  );

  return (
    <div style={{ width: 300, height: 300 }} className={className}>
      <VictoryPie
        data={languageEdges}
        colorScale={colorScale}
        x={(languageEdge: LanguageEdge) => languageEdge.node.name}
        y={(languageEdge: LanguageEdge) => languageEdge.size}
      />
    </div>
  );
};

export default LanguagesPieChart;
