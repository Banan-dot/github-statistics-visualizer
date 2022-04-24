import ENDPOINTS from "./endpoints";

const authorizedHeader = {
  Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
};

export const getRepositoryContributors = async (
  login: string,
  repositoryName: string
) => {
  return fetch(
    `${ENDPOINTS.GITHUB_REST_API}/repos/${login}/${repositoryName}/contributors`,
    {
      headers: authorizedHeader,
    }
  ).then((response) => response.json());
};
