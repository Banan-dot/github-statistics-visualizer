import PageCard from "../../../shared/PageCard";
import React, { useEffect, useState } from "react";
import LineCountItem from "./LineCountItem";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";
import { RepositoryItemProps } from "..";
import ENDPOINTS from "../../../api/endpoints";

export type LineCountResponse = {
  language: string;
  files: number;
  lines: number;
  blanks: number;
  comments: number;
  linesOfCode: number;
};

const RepositoryLineCountInfo = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const [lineCountInfo, setLineCountInfo] = useState<LineCountResponse[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${ENDPOINTS.LINE_COUNT_API}/loc?github=${login}/${repositoryName}`)
      .then((response) => response.json())
      .then((data) => setLineCountInfo(data.reverse()))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [login, repositoryName]);

  return (
    <PageCard
      element="section"
      className={`line-count-section ${className ?? ""}`}
    >
      <PageCard.Header>
        <PageCard.Title>Количество строк в репозитории</PageCard.Title>
      </PageCard.Header>
      {loading && (
        <Spinner
          className="spinner spinner_centered"
          caption="Загрузка информации о количестве строк в репозитории"
        />
      )}

      {error && (
        <Alert type="danger">
          Ошибка загрузки информации о количестве строк
        </Alert>
      )}

      {lineCountInfo && !loading && (
        <PageCard.Body className="repository-page__line-count-info">
          {lineCountInfo.map((item, index) => (
            <LineCountItem item={item} key={index} />
          ))}
        </PageCard.Body>
      )}
    </PageCard>
  );
};

export default RepositoryLineCountInfo;
