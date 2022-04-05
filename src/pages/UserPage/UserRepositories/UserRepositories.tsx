import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

import RepositoryOwner from "../../../models/RepositoryOwner";
import UserRepositoriesList from "./UserRepositoriesList";
import { Center, Spinner } from "@skbkontur/react-ui";
import PageCard from "../../../shared/PageCard";

const GET_USER_REPOSITORIES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 10, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          id
          name
          isFork
          forkingAllowed
          forkCount
          stargazerCount
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
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Список репозиториев</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && (
          <Center>
            <Spinner caption="Загрузка репозиториев" />
          </Center>
        )}

        {error && <div>Ошибка загрузки репозиториев</div>}

        {data && (
          <UserRepositoriesList
            repositories={data.repositoryOwner.repositories}
          />
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default UserRepositories;
