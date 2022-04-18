import React from "react";
import { LineCountResponse } from "./RepositoryLineCountInfo";
import DataLabel from "../../../shared/DataLabel";
import LanguagesLabel from "../../../shared/LanguagesLabel";

type Props = {
  item: LineCountResponse;
};

const LineCountItem = ({ item }: Props) => {
  const { language, linesOfCode, blanks, files } = item;
  return (
    <div key={language} className="line-count-item">
      <h4 className="line-count-item__label">
        {" "}
        {language === "Total" ? "Всего по репозиторию" : language}
      </h4>
      <LanguagesLabel
        className="line-count-item-label__linesOfCode"
        value={linesOfCode}
        caption="Строки"
      />
      <LanguagesLabel
        className="line-count-item-label__blanks"
        value={blanks}
        caption="Пробелы"
      />
      <LanguagesLabel
        className="line-count-item-label__files"
        value={files}
        caption="Файлы"
      />
    </div>
  );
};

export default LineCountItem;
