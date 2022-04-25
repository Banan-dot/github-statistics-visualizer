import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import User from "../../models/User";
import UserInfo from "./UserInfo/UserInfo";
import UserRepositories from "./UserRepositories/UserRepositories";
import LangStat from "./LangStat/LangStat";
import UserActivity from "./UserActivity/UserActivity";
import { Spinner } from "@skbkontur/react-ui";

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

  useEffect(() => {
    document.title = `Страница пользователя - ${login}`;
  }, [login]);

  if (loading)
    return (
      <Spinner
        className="spinner spinner_centered"
        caption="Загрузка информации о пользователе"
      />
    );

  if (error)
    return (
      <div className="user-page__search-error">
        Ошибка, пользователя с таким ником не существует, попробуйте снова.
      </div>
    );

  if (!login) return <div>Введите логин пользователя</div>;
  if (!data) return <div>Неожиданная ошибка</div>;

  return (
    <div className="user-page">
      <UserInfo className="user-page__section" user={data.user} />
      <LangStat className="user-page__section" login={login} />
      <UserRepositories className="user-page__section" login={login} />
      <UserActivity className="user-page__section" login={login} />
    </div>
  );
}

export default UserPage;
