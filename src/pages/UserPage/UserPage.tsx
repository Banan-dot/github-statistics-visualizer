import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import User from "../../models/User";
import UserInfo from "./UserInfo/UserInfo";
import UserRepositories from "./UserRepositories/UserRepositories";
import LangStat from "./LangStat/LangStat";
import UserActivity from "./UserActivity/UserActivity";

const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      id
      name
      login
      url
      avatarUrl
      url
      bio
      company
      location
      email
      websiteUrl
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

type UserData = {
  user: User;
};

type UserVars = {
  login: string | undefined;
};

function UserPage() {
  const { login } = useParams();
  const { loading, data, error } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { login },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error {error.message}</div>;

  if (!login) return <div>Введите логин пользователя</div>;
  if (!data) return <div>Неожиданная ошибка</div>;

  return (
    <div className="user-page">
      <UserInfo user={data.user} />
      <LangStat login={login} />
      <UserRepositories login={login} />
      <UserActivity login={login} />
    </div>
  );
}

export default UserPage;
