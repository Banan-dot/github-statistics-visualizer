import React from "react";
import { useQuery } from "react-apollo";
import { getGithubInformationByUsernameQuery } from "../utils/graphiqlQuries";
import { getStatistics } from "../utils/statistic";

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
