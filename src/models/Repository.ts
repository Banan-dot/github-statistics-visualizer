import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import Languages from "./Languages";

interface Repository {
  id: string;
  name: string;
  isFork: boolean;
  forkCount: number;
  stargazerCount: number;
  url: string;
  owner: RepositoryOwner;
  languages: Languages;
  primaryLanguage: Language | null;
}

export default Repository;
