import React from "react";
import Repositories from "../../../models/Repositories";
import UserRepositoriesListItem from "./UserRepositoriesListItem";

type Props = {
  repositories: Repositories;
};

const UserRepositoriesList = ({ repositories }: Props) => {
  return (
    <ul className="user-repository-list">
      {repositories.nodes.map((repository) => (
        <UserRepositoriesListItem repository={repository} key={repository.id} />
      ))}
    </ul>
  );
};

export default UserRepositoriesList;
