import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

import RepositoryOwner from "../../../models/RepositoryOwner";
import UserRepositoriesList from "./UserRepositoriesList";
import { Center, Spinner, Gapped, Loader } from "@skbkontur/react-ui";
import PageCard from "../../../shared/PageCard";
import NavigateButtons from "../../../shared/NavigateButtons";
import { NetworkStatus } from "apollo-client-preset";

const GET_USER_REPOSITORIES = gql`
  query (
    $login: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    repositoryOwner(login: $login) {
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
          primaryLanguage {
            name
            color
          }
          owner {
            login
          }
          licenseInfo {
            name
          }
          parent {
            url
            name
            owner {
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
  const { data, error, networkStatus, refetch } = useQuery<
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
    refetch({
      login,
      last: ITEMS_COUNT,
      before: data?.repositoryOwner.repositories.pageInfo.startCursor,
      first: undefined,
      after: undefined,
    });
  };

  const toNextCursor = () => {
    refetch({
      login,
      first: ITEMS_COUNT,
      after: data?.repositoryOwner.repositories.pageInfo.endCursor,
      last: undefined,
      before: undefined,
    });
  };

  return (
    <PageCard element="section" className="user-page__section">
      <PageCard.Header>
        <PageCard.Title>Список репозиториев</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {networkStatus === NetworkStatus.loading && (
          <Center>
            <Spinner caption="Загрузка репозиториев" />
          </Center>
        )}

        {error && <div>Ошибка загрузки репозиториев</div>}

        {repositories && (
          <Loader active={networkStatus === NetworkStatus.setVariables}>
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
