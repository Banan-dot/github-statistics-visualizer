import LanguageEdge from "../models/LanguageEdge";
import Repository from "../models/Repository";

export type LanguagesInfo = {
  langEdges: LanguageEdge[];
  totalSize: number;
};

export function getMostUsedLanguage(languagesFrequency: LanguageEdge[]) {
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

export function getLanguagesInfo(repositories: Repository[] | undefined) {
  let totalSize = 0;
  const langEdges: Record<string, LanguageEdge> = {};
  repositories?.forEach((repository) => {
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
