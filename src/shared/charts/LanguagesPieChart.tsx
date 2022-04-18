import React, { useEffect, useState } from "react";
import { VictoryLegend, VictoryPie } from "victory";
import LanguageEdge from "../../models/LanguageEdge";

type LanguagesPieChartProps = {
  languageEdges: LanguageEdge[];
  className?: string;
};

type GraphicData = {
  y: number;
};

const LanguagesPieChart = ({
  languageEdges,
  className,
}: LanguagesPieChartProps) => {
  const colorScale = languageEdges.map(
    (languageEdge) => languageEdge.node.color
  );

  const defaultGraphicData: GraphicData[] = [];

  const legendLanguagesNames = languageEdges.map((edge) => {
    defaultGraphicData.push({ y: 0 });
    return {
      name: edge.node.name,
    };
  });
  defaultGraphicData.pop();
  defaultGraphicData.push({ y: 100 });
  const [graphicData, setGraphicData] =
    useState<GraphicData[]>(defaultGraphicData);

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
        animate={{ easing: "expInOut" }}
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
