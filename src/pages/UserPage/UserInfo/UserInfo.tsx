import React, { useState } from "react";
import User from "../../../models/User";
import PageCard from "../../../shared/PageCard";
import { Link, Button } from "@skbkontur/react-ui";
import YaMap from "./Map/Map";
import UserAvatar from "../../../shared/UserAvatar";
type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { followers, following } = user;
  const createdData = new Date(user.createdAt);
  const { location } = user;
  const [showMap, setShowMap] = useState(false);

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Информация о пользователе {user.login}</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-common-info">
        <UserAvatar
          src={user.avatarUrl}
          className="user-common-info__avatar"
          size="100%"
        />
        {user.name && <span className="user-common-info__name">Имя: {user.name}</span>}
        {user.company && (
          <span className="user-common-info__company">Компания: {user.company}</span>
        )}
        {user.email && (
          <span className="user-common-info__email">Почта: {user.email}</span>
        )}
        {user.websiteUrl && (
          <span className="user-common-info__website">Сайт: {user.websiteUrl}</span>
        )}
        {location && (
          <div className="user-common-info__location-info">
            <p className="user-common-info__location">Местонахождение: {location}</p>
            <Button size="small" onClick={() => setShowMap(!showMap)}>
              Показать на карте
            </Button>
          </div>
        )}
        {showMap && <YaMap location={location} className="user-common-info__map" />}
        <Link href={user.url} className="user-common-info__github-link">
          <Button size="medium">Перейти на GitHub</Button>
        </Link>
        <span className="user-common-info__created-date">
          Создан: {createdData.toLocaleString()}
        </span>
        <span className="user-common-info__following-count">
          Подписки: {following.totalCount}
        </span>
        <span className="user-common-info__followers-count">
          Подписчики: {followers.totalCount}
        </span>
      </PageCard.Body>
    </PageCard>
  );
};

export default UserInfo;
