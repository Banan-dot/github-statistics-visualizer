import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import Languages from "./Languages";
import Fork from "./Fork";
import Issue from "./Issues";
import PullRequests from "./PullRequests";
import BranchRef from "./BranchRef";
import LicenseInfo from "./LicenseInfo";
import Issues from "./Issues";

interface Repository {
  id: string;
  name: string;
  isFork: boolean;
  forkingAllowed: boolean;
  forkCount: number;
  stargazerCount: number;
  url: string;
  sshUrl: string;
  owner: RepositoryOwner;
  defaultBranchRef: BranchRef;
  updatedAt: string;
  languages: Languages;
  primaryLanguage: Language | null;
  licenseInfo: LicenseInfo | null;
  parent: Repository;
  forks: Fork;
  pullRequests: PullRequests;
  issues: Issues;
}

export default Repository;
