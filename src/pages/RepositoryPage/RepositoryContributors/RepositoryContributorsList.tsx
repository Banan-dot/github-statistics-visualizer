import React from "react";
import { RepositoryContributor } from ".";
import RepositoryContributorsListItem from "./RepositoryContributorsListItem";

type Props = {
  contributors: RepositoryContributor[];
};

const RepositoryContributorsList = ({ contributors }: Props) => {
  return (
    <div className="repository-contributors">
      {contributors.map((contributor) => (
        <RepositoryContributorsListItem
          contributor={contributor}
          key={contributor.id}
        />
      ))}
    </div>
  );
};

export default RepositoryContributorsList;
