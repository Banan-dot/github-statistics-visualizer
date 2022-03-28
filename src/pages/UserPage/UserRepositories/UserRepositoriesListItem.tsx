import React from "react";
import Repository from "../../../models/Repository";

type Props = {
  repository: Repository;
};

const UserRepositoriesListItem = ({ repository }: Props) => {
  const { owner, primaryLanguage } = repository;

  return (
    <div>
      <hr />
      <div>Название: {repository.name}</div>
      <div>Владелец: {owner.login}</div>
      <div>Основной язык: {primaryLanguage?.name ?? "Нет данных"}</div>
      <div>Количество форков: {repository.forkCount}</div>
      <div>Форк: {repository.isFork ? "Да" : "Нет"}</div>
      <a href={repository.url} target="_blank" rel="noreferrer">
        Открыть на GitHub
      </a>
    </div>
  );
};

export default UserRepositoriesListItem;
