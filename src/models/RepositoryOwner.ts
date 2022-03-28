import Repositories from "./Repositories";

interface RepositoryOwner {
  id: string;
  login: string;
  repositories: Repositories;
}

export default RepositoryOwner;
