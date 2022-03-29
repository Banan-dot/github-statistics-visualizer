import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import RepositoryOwner from "../../../models/RepositoryOwner";
import Repositories from "../../../models/Repositories";

const GET_USER_LANGUAGES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 100, affiliations: OWNER) {
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

function getMostUsedLanguage(
  languagesFrequency: Map<string, LangFrequencyValue>
) {
  let max = 0;
  let mostRepeatedLanguage = "";
  languagesFrequency.forEach((value, key) => {
    if (max < value.size) {
      max = value.size;
      mostRepeatedLanguage = key;
    }
  });
  return mostRepeatedLanguage;
}

function hashFnv32a(str: string) {
  let i,
    l,
    hval = 0x811c9dc5;

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return hval >>> 0;
}

type LangFrequencyValue = { size: number; id: string };

function getLanguagesInfo(repositories: Repositories) {
  const languagesFrequency = new Map<string, LangFrequencyValue>();
  let totalSize = 0;

  repositories.nodes.forEach((repository) => {
    totalSize += repository.languages.totalSize;
    repository.languages.edges.forEach((language) => {
      let langName = language.node.name;
      let value = {
        size: (languagesFrequency.get(langName)?.size || 0) + language.size,
        id: language.node.id,
      };
      languagesFrequency.set(langName, value);
    });
  });

  return { languagesFrequency: languagesFrequency, totalSize: totalSize };
}

function renderStatistic(repositories: Repositories) {
  const { languagesFrequency, totalSize } = getLanguagesInfo(repositories);

  const mostRepeatedLanguage = getMostUsedLanguage(languagesFrequency);

  return (
    <div className="user-language-stats">
      <h3>Статистика языков:</h3>
      <p>Размеры:</p>
      {Array.from(languagesFrequency).map(([langName, value]) => (
        <span key={hashFnv32a(value.id + value.size)}>
          {langName}: {value.size} KB &nbsp;
        </span>
      ))}
      <h4>Вывод:</h4>
      <p>
        Итоговый размер языков в сумме по репозиториям: {totalSize} KB or{" "}
        {(totalSize / 1024).toFixed(1)} MB
      </p>
      {Array.from(languagesFrequency).map(([langName, value]) => (
        <span key={hashFnv32a(value.id + value.size)}>
          {langName}: {((value.size / totalSize) * 100).toFixed(2)}% &nbsp;
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

  return (
    <div>
      <div>Список языков:</div>
      <div>
        {loading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки языков: {error.message}</div>}
        {data && renderStatistic(data.repositoryOwner.repositories)}
      </div>
    </div>
  );
};

export default LangStat;
