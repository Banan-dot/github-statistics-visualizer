import React from "react";
import User from "../../../models/User";
import PageCard from "../../../shared/PageCard";

type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { followers, following } = user;

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Информация о пользователе</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        <img src={user.avatarUrl} alt="userAvatar" width={200} height={200} />
        <p>Имя: {user.name}</p>
        <p>Логин: {user.login}</p>
        <p>Компания: {user.company}</p>
        <p>Почта: {user.email}</p>
        <p>Сайт: {user.websiteUrl}</p>
        <p>Местонахождение: {user.location}</p>
        <p>Создан: {user.createdAt}</p>
        <p>Подписки: {following.totalCount}</p>
        <p>Подписчики: {followers.totalCount}</p>
      </PageCard.Body>
    </PageCard>
  );
};

export default UserInfo;
