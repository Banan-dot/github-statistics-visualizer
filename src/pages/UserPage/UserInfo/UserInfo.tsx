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
    <PageCard
      element="section"
      className="user-page__section user-page__common-info"
    >
      <PageCard.Header>
        <PageCard.Title>Информация о пользователе {user.login}</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        <img
          src={user.avatarUrl}
          className="user-page__avatar"
          alt="user-avatar"
          width={"150px"}
          height={"150px"}
        />
        {user.name && <span className="user-page__name">Имя: {user.name}</span>}
        {user.company && (
          <span className="user-page__company">Компания: {user.company}</span>
        )}
        {user.email && (
          <span className="user-page__email">Почта: {user.email}</span>
        )}
        {user.websiteUrl && (
          <span className="user-page__website">Сайт: {user.websiteUrl}</span>
        )}
        {user.location && (
          <span className="user-page__location">
            Местонахождение: {user.location}
          </span>
        )}
        <span className="user-page__github-link">
          <a href={user.url}>Перейти на github</a>{" "}
        </span>
        <span className="user-page__created-date">
          Создан: {createdData.toLocaleString()}
        </span>
        <span className="user-page__following-count">
          Подписки: {following.totalCount}
        </span>
        <span className="user-page__followers-count">
          Подписчики: {followers.totalCount}
        </span>
      </PageCard.Body>
    </PageCard>
  );
};

export default UserInfo;
