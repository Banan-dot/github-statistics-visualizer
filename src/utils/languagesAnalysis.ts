import LanguageEdge from "../models/LanguageEdge";
import Repository from "../models/Repository";
import { formatToLocaleString } from "./number.helper";

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

export const formatFileSize = (sizeInKB: number) => {
  const units = ["KB", "MB", "GB", "TB"];
  const lastIndex = units.length - 1;
  let unitIndex = 0;
  let currentSize = sizeInKB;

  while (currentSize > 1024) {
    if (unitIndex >= lastIndex) {
      return `>1 ${units[lastIndex]}`;
    }
    unitIndex += 1;
    currentSize /= 1024;
  }
  const fractionDigitsCount = unitIndex === 0 ? 0 : 2;
  return `${formatToLocaleString(currentSize, fractionDigitsCount)} ${
    units[unitIndex]
  }`;
};
