import React, { useEffect, useState } from "react";
import { RepositoryItemProps } from ".";
import { RepositoryData, RepositoryVars } from "../../types/QueryTypes";
import { gql, useQuery } from "@apollo/client";
import PageCard from "../../shared/PageCard";
import LanguagesChartWrapper from "./ChartWrappers/LanguagesChartWrapper";
import LanguagesStatistic from "../../shared/LanguagesStatistic";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";
import { getLanguagesInfo, LanguagesInfo } from "../../utils/languagesAnalysis";

const GET_REPOSITORY_LANGUAGES = gql`
  query GetRepositoryLanguages($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
        totalSize
        edges {
          size
          node {
            color
            id
            name
          }
        }
      }
      diskUsage
    }
  }
`;

const RepositoryLanguageStats = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const [languagesInfo, setLanguagesInfo] = useState<LanguagesInfo>({
    langEdges: [],
    totalSize: 0,
  });
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_REPOSITORY_LANGUAGES,
    {
      variables: {
        login,
        repositoryName,
      },
    }
  );

  useEffect(() => {
    if (data?.repository) {
      setLanguagesInfo(getLanguagesInfo([data.repository]));
    }
  }, [data]);

  return (
    <PageCard element="section" className={className}>
      <PageCard.Header>
        <PageCard.Title>Статистика языков</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрузка информации о языках репозитория"
          />
        )}

        {error && (
          <Alert type="danger">
            Возникла ошибка при загрузки языков репозитория
          </Alert>
        )}

        {data && !loading && (
          <div className="repository-languages">
            <LanguagesStatistic
              classNamePrefix="repository-languages"
              languageEdges={languagesInfo.langEdges}
              totalLanguagesSize={languagesInfo.totalSize}
              totalFilesSize={data.repository.diskUsage ?? 0}
            />
            <LanguagesChartWrapper
              className="repository-languages__languages_chart"
              login={login}
              repositoryName={repositoryName}
            />
          </div>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryLanguageStats;
