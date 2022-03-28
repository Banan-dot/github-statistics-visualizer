import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";

interface Repository {
  id: string;
  name: string;
  isFork: boolean;
  forkCount: number;
  stargazerCount: number;
  url: string;
  owner: RepositoryOwner;
  primaryLanguage: Language | null;
}

export default Repository;
