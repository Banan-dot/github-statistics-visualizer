import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

import RepositoryOwner from "../../../models/RepositoryOwner";
import Repositories from "../../../models/Repositories";
import LanguageEdge from "../../../models/LanguageEdge";

import LanguagesPieChart from "../../../shared/charts/LanguagesPieChart";
import PageCard from "../../../shared/PageCard";

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
    repository.languages.edges.forEach((language) => {
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
    langEdges: Object.values(langEdges),
    totalSize: totalSize,
  };
}

function renderStatistic(langEdges: LanguageEdge[], totalSize: number) {
  const mostRepeatedLanguage = getMostUsedLanguage(langEdges);
  return (
    <div>
      <h4>Размеры:</h4>
      {langEdges.map((edge) => (
        <span key={edge.node.id}>
          {edge.node.name}: {edge.size} KB &nbsp;
        </span>
      ))}
      <h4>Вывод:</h4>
      <p>
        Итоговый размер языков в сумме по репозиториям: {totalSize} KB or{" "}
        {(totalSize / 1024).toFixed(1)} MB
      </p>
      {langEdges.map((edge) => (
        <span key={edge.node.id}>
          {edge.node.name}: {((edge.size / totalSize) * 100).toFixed(2)}% &nbsp;
        </span>
      ))}
      <h4>Наиболее используемый язык: {mostRepeatedLanguage}</h4>
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

  if (!data) return <div>Нет данных</div>;

  const { langEdges, totalSize } = getLanguagesInfo(
    data.repositoryOwner.repositories
  );

  return (
    <PageCard element="section" className="page-card user-page__section">
      <PageCard.Header>
        <PageCard.Title>Статистика языков</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки языков: {error.message}</div>}
        {data && (
          <>
            {renderStatistic(langEdges, totalSize)}
            <LanguagesPieChart languageEdges={langEdges} />
          </>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default LangStat;
