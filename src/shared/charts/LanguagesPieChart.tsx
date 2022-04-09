import React from "react";
import { VictoryLegend, VictoryPie } from "victory";
import LanguageEdge from "../../models/LanguageEdge";

type LanguagesPieChartProps = {
  languageEdges: LanguageEdge[];
  className: string;
};

const LanguagesPieChart = ({
  languageEdges,
  className,
}: LanguagesPieChartProps) => {
  const colorScale = languageEdges.map(
    (languageEdge) => languageEdge.node.color
  );

  const legendLanguagesNames = languageEdges.map((edge) => {
    return {
      name: edge.node.name,
    };
  });

  return (
    <div className={className}>
        <VictoryPie
          colorScale={colorScale}
          padding={0}
          data={languageEdges}
          x={(languageEdge: LanguageEdge) => languageEdge.node.name}
          y={(languageEdge: LanguageEdge) => languageEdge.size}
          labels={() => null}
        />
        <VictoryLegend
            width={300}
            x={50}
          orientation="vertical"
          colorScale={colorScale}
          gutter={30}
          title="Languages"
          centerTitle
          style={{
            border: { stroke: "#dcdde1", strokeWidth: "1px" },
            title: { fontSize: 20 },
          }}
          data={legendLanguagesNames}
        />
    </div>
  );
};

export default LanguagesPieChart;
