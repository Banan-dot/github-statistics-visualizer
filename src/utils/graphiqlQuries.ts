import gql from "graphql-tag";

const organizationByUsernameQuery = `
      organization(login: $login) {
        id
        name
      }
`;

const languagesQuery = `
      languages(first: 5, orderBy: {field: SIZE, direction: ASC}) {
        edges {
          languageSize: size
          node {
            languageName: name
          }
        }
      }
`;

const repositoriesByUsernameQuery = `
      repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}) {
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

export const getGithubInformationByUsernameQuery = () =>
  gql(String.raw`
        query Login($login: String!) {
          ${userInfoByUsernameQuery}
        }
  `);
