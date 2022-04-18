import React from "react";
import { LineCountResponse } from "./RepositoryLineCountInfo";
import DataLabel from "../../../shared/DataLabel";

type Props = {
  item: LineCountResponse;
};

const LineCountItem = ({ item }: Props) => {
  const { language, linesOfCode, blanks, files } = item;
  return (
    <div key={language}>
      <DataLabel
        className="line-count-item-label"
        value={language === "Total" ? "Всего по репозиторию" : language}
        caption={""}
      >
        <DataLabel
          className="line-count-item-label__linesOfCode"
          value={linesOfCode}
          caption="Строки"
        />
        <DataLabel
          className="line-count-item-label__blanks"
          value={blanks}
          caption="Пробелы"
        />
        <DataLabel
          className="line-count-item-label__files"
          value={files}
          caption="Файлы"
        />
      </DataLabel>
    </div>
  );
};

export default LineCountItem;
