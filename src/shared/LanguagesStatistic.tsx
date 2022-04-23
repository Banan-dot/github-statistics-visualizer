import React from "react";
import LanguageEdge from "../models/LanguageEdge";
import { getMostUsedLanguage } from "../utils/languagesAnalysis";
import DataLabel from "./DataLabel";
import LanguagesLabel from "./LanguagesLabel";

type Props = {
  classNamePrefix: string;
  languageEdges: LanguageEdge[];
  totalSize: number;
};

const LanguagesStatistic = ({
  classNamePrefix,
  languageEdges,
  totalSize,
}: Props) => {
  const mostRepeatedLanguage = getMostUsedLanguage(languageEdges);

  return (
    <div className={`${classNamePrefix}__languages-information`}>
      <DataLabel
        className={`${classNamePrefix}__languages-result-size`}
        caption="Итоговый размер файлов"
        value={(totalSize / 1024).toFixed(1) + " MB"}
      />
      {languageEdges.map((edge) => (
        <LanguagesLabel
          className={`${classNamePrefix}__languages-label`}
          key={edge.node.name}
          caption={edge.node.name}
          value={((edge.size / totalSize) * 100).toFixed(2) + "%"}
        />
      ))}
      <DataLabel
        className={`${classNamePrefix}__most-used-language`}
        caption="Наиболее используемый язык"
        value={mostRepeatedLanguage}
      />
    </div>
  );
};

export default LanguagesStatistic;
