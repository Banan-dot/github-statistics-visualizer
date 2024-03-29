import React, { useState } from "react";
import User from "../../../models/User";
import PageCard from "../../../shared/PageCard";
import { Link, Button } from "@skbkontur/react-ui";
import YaMap from "./Map/Map";
import UserAvatar from "../../../shared/UserAvatar";
import { format, formatDistance, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

type UserInfoProps = {
  className?: string;
  user: User;
};

const GITHUB_LINK = "https://github.com/";

const getCompanyLink = (companyName: string) =>
  GITHUB_LINK + companyName.slice(1);

const UserInfo = ({ className, user }: UserInfoProps) => {
  const { followers, following } = user;
  const { location } = user;
  const createdData = parseISO(user.createdAt);
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
            Компания:{" "}
            <a href={getCompanyLink(user.company)} target="_blank">
              {user.company.slice(1)}
            </a>
          </span>
        )}
        {user.email && (
          <span className="user-common-info__email">
            Почта: <a href={`mailto:${user.email}`}>{user.email}</a>
          </span>
        )}
        {user.websiteUrl && (
          <span className="user-common-info__website">
            Сайт:{" "}
            <a href={user.websiteUrl} target="_blank" rel="noreferrer">
              {user.websiteUrl}
            </a>{" "}
          </span>
        )}
        {location && (
          <>
            <div className="user-common-info__location-info">
              <p className="user-common-info__location">
                Местоположение: {location}
              </p>
            </div>
            <Button
              onClick={() => setShowMap(!showMap)}
              className="user-common-info__show-map-button"
            >
              {showMap ? "Скрыть карту" : "Показать на карте"}
            </Button>
          </>
        )}
        {showMap && (
          <YaMap location={location} className="user-common-info__map" />
        )}
        <Link href={user.url} target="_blank" className="user-common-info__github-link">
          <Button>Перейти на GitHub</Button>
        </Link>
        <span
          className="user-common-info__created-date"
          title={format(createdData, "dd.MM.yyyy HH:mm")}
        >
          Дата регистрации:{" "}
          {formatDistance(createdData, new Date(), {
            locale: ru,
            addSuffix: true,
          })}
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
