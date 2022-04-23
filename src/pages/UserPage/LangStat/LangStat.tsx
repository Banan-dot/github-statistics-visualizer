import React from "react";
import { useQuery, gql } from "@apollo/client";

import RepositoryOwner from "../../../models/RepositoryOwner";
import Repositories from "../../../models/Repositories";
import LanguageEdge from "../../../models/LanguageEdge";

import LanguagesPieChart from "../../../shared/charts/LanguagesPieChart";
import PageCard from "../../../shared/PageCard";
import LanguagesLabel from "../../../shared/LanguagesLabel";
import DataLabel from "../../../shared/DataLabel";

const GET_USER_LANGUAGES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
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
        }
      }
    }
  }
`;

function getMostUsedLanguage(languagesFrequency: LanguageEdge[]) {
  let max = 0;
  let mostRepeatedLanguage = "";
  languagesFrequency.forEach((edge) => {
    if (max < edge.size) {
      max = edge.size;
      mostRepeatedLanguage = edge.node.name;
    }
  });
  return mostRepeatedLanguage;
}

function getLanguagesInfo(repositories: Repositories) {
  let totalSize = 0;
  const langEdges: Record<string, LanguageEdge> = {};
  repositories.nodes.forEach((repository) => {
    totalSize += repository.languages.totalSize;
    repository.languages.edges.forEach((language: LanguageEdge) => {
      let langName = language.node.name;
      langEdges[langName] = {
        size: (langEdges[langName]?.size || 0) + language.size,
        node: {
          id: language.node.id,
          color: language.node.color,
          name: langName,
        },
      };
    });
  });

  return {
    langEdges: Object.values(langEdges).sort((a, b) => b.size - a.size),
    totalSize: totalSize,
  };
}

function renderStatistic(langEdges: LanguageEdge[], totalSize: number) {
  const mostRepeatedLanguage = getMostUsedLanguage(langEdges);
  return (
    <div className="user-languages__languages-information">
      <DataLabel
        className="user-languages__languages-result-size"
        caption={"Итоговый размер"}
        value={(totalSize / 1024).toFixed(1) + " MB"}
      />
      {langEdges.map((edge) => (
        <LanguagesLabel
          key={edge.node.name}
          caption={edge.node.name}
          value={((edge.size / totalSize) * 100).toFixed(2) + "%"}
        />
      ))}
      <DataLabel
        className="user-languages__most-used-language"
        caption={"Наиболее используемый язык"}
        value={mostRepeatedLanguage}
      />
    </div>
  );
}

type Props = {
  login: string;
};

type RepositoriesData = {
  repositoryOwner: RepositoryOwner;
};

type RepositoriesVars = {
  login: string;
};

const LangStat = ({ login }: Props) => {
  const { loading, data, error } = useQuery<RepositoriesData, RepositoriesVars>(
    GET_USER_LANGUAGES,
    {
      variables: {
        login,
      },
    }
  );

  if (!data || data.repositoryOwner === null) return <div>Нет данных</div>;
  const { langEdges, totalSize } = getLanguagesInfo(
    data.repositoryOwner.repositories
  );

  const isSizeMoreThanPercent = (size: number, percents: number) =>
    (size / totalSize) * 100 > percents;

  const languagesToViewChart = langEdges.filter((lang) =>
    isSizeMoreThanPercent(lang.size, 1)
  );

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Статистика языков</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-languages">
        {loading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки языков: {error.message}</div>}
        {data && (
          <div className="user-languages__language-stat">
            {renderStatistic(langEdges, totalSize)}
            <LanguagesPieChart
              languageEdges={languagesToViewChart}
              className="user-languages__languages-pie-chart"
            />
          </div>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default LangStat;
