import PageCard from "../../../shared/PageCard";
import React, { useEffect, useState } from "react";
import LineCountItem from "./LineCountItem";

type Props = {
  login: string;
  repositoryName: string;
};

export type LineCountResponse = {
  language: string;
  files: number;
  lines: number;
  blanks: number;
  comments: number;
  linesOfCode: number;
};

const RepositoryLineCountInfo = ({ login, repositoryName }: Props) => {
  const [lineCountInfo, setLineCountInfo] = useState<LineCountResponse[]>([]);

  useEffect(() => {
    fetch(`https://api.codetabs.com/v1/loc?github=${login}/${repositoryName}`)
      .then((response) => response.json())
      .then((data) => setLineCountInfo(data.reverse()));
  }, []);

  return (
    <PageCard
      element="section"
      className="line-count-section repository-page__section"
    >
      <PageCard.Header>
        <PageCard.Title>Количество строк в репозитории</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="repository-page__line-count-info">
        {lineCountInfo.length === 0 && <div>Загрузка...</div>}
        {lineCountInfo.map((item, index) => (
          <LineCountItem item={item} key={index}/>
        ))}
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryLineCountInfo;
