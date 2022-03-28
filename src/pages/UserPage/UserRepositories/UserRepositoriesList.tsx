import React from "react";
import Repositories from "../../../models/Repositories";
import UserRepositoriesListItem from "./UserRepositoriesListItem";

type Props = {
  repositories: Repositories;
};

const UserRepositoriesList = ({ repositories }: Props) => {
  return (
    <div>
      {repositories.nodes.map((repository) => (
        <UserRepositoriesListItem repository={repository} key={repository.id} />
      ))}
    </div>
  );
};

export default UserRepositoriesList;
