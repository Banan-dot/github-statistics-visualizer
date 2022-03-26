import React from 'react';
import gql from 'graphql-tag';

import { useQuery } from 'react-apollo';

const organizationByUsernameQuery = `
      organization(login: $login) {
        id
        name
      }
`;

const languagesQuery = `
      languages(first: 5, orderBy: {field: SIZE, direction: ASC}) {
        edges {
          LanguageSize: size
          node {
            LanguageName: name
          }
        }
      }
`;

const repositoriesByUsernameQuery = `
      repositories(first: 4, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          forkCount
          url
          sshUrl
          stargazerCount

          ${languagesQuery}
        }
      }
`;
// collaborators {
//   totalCount
//   nodes {
//     login
//   }
// }
const userInfoByUsernameQuery = `
      repositoryOwner(login: $login) {
        ... on User{
            login
          name
          email
          location
          avatarUrl
          websiteUrl
          ${organizationByUsernameQuery}
          ${repositoriesByUsernameQuery}
        }
      }
`;

const getGithubInformationByUsernameQuery = () =>
    gql(String.raw`
        query Login($login: String!) {
          ${userInfoByUsernameQuery}
        }
  `);

type UserInfoProps = {
    username: string;
};

export default function UserInfo({ username }: UserInfoProps) {
    const { loading, data, error } = useQuery(getGithubInformationByUsernameQuery(), {
        variables: { login: username }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <div>Error {error.message}</div>;
    if (data["repositoryOwner"] !== null) return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
    return null;
}
