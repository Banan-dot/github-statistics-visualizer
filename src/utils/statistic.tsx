import React from "react";

type RepositoriesInfoType = Array<{
  name: string;
  languages: {
    edges: Array<{
      languageSize: number;
      node: {
        languageName: string;
      };
    }>;
  };
}>;

export function getMostUsedLanguage(languagesFrequency: Map<string, number>) {
  let max = 0;
  let mostRepeatedLanguage = "";

  for (let [lang, size] of languagesFrequency.entries()) {
    if (size > max) {
      max = size;
      mostRepeatedLanguage = lang;
    }
  }
  return mostRepeatedLanguage;
}

export function getStatistics(reposInfo: RepositoriesInfoType) {
  if (Object.keys(reposInfo).length <= 1) return null;
  const languagesFrequency = new Map<string, number>();
  let totalSize = 0;

  reposInfo.forEach((node) => {
    let languagesEdges = node.languages.edges;
    languagesEdges.forEach((edge) => {
      let langName = edge.node.languageName;
      totalSize += edge.languageSize;
      languagesFrequency.set(
        langName,
        (languagesFrequency.get(langName) || 0) + edge.languageSize
      );
    });
  });

  const mostRepeatedLanguage = getMostUsedLanguage(languagesFrequency);

  return (
    <div className="user-language-stats">
      <h3>Languages statistic:</h3>
      <p>Sizes:</p>
      {Array.from(languagesFrequency).map(([key, value]) => (
        <span key={key}>
          {key}: {value} &nbsp;
        </span>
      ))}
      <h4>Summary:</h4>
      <p>Total size: {totalSize}</p>
      {Array.from(languagesFrequency).map(([key, value]) => (
        <span key={key}>
          {key}: {((value / totalSize) * 100).toFixed(2)}% &nbsp;
        </span>
      ))}
      <h4>Most used language: {mostRepeatedLanguage}</h4>
    </div>
  );
}
