import PageCard from "../../shared/PageCard";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "../../models/User";
import UserInfo from "../UserPage/UserInfo/UserInfo";
import { Button, Link, Spinner } from "@skbkontur/react-ui";
import UserAvatar from "../../shared/UserAvatar";
import YaMap from "../UserPage/UserInfo/Map/Map";

const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      login
      avatarUrl
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

type Props = {
  login: string;
};

type UserData = {
  user: User;
};

type UserVars = {
  login: string | undefined;
};

const CommonUserInfo = ({ login }: Props) => {
  const { loading, data, error } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { login },
  });
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
        Ошибка, пользователя с ником {login} не существует, попробуйте снова.
      </div>
    );

  if (!data) return <div>Неожиданная ошибка</div>;
  const { followers, following } = data.user;
  const createdData = new Date(data.user.createdAt);

  return (
    <PageCard element="section" className="user-comparison__section">
      <PageCard.Header>
        <PageCard.Title>
          Информация о пользователе {data.user.login}
        </PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-comparison-info">
        {data.user.avatarUrl && (
          <UserAvatar
            src={data.user.avatarUrl}
            className="user-comparison-info__avatar"
            size="100%"
          />
        )}
        <span className="user-comparison-info__created-date">
          Создан: {createdData.toLocaleString()}
        </span>
        <span className="user-comparison-info__following-count">
          Подписки: {following.totalCount}
        </span>
        <span className="user-comparison-info__followers-count">
          Подписчики: {followers.totalCount}
        </span>
      </PageCard.Body>
    </PageCard>
  );
};

export default CommonUserInfo;
