import Language from "./Language";
import RepositoryOwner from "./RepositoryOwner";
import LanguageConnection from "./LanguageConnection";
import IssueConnection from "./IssueConnection";
import PullRequestConnection from "./PullRequestConnection";
import DefaultBranchRef from "./DefaultBranchRef";
import LicenseInfo from "./LicenseInfo";
import RepositoryCollaboratorConnection from "./RepositoryCollaboratorConnection";
import RepositoryConnection from "./RepositoryConnection";
import UserConnection from "./UserConnection";
import RefConnection from "./RefConnection";
import Ref from "./Ref";

interface Repository {
  id: string;
  name: string;
  isFork: boolean;
  forkingAllowed: boolean;
  forkCount: number;
  description: string;
  stargazerCount: number;
  url: string;
  sshUrl: string;
  owner: RepositoryOwner;
  defaultBranchRef: DefaultBranchRef;
  updatedAt: string;
  createdAt: string;
  languages: LanguageConnection;
  watchers: UserConnection;
  primaryLanguage: Language | null;
  licenseInfo: LicenseInfo | null;
  ref: Ref | null;
  refs: RefConnection | null;
  parent: Repository;
  forks: RepositoryConnection;
  issues: IssueConnection;
  pullRequests: PullRequestConnection;
  collaborators: RepositoryCollaboratorConnection | null;
}

export default Repository;
