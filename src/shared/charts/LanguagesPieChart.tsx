import React, { useEffect, useState } from "react";
import { VictoryLegend, VictoryPie } from "victory";
import LanguageEdge from "../../models/LanguageEdge";

type LanguagesPieChartProps = {
  languageEdges: LanguageEdge[];
  className?: string;
};

const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];


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

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  const fromLanguageEdgesToGraphData = (languageEdges: LanguageEdge[]) =>
    languageEdges.map((edge) => {
      return { x: edge.node.name, y: edge.size };
    });

  useEffect(() => {
    setGraphicData(fromLanguageEdgesToGraphData(languageEdges));
  }, []);

  return (
    <div className={className}>
      <VictoryPie
        colorScale={colorScale}
        padding={0}
        animate={{ easing: "back" }}
        data={graphicData}
        labels={() => null}
      />
      <VictoryLegend
        x={50}
        height={350}
        width={250}
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
