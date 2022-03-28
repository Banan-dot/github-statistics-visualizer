import React from "react";
import { useQuery } from "react-apollo";
import { getGithubInformationByUsernameQuery } from "../utils/graphiqlQuries";

function getCommonInfo(data: any) {
  const owner = data["repositoryOwner"];

  return (
    <div className="common-user-info">
      <h3>Common user information:</h3>
      {owner.avatarUrl && (
        <img src={owner.avatarUrl} alt="userAvatar" width={200} height={200} />
      )}
      {owner.name && <p>Name: {owner.name}</p>}
      {owner.login && <p>Login: {owner.login}</p>}
      {owner.organization && <p>Organization: {owner.organization}</p>}
      {owner.email && <p>Email: {owner.email}</p>}
      {owner.websiteUrl && <p>Website: {owner.websiteUrl}</p>}
      {owner.location && <p>Location: {owner.location}</p>}
    </div>
  );
}

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

function getMostUsedLanguage(languagesFrequency: Map<string, number>){
  let max = 0;
  let mostRepeatedLanguage = '';

  for (let [lang, size] of languagesFrequency.entries()) {
    if (size > max) {
      max = size;
      mostRepeatedLanguage = lang;
    }
  }
  return mostRepeatedLanguage;
}

function getStatistics(reposInfo: RepositoriesInfoType) {
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
      <h4>
        Most used language: {mostRepeatedLanguage}
      </h4>
    </div>
  );
}

type UserInfoProps = {
  username: string;
};

export default function UserInfo({ username }: UserInfoProps) {
  const { loading, data, error } = useQuery(
    getGithubInformationByUsernameQuery(),
    {
      variables: { login: username },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error {error.message}</div>;
  if (data["repositoryOwner"] !== null)
    return (
      <div>
        {getCommonInfo(data)}
        {getStatistics(data.repositoryOwner.repositories.nodes)}
      </div>
    );
  return null;
}
