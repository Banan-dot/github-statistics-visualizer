import React from "react";
import Repository from "../../../models/Repository";
import { LawIcon, RepoForkedIcon, StarIcon } from "@primer/octicons-react";
import IconDataLabel from "../../../shared/IconDataLabel";
import LanguageLabel from "../../../shared/LanguageLabel";
import { Link } from "@skbkontur/react-ui";

type Props = {
  repository: Repository;
};

const UserRepositoriesListItem = ({ repository }: Props) => {
  const {
    name,
    forkCount,
    stargazerCount,
    primaryLanguage,
    owner,
    licenseInfo,
  } = repository;

  const repositoryInfoLink = `user/${owner.login}/repository/${repository.name}`;

  return (
    <li className="user-repository user-repository-list__item">
      <Link className="user-repository__name-link" href={repositoryInfoLink}>
        {name}
      </Link>
      <div className="user-repository__label-list">
        {primaryLanguage && (
          <LanguageLabel
            name={primaryLanguage.name}
            color={primaryLanguage.color}
          />
        )}
        <IconDataLabel
          icon={RepoForkedIcon}
          value={forkCount}
          hintText="Количество форков"
        />
        <IconDataLabel
          icon={StarIcon}
          value={stargazerCount}
          hintText="Количество звезд"
        />
        {licenseInfo && (
          <IconDataLabel icon={LawIcon} value={licenseInfo.name} />
        )}
      </div>
      {/* <div>Владелец: {owner.login}</div>
      <div>Основной язык: {primaryLanguage?.name ?? "Нет данных"}</div>
      <div>Количество форков: {repository.forkCount}</div>
      <div>Форк: {repository.isFork ? "Да" : "Нет"}</div>
      <a href={repository.url} target="_blank" rel="noreferrer">
        Открыть на GitHub
      </a> */}
    </li>
  );
};

export default UserRepositoriesListItem;
