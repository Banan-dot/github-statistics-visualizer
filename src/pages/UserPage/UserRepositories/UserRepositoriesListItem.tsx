import React from "react";
import Repository from "../../../models/Repository";
import { LawIcon, RepoForkedIcon, StarIcon } from "@primer/octicons-react";
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
  } = repository;

  const repositoryInfoLink = `user/${owner.login}/repository/${repository.name}`;
  const gitUrl = `${url}.git`;

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
            <Link href={url} target="_blank">
              <Button>Сделать форк</Button>
            </Link>
          )}
          <Dropdown caption="Клонировать" menuAlign="right" menuWidth={300}>
            <MenuHeader>
              <div>HTTPS</div>
              <InputWithCopyButton defaultValue={gitUrl} inputWidth={250} />
            </MenuHeader>
            <MenuSeparator></MenuSeparator>
            <MenuHeader>
              <div>SSH</div>
              <InputWithCopyButton defaultValue={sshUrl} inputWidth={250} />
            </MenuHeader>
          </Dropdown>
        </div>
      </div>

      <div className="user-repository__label-list">
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
