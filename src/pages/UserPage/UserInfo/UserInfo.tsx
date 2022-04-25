import React, { useState } from "react";
import User from "../../../models/User";
import PageCard from "../../../shared/PageCard";
import { Link, Button } from "@skbkontur/react-ui";
import YaMap from "./Map/Map";
import UserAvatar from "../../../shared/UserAvatar";

type UserInfoProps = {
  className?: string;
  user: User;
};

const UserInfo = ({ className, user }: UserInfoProps) => {
  const { followers, following } = user;
  const { location } = user;
  const createdData = new Date(user.createdAt);
  const [showMap, setShowMap] = useState(false);

  return (
    <PageCard element="section" className={className}>
      <PageCard.Header>
        <PageCard.Title>Информация о пользователе {user.login}</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-common-info">
        {user.avatarUrl && (
          <UserAvatar
            src={user.avatarUrl}
            className="user-common-info__avatar"
            size="100%"
          />
        )}
        {user.name && (
          <span className="user-common-info__name">Имя: {user.name}</span>
        )}
        {user.company && (
          <span className="user-common-info__company">
            Компания: {user.company}
          </span>
        )}
        {user.email && (
          <span className="user-common-info__email">Почта: {user.email}</span>
        )}
        {user.websiteUrl && (
          <span className="user-page__website">
            Сайт:{" "}
            <a href={user.websiteUrl} target="_blank" rel="noreferrer">
              {user.websiteUrl}
            </a>{" "}
          </span>
        )}
        {location && (
          <div className="user-common-info__location-info">
            <p className="user-common-info__location">
              Местонахождение: {location}
            </p>
            <Button size="small" onClick={() => setShowMap(!showMap)}>
              Показать на карте
            </Button>
          </div>
        )}
        {showMap && (
          <YaMap location={location} className="user-common-info__map" />
        )}
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
