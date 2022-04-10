import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Repository from "../../models/Repository";

const GET_REPOSITORY = gql`
  query GetRepository($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      id
      name
    }
  }
`;

type RepositoryData = {
  repository: Repository;
};

type RepositoryVars = {
  login: string;
  repositoryName: string;
};

const RepositoryPage = () => {
  const { login, repositoryName } = useParams();
  const [getRepository, { data }] = useLazyQuery<
    RepositoryData,
    RepositoryVars
  >(GET_REPOSITORY);

  useEffect(() => {
    if (login && repositoryName) {
      getRepository({
        variables: {
          login,
          repositoryName,
        },
      });
    }
  }, [getRepository, login, repositoryName]);

  return <div className="repository-page">{data?.repository.name}</div>;
};

export default RepositoryPage;
