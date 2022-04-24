import React from "react";
import { RepositoryContributor } from ".";
import UserAvatar from "../../../shared/UserAvatar";
import { Link } from "react-router-dom";

type Props = {
  contributor: RepositoryContributor;
};

const RepositoryContributorsListItem = ({ contributor }: Props) => {
  const { avatar_url, login, contributions } = contributor;

  return (
    <Link
      to={`/user/${login}`}
      className="repository-contributor repository-contributors__item"
    >
      <div className="repository-contributor__info">
        <UserAvatar src={avatar_url} size={32} />
        <div>{login}</div>
      </div>
      <div className="repository-contributor__contributions-count">
        {contributions}
      </div>
    </Link>
  );
};

export default RepositoryContributorsListItem;
