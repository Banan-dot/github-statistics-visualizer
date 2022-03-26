import React from "react";
import { useQuery } from "react-apollo";
import { getGithubInformationByUsernameQuery } from "../utils/graphiqlQuries";

type UserInfoProps = {
  username: string;
};

function getCommonInfo(data: any) {
    const owner = data["repositoryOwner"];
    const name = owner["name"];
    const login = owner["login"];
    const organization = owner["organization"];
    const email = owner["email"];
    const websiteUrl = owner["websiteUrl"];
    const location = owner["location"];
    const avatarUrl = owner["avatarUrl"];

    return (
        <div className="common-user-info">
            <h3>Common user information:</h3>
            {avatarUrl && <img src={avatarUrl} alt="userAvatar" width={200} height={200}/>}
            {name && <p>Name: {owner["name"]}</p>}
            {login && <p>Login: {owner["login"]}</p>}
            {organization && <p>Organization: {owner["organization"]}</p>}
            {email && <p>Email: {owner["email"]}</p>}
            {websiteUrl && <p>Website: {owner["websiteUrl"]}</p>}
            {location && <p>Location: {owner["location"]}</p>}
        </div>
    );
}

export default function UserInfo({ username }: UserInfoProps) {
  const { loading, data, error } = useQuery(
    getGithubInformationByUsernameQuery(),
    {
      variables: { login: username },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error {error.message}</div>;
  if (data["repositoryOwner"] !== null) return <div>{getCommonInfo(data)}</div>;
  return null;
}
