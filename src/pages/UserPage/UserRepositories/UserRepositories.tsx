import React from "react";
import { useQuery, gql, NetworkStatus } from "@apollo/client";

import RepositoryOwner from "../../../models/RepositoryOwner";
import UserRepositoriesList from "./UserRepositoriesList";
import { Spinner, Gapped, Loader } from "@skbkontur/react-ui";
import PageCard from "../../../shared/PageCard";
import NavigateButtons from "../../../shared/NavigateButtons";
import Alert from "../../../shared/Alert";

const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories(
    $login: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    repositoryOwner(login: $login) {
      id
      repositories(
        first: $first
        last: $last
        after: $after
        before: $before
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          id
          name
          isFork
          forkingAllowed
          forkCount
          stargazerCount
          url
          sshUrl
          updatedAt
          primaryLanguage {
            id
            name
            color
          }
          owner {
            id
            login
          }
          licenseInfo {
            id
            name
          }
          parent {
            id
            url
            name
            owner {
              id
              login
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
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
  first?: number;
  last?: number;
  before?: string | null;
  after?: string | null;
};

const ITEMS_COUNT = 10;

const UserRepositories = ({ login }: Props) => {
  const { data, error, networkStatus, fetchMore } = useQuery<
    RepositoriesData,
    RepositoriesVars
  >(GET_USER_REPOSITORIES, {
    variables: {
      login,
      first: ITEMS_COUNT,
    },
    notifyOnNetworkStatusChange: true,
  });

  const repositories = data?.repositoryOwner.repositories;

  const toPrevCursor = () => {
    fetchMore({
      variables: {
        login,
        last: ITEMS_COUNT,
        before: data?.repositoryOwner.repositories.pageInfo.startCursor,
        first: undefined,
        after: undefined,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return fetchMoreResult ?? previousQueryResult;
      },
    });
  };

  const toNextCursor = () => {
    fetchMore({
      variables: {
        login,
        first: ITEMS_COUNT,
        after: data?.repositoryOwner.repositories.pageInfo.endCursor,
        last: undefined,
        before: undefined,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return fetchMoreResult ?? previousQueryResult;
      },
    });
  };

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Список репозиториев</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {networkStatus === NetworkStatus.loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрузка репозиториев"
          />
        )}

        {error && <Alert type="danger">Ошибка загрузки репозиториев</Alert>}

        {repositories && (
          <Loader active={networkStatus === NetworkStatus.fetchMore}>
            <Gapped gap={16} vertical>
              <UserRepositoriesList repositories={repositories} />
              <NavigateButtons
                onNextButtonClick={toNextCursor}
                onPrevButtonClick={toPrevCursor}
                disabledNextButton={!repositories.pageInfo.hasNextPage}
                disabledPrevButton={!repositories.pageInfo.hasPreviousPage}
              />
            </Gapped>
          </Loader>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default UserRepositories;
