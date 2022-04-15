import React from "react";
import Repository from "../../../models/Repository";
import {
  HistoryIcon,
  LawIcon,
  RepoForkedIcon,
  StarIcon,
} from "@primer/octicons-react";
import IconDataLabel from "../../../shared/IconDataLabel";
import LanguageLabel from "../../../shared/LanguageLabel";
import {
  Link,
  Button,
  Dropdown,
  MenuHeader,
  MenuSeparator,
} from "@skbkontur/react-ui";
import InputWithCopyButton from "../../../shared/InputWithCopyButton";
import { formatDistance, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
  repository: Repository;
};

const UserRepositoriesListItem = ({ repository }: Props) => {
  const {
    name,
    forkCount,
    isFork,
    stargazerCount,
    primaryLanguage,
    owner,
    licenseInfo,
    url,
    sshUrl,
    forkingAllowed,
    parent,
    updatedAt,
  } = repository;

  const repositoryInfoLink = `/user/${owner.login}/repository/${repository.name}`;
  const gitUrl = `${url}.git`;
  const formattedISO = formatDistance(parseISO(updatedAt), Date.now(), {
    locale: ru,
  });

  return (
    <li className="user-repository user-repository-list__item">
      <div className="user-repository__main-info">
        <div>
          <div className="user-repository__title">
            <Link
              className="user-repository__name-link"
              href={repositoryInfoLink}
            >
              {name}
            </Link>
            {primaryLanguage && (
              <LanguageLabel
                name={primaryLanguage.name}
                color={primaryLanguage.color}
              />
            )}
          </div>
          <div className="user-repository__fork-info">
            {isFork && parent && (
              <span>
                <span>Форк от </span>
                <Link href={parent.url} target="_blank">
                  {parent.owner.login}/{parent.name}
                </Link>
              </span>
            )}
          </div>
        </div>
        <div className="user-repository__action-buttons">
          {forkingAllowed && (
            <Link
              className="user-repository__action-button"
              href={url}
              target="_blank"
            >
              <Button width="100%">Сделать форк</Button>
            </Link>
          )}
          <Dropdown
            className="dropdown user-repository__action-button"
            caption="Клонировать"
            menuAlign="right"
          >
            <MenuHeader>
              <div className="dropdown__input-label">HTTPS</div>
              <InputWithCopyButton defaultValue={gitUrl} />
            </MenuHeader>
            <MenuSeparator></MenuSeparator>
            <MenuHeader>
              <div className="dropdown__input-label">SSH</div>
              <InputWithCopyButton defaultValue={sshUrl} />
            </MenuHeader>
          </Dropdown>
        </div>
      </div>

      <div className="user-repository__label-list">
        <IconDataLabel
          icon={HistoryIcon}
          value={formattedISO}
          hintText="Последнее изменение"
        />
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
          <IconDataLabel
            icon={LawIcon}
            value={licenseInfo.name}
            hintText="Лицензия"
          />
        )}
      </div>
    </li>
  );
};

export default UserRepositoriesListItem;
