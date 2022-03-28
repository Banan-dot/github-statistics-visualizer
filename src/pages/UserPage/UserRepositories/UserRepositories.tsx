import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

import RepositoryOwner from "../../../models/RepositoryOwner";
import UserRepositoriesList from "./UserRepositoriesList";

const GET_USER_REPOSITORIES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 10, ownerAffiliations: OWNER) {
        nodes {
          id
          name
          isFork
          forkingAllowed
          forkCount
          url
          primaryLanguage {
            id
            name
            color
          }
          owner {
            id
            login
          }
        }
      }
    }
  }
`;

type Props = {
  login: string;
};

type RepositoriesData = {
  repositoryOwner: RepositoryOwner;
};

type RepositoriesVars = {
  login: string;
};

const UserRepositories = ({ login }: Props) => {
  const { loading, data, error } = useQuery<RepositoriesData, RepositoriesVars>(
    GET_USER_REPOSITORIES,
    {
      variables: {
        login,
      },
    }
  );

  return (
    <div>
      <div>Список репозиториев</div>
      <div>
        {loading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки репозиториев</div>}

        {data && (
          <UserRepositoriesList
            repositories={data.repositoryOwner.repositories}
          />
        )}
      </div>
    </div>
  );
};

export default UserRepositories;
