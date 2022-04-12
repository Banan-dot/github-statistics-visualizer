import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import LanguageConnection from "./LanguageConnection";
import Fork from "./Fork";
import IssueConnection from "./IssueConnection";
import PullRequestConnection from "./PullRequestConnection";
import DefaultBranchRef from "./DefaultBranchRef";
import LicenseInfo from "./LicenseInfo";
import RepositoryCollaboratorConnection from "./RepositoryCollaboratorConnection";

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
  forks: Fork;
  issues: IssueConnection;
  defaultBranchRef: DefaultBranchRef;
  updatedAt: string;
  createdAt: string;
  pullRequests: PullRequestConnection;
  collaborators: RepositoryCollaboratorConnection;
  languages: LanguageConnection;
  primaryLanguage: Language | null;
  licenseInfo: LicenseInfo | null;
  parent: Repository;
}

export default Repository;
