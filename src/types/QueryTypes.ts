import Repository from "../models/Repository";

export type RepositoryData = {
  repository: Repository;
};

export type RepositoryVars = {
  login: string;
  repositoryName: string;
};
