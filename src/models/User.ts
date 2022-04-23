import IssueConnection from "./IssueConnection";
import PullRequestConnection from "./PullRequestConnection";
import ContributionsCollection from "./ContributionsCollection";

export default interface User {
  id: string;
  name: string | null;
  login: string;
  email: string;
  avatarUrl: string;
  url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  issues: IssueConnection;
  pullRequests: PullRequestConnection;
  contributionsCollection: ContributionsCollection;
}