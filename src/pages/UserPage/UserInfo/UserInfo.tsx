import React from "react";
import User from "../../../models/User";

type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { followers, following } = user;

  return (
    <div>
      <h3>Информация о пользователе:</h3>
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
  );
};

export default UserInfo;
