import Repositories from "./Repositories";

interface RepositoryOwner {
  id: string;
  login: string;
  repositories: Repositories;
  avatarUrl: string;
}

export default RepositoryOwner;
