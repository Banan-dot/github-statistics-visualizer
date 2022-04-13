import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import LanguageConnection from "./LanguageConnection";
import IssueConnection from "./IssueConnection";
import PullRequestConnection from "./PullRequestConnection";
import DefaultBranchRef from "./DefaultBranchRef";
import LicenseInfo from "./LicenseInfo";
import RepositoryCollaboratorConnection from "./RepositoryCollaboratorConnection";
import RepositoryConnection from "./RepositoryConnection";

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
  defaultBranchRef: DefaultBranchRef;
  updatedAt: string;
  createdAt: string;
  languages: LanguageConnection;
  primaryLanguage: Language | null;
  licenseInfo: LicenseInfo | null;
  parent: Repository;
  forks: RepositoryConnection;
  issues: IssueConnection;
  pullRequests: PullRequestConnection;
  collaborators: RepositoryCollaboratorConnection;
}

export default Repository;
