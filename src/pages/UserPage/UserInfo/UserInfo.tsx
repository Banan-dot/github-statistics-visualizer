import React from "react";
import User from "../../../models/User";
import PageCard from "../../../shared/PageCard";

type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { followers, following } = user;
  let createdData = new Date(user.createdAt);
  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Информация о пользователе {user.login}</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {user.name && (
          <img src={user.avatarUrl} alt="userAvatar" width={200} height={200} />
        )}
        {user.name && <p>Имя: {user.name}</p>}
        {user.company && <p>Компания: {user.company}</p>}
        {user.email && <p>Почта: {user.email}</p>}
        {user.websiteUrl && <p>Сайт: {user.websiteUrl}</p>}
        {user.location && <p>Местонахождение: {user.location}</p>}
        <p>Создан: {createdData.toLocaleString()}</p>
        <p>Подписки: {following.totalCount}</p>
        <p>Подписчики: {followers.totalCount}</p>
      </PageCard.Body>
    </PageCard>
  );
};

export default UserInfo;
