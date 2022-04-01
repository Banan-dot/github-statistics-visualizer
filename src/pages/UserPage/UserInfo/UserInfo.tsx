import React from "react";
import User from "../../../models/User";

type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { followers, following } = user;

  return (
    <section className="page-card user-page__section">
      <div className="page-card__header">
        <div className="page-card__header-title">Информация о пользователе:</div>
      </div>
      <div className="page-card__body">
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
      </div>
    </section>
  );
};

export default UserInfo;
