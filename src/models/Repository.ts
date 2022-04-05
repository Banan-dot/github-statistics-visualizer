import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import Languages from "./Languages";
import Fork from "./Fork";
import Issue from "./Issue";
import PullRequest from "./PullRequest";
import BranchRef from "./BranchRef";
import LicenseInfo from "./LicenseInfo";

interface Repository {
  id: string;
  name: string;
  isFork: boolean;
  forkCount: number;
  stargazerCount: number;
  url: string;
  owner: RepositoryOwner;
  forks: Fork;
  issues: Issue;
  defaultBranchRef: BranchRef;
  pullRequests: PullRequest;
  languages: Languages;
  primaryLanguage: Language | null;
  licenseInfo: LicenseInfo | null;
}

export default Repository;
