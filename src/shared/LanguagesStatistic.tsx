import React from "react";
import LanguageEdge from "../models/LanguageEdge";
import {
  formatFileSize,
  getMostUsedLanguage,
} from "../utils/languagesAnalysis";
import DataLabel from "./DataLabel";
import LanguagesLabel from "./LanguagesLabel";

type Props = {
  classNamePrefix: string;
  languageEdges: LanguageEdge[];
  totalLanguagesSize: number;
  totalFilesSize: number;
};

const formatPercentage = (percentage: number) => {
  return percentage >= 1 ? percentage.toFixed(2) + "%" : "< 1%";
};

const LanguagesStatistic = ({
  classNamePrefix,
  languageEdges,
  totalLanguagesSize,
  totalFilesSize,
}: Props) => {
  const mostRepeatedLanguage = getMostUsedLanguage(languageEdges);

  return (
    <div className={`${classNamePrefix}__languages-information`}>
      <DataLabel
        className={`${classNamePrefix}__languages-result-size`}
        caption="Итоговый размер файлов"
        value={formatFileSize(totalFilesSize)}
      />
      {languageEdges.map((edge) => {
        const percentage = (edge.size * 100) / totalLanguagesSize;

        return (
          <LanguagesLabel
            className={`${classNamePrefix}__languages-label`}
            key={edge.node.name}
            caption={edge.node.name}
            value={formatPercentage(percentage)}
            title={`${percentage}%`}
          />
        );
      })}
      <DataLabel
        className={`${classNamePrefix}__most-used-language`}
        caption="Наиболее используемый язык"
        value={mostRepeatedLanguage}
      />
    </div>
  );
};

export default LanguagesStatistic;
