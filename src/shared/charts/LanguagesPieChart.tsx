import React, { useMemo } from "react";
import { VictoryPie, VictoryTooltip } from "victory";
import LanguageEdge from "../../models/LanguageEdge";
import LanguageLabel from "../LanguageLabel";

type LanguagesPieChartProps = {
  languageEdges: LanguageEdge[];
  className?: string;
};

const LanguagesPieChart = ({
  languageEdges,
  className,
}: LanguagesPieChartProps) => {
  const colorScale = languageEdges.map(
    (languageEdge) => languageEdge.node.color
  );

  const data = useMemo(
    () =>
      languageEdges.map((edge) => {
        return { x: edge.node.name, y: edge.size };
      }),
    [languageEdges]
  );

  return (
    <div className={`languages-pie-chart ${className ?? ""}`}>
      <svg width={350} height={350} viewBox="0 0 350 350">
        <VictoryPie
          padding={50}
          width={350}
          height={350}
          colorScale={colorScale}
          data={data}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
          standalone={false}
        />
      </svg>

      <div className="languages-pie-chart__languages-list">
        <h4>Список языков</h4>
        {languageEdges.map((edge) => (
          <LanguageLabel
            name={edge.node.name}
            color={edge.node.color}
            key={edge.node.id}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguagesPieChart;
